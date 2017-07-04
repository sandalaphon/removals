import React from 'react'
import {Form, Button, FormControl,form, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {Converter} from 'csvtojson'
import Geocoder from '../../models/geocoder'

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

    const arr = []
    csv
    .fromString(text)
    .on('json', (json) =>{ 
      console.log(json)


      // var geocoder = new Geocoder
      // geocoder.setLatLngAndSendToRailsDb(json, this.props.sendSingleTripToRails.bind(this))
      this.getGoogleDirectionsAndSendToRailsDb(json, this.props.sendSingleTripToRails.bind(this))


    })
    .on('done', ()=>{
      // this.props.getAllTripsFromRails()
      console.log('end')
      window.alert('Thank you for the submission, the data is saved')
    })

  }

  getGoogleDirectionsAndSendToRailsDb(json, callback){
    console.log(json)
    var jsonForRails = null
    var collectionString = ''

    if(json.collection_postcode){
      collectionString = json.collection_postcode
    }else{
      collectionString = json.collection_address
    }

    var deliveryString = ''
    if(json.delivery_postcode){
      deliveryString = json.delivery_postcode
    }else{
      deliveryString = json.delivery_address
    }

    var directionsService = new google.maps.DirectionsService()
    var directionInput = {
      origin: collectionString,
      destination: deliveryString,
      waypoints: [],
      travelMode: 'DRIVING',
      avoidTolls: true
    }

    console.log(directionInput)

    directionsService.route(directionInput, function(response, status){
     
      if(status==='OK'){
    
        var stringifiedResponse = JSON.stringify(response)
        json['google_directions']= stringifiedResponse
        jsonForRails = json
        // console.log(stringifiedResponse, response)
        console.log('jsonForRails with response?', jsonForRails)
        this.props.sendSingleTripToRails(jsonForRails)

      }else{
        console.log(status)
      }
      

    }.bind(this))

    // callback(jsonForRails)
 
  }


  loaded(event){
    var text = event.target.result
    console.log(text)
    this.convertToJson(text)
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

export default UpdateData


