import React from 'react'
import {Form, Button, FormControl,form, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {Converter} from 'csvtojson'
import Geocoder from '../../models/geocoder'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as commonActions from '../../actions/_common_actions'
import * as updateDataActions from '../../actions/update_data_actions'

class UpdateData extends React.Component {

constructor(props){
  super(props)
  this.trips = []
  this.surveys = []
  this.completedSurveyJson = []
}



  handleFileSubmitClick(){

    this.trips = []
    var file = document.getElementById('file').files[0]
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = this.convertToJson.bind(this, reader, this.trips, this.getGoogleDirectionsAndSendToRailsDb.bind(this))


  }
  logger(input){
  }

  
  getHomeBranchOfJob(branchCode){
    var branchToReturn
    this.props.all_branches.forEach((branch)=>{
      if(branch.branch_code===branchCode){
        branchToReturn=branch
      }
    })
    return branchToReturn
  }



  getGoogleDirectionsAndSendToRailsDb(json){

    var branch = this.getHomeBranchOfJob(json.branch_code)
    var collectionString = json.collection_postcode ? json.collection_postcode : json.collection_address
    var deliveryString = json.delivery_postcode ? json.delivery_postcode : json.delivery_address
    var toCollection = this.getGoogleResponsePromise(branch.postcode, collectionString)
    var carry        = this.getGoogleResponsePromise(collectionString, deliveryString)
    var backToBase   = this.getGoogleResponsePromise(deliveryString, branch.postcode)

    Promise.all([toCollection, carry, backToBase])
    .then((values)=>{
      json['google_directions_from_branch'] = JSON.stringify(values[0])
      json['google_directions']             = JSON.stringify(values[1])
      json['google_directions_to_branch']   = JSON.stringify(values[2])
    })
    .then((value)=>{this.props.actions.update_data_actions.sendSingleTripToRails(json)})
  }



  getGoogleResponsePromise(startString, finishString){
    return new Promise((resolve, reject)=>{
      var directionsService = new google.maps.DirectionsService()
      var directionInput = {
        origin: startString,
        destination: finishString,
        waypoints: [],
        travelMode: 'DRIVING',
        avoidTolls: true
      }

      directionsService.route(directionInput, function(response, status){
        if(status==='OK'){
            resolve(response)
         
        }else{
          reject(status)
        }
      })
    })
  }

  handleSurveyFileSubmitClick(event){
    event.preventDefault()
    var file = document.getElementById('surveys_file').files[0]
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = this.convertToJson.bind(this, reader, this.surveys, this.surveysCallback1.bind(this))
    // alert('survey data')
  }

surveysCallback1(){
  var promises = []
  var multiple = 0
  this.surveys.forEach((survey)=>{
    multiple++
    console.log('mult', multiple)
    promises.push(this.surveysCallback.call(this, survey, multiple))
  })
  Promise.all(promises)
  .then((arrayOfSurveysWithLatLngs)=>{
    console.log('all should have latlng', arrayOfSurveysWithLatLngs)
    arrayOfSurveysWithLatLngs.forEach((survey)=>{
      this.calculateSecondsSince1970(survey)
    })
    console.log('with milli', this.completedSurveyJson)
    this.composeSurveyObject()
  }) 
  .catch((error)=>{
    console.log(error)
  })

}


  surveysCallback(survey_json, multiple){
    console.log('surveys callback')
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        var geocoder = new Geocoder()
         geocoder.getLatLngPromise(survey_json.collection_postcode)
         .then((coords)=>{
          console.log('resolvish')
          survey_json["collection_latLng"] = JSON.stringify(coords)
          // this.calculateSecondsSince1970(survey_json)
          resolve(survey_json)
         })
         .catch((status)=>{
          reject(status)
         })
       }, 1000*multiple)
     
    })
    
  }

calculateSecondsSince1970(json, sendTrip=true){
  var dateString = json.appointment_date //"2017-10-05"
  var timeString = json.appointment_time //"16:00"
  var year  = +dateString.substring(0,4)
  var month = (+dateString.substring(5,7)) - 1
  var day   = +dateString.substring(8)
  var hours = +timeString.substring(0,2)
  var minutes = +timeString.substring(3)

  var date = new Date(year, month, day, hours, minutes)
  var milliseconds = date.valueOf()
  json["milliseconds_since_1970"] = milliseconds
  if(sendTrip){
    this.completedSurveyJson.push(json)
  }else{
    return milliseconds
  }
}

convertToJson(reader, instance_variable_array, callback){
  var csv = new Converter()
  var text = event.target.result
  var multiple = 0
  csv
  .fromString(text)
  .on('json', (json) =>{ 
    instance_variable_array.push(json)

  })
  .on('done', ()=>{ 
    
    if(instance_variable_array==this.surveys){

      callback.call(this)
    }else{
      instance_variable_array.forEach((json, index)=>{
           multiple++
            setTimeout(callback.bind(this, json), 1001*multiple)      
      })
    }   
  })
}


composeSurveyObject(){

  this.completedSurveyJson.forEach((survey)=>{
   this.props.actions.update_data_actions.sendSingleSurveyToRails(survey)
  })

}

sortSurveysByTime(object){
  for(var branches in object){
    console.log('branches', object[branches])
    for(var eachDay in object[branches]){
      console.log('eachDay', object[branches][eachDay])
      for(var surveyor_code in object[branches][eachDay]){
        console.log('should be array of surveys', object[branches][eachDay][surveyor_code])
        object[branches][eachDay][surveyor_code].sort((a,b)=>{
          if(a.milliseconds_since_1970>b.milliseconds_since_1970) return 1
            if(a.milliseconds_since_1970<b.milliseconds_since_1970) return -1
              if(a.milliseconds_since_1970==b.milliseconds_since_1970) return 0
        })
      }
    }
  }
}

getDayOfSurvey(milliseconds){
  var dateObject = new Date(milliseconds)
  dateObject.setHours(0,0,0,0)
  return +dateObject
}

  render(){
    return(
      <div>
      <Form inline>
      <FormGroup
      >
      <ControlLabel>Please Select CSV File</ControlLabel>
      <FormControl
      type="file"
      id="file"  
      />
      <Button bsStyle='success' bsSize='small' onClick={this.handleFileSubmitClick.bind(this)}>Submit</Button>

      <br></br>
      <ControlLabel>Please Select Surveys CSV File</ControlLabel>
      <FormControl
      type="file"
      id="surveys_file"  
      />
      <Button bsStyle='success' bsSize='small' onClick={this.handleSurveyFileSubmitClick.bind(this)}>Submit</Button>

      <FormControl.Feedback />
      <HelpBlock>CSV stands for Comma Separated Values</HelpBlock>
      </FormGroup>
      </Form>
      </div>

      )
  }
}

const mapStateToProps=(state)=>({
  all_branches: state.common.all_branches
})

const mapDispatchToProps=(dispatch)=>({
  actions: {
    update_data_actions: bindActionCreators(updateDataActions, dispatch),
    
    commonActions: bindActionCreators( commonActions, dispatch )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateData)




// getGoogleResponseAndAppendJson(json, startString, finishString, appendToJsonName, counter = 0){
//   var branch = this.getHomeBranchOfJob(json.branch_code)

//   var directionsService = new google.maps.DirectionsService()
//   var directionInput = {
//     origin: startString,
//     destination: finishString,
//     waypoints: [],
//     travelMode: 'DRIVING',
//     avoidTolls: true
//   }

//   directionsService.route(directionInput, function(response, status){
   
//     if(status==='OK'){
//       var stringifiedResponse = JSON.stringify(response)
//       json[appendToJsonName]= stringifiedResponse
//       if(counter==0){
//         var collectionString = ''

//         if(json.collection_postcode){
//           collectionString = json.collection_postcode
//         }else{
//           collectionString = json.collection_address
//         }
//         this.getGoogleResponseAndAppendJson(json, branch.postcode, collectionString,  'google_directions_from_branch', 1)
//       }
//       if(counter==1){
//         var deliveryString = ''
//         if(json.delivery_postcode){
//           deliveryString = json.delivery_postcode
//         }else{
//           deliveryString = json.delivery_address
//         }
//         this.getGoogleResponseAndAppendJson(json, deliveryString,  branch.postcode,  'google_directions_to_branch', 2)
//       }
//       if(counter==2){
//         this.props.actions.update_data_actions.sendSingleTripToRails(json)
//       }
      

//     }else{
//     }
    

//   }.bind(this))


  
//   return json
  
  
// }


  //do stuff
// this.surveys ///compose
// var object = {}
// var branches = this.props.all_branches
// branches.forEach((branch)=>{
//         object[branch.branch_code]={}
//     })
// this.completedSurveyJson.forEach((survey)=>{
// //get day of survey(milliseconds)
// //get milliseconds of survey appointment////////////////////////////////////////////
// var milliseconds = this.calculateSecondsSince1970(survey, false)
// var dayMilli = this.getDayOfSurvey(milliseconds)
// survey["collection_latLng"] = JSON.parse(survey["collection_latLng"])
// if(object[survey.branch_code][dayMilli]){
//  if(object[survey.branch_code][dayMilli][survey.moveware_employee_code]){
//   object[survey.branch_code][dayMilli][survey.moveware_employee_code].push(survey)
//  }else{
//   object[survey.branch_code][dayMilli][survey.moveware_employee_code] = []
//   object[survey.branch_code][dayMilli][survey.moveware_employee_code].push(survey)
//  }
// }else{
//   object[survey.branch_code][dayMilli] = {}
//   object[survey.branch_code][dayMilli][survey.moveware_employee_code]=[]
//  object[survey.branch_code][dayMilli][survey.moveware_employee_code].push(survey)
 
// }
//     })
// console.log('before sort',object)
// this.sortSurveysByTime(object)
// console.log('after sort', object)

 
//  var stringifiedForRails = JSON.stringify(object)
//  console.log(stringifiedForRails)
//  var objectForRails = {all_surveys_object: stringifiedForRails}
//  this.props.actions.update_data_actions.sendSurveyObjectToRails(objectForRails)


 

 // save object to db
 //save surveys to db
  // setTimeout(callback.bind(this, json), 1001*multiple)





