import React from 'react'
import {Form, Button, FormControl,form, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {Converter} from 'csvtojson'
import Geocoder from '../../models/geocoder'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as commonActions from '../../actions/_common_actions'
import * as updateDataActions from '../../actions/update_data_actions'

class UpdateData extends React.Component {


  handleFileSubmitClick(){

    var file = document.getElementById('file').files[0]
    var reader = new FileReader()
    reader.readAsText(file)
    console.log('THIS . PROPS', this.props)
    reader.onload = this.convertToJson.bind(this)

  }
  logger(input){
    console.log('json object with latlng?', input)
  }

  convertToJson(event){
    var csv = new Converter()
    var text = event.target.result
    // const arr = []
    csv
    .fromString(text)
    .on('json', (json) =>{ 
      console.log(json)
      this.getGoogleDirectionsAndSendToRailsDb(json )
    })
    .on('done', ()=>{ 
      console.log('end')
      window.alert('Thank you for the submission, the data is saved')
    })

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
          reject(console.log(status))
        }
      }     )
    })
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
//   console.log('before promise')
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
//       console.log(status)
//     }
    

//   }.bind(this))


  
//   return json
  
  
// }





