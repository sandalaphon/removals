import React from 'react'
import {Form, Button, FormControl,form, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {Converter} from 'csvtojson'
import Geocoder from '../../models/geocoder'

class UpdateData extends React.Component {

  handleFileSubmitClick(){
    
    var file = document.getElementById('file').files[0]
    // this.getText(file)
    var reader = new FileReader()
      reader.readAsText(file)
      // reader.onload = this.loaded 
      console.log('THIS . PROPS', this.props)
      reader.onload = this.convertToJson.bind(this)
     
  }
  logger(input){
    console.log('json object with latlng?', input)
  }

  convertToJson(event){
    var csv = new Converter()
    var text = event.target.result
    // console.log('here')
    // console.log('csv', csv)
    // console.log("outside or something", this.props)
    const arr = []
    csv
    .fromString(text)
    .on('json', (json) =>{ 
      console.log(json)
      // arr.push(json)
      // console.log('here json', json)
      // var object = json
      // console.log("inside", this.props)
      //adjust

      var geocoder = new Geocoder
      geocoder.setLatLngAndSendToRailsDb(json, this.props.sendSingleTripToRails.bind(this))

      ////////////////////////////////////////////////
      // this.props.sendSingleTripToRails(json)
      ///////////////////////////////////////////////
    })
    .on('done', ()=>{
      console.log('end')
      window.alert('Thank you for the submission, the data is saved')
      // this.props.sendTripsToRails(arr)
    })

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
               // controlId="formInlineName"
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

// <label className="custom-file">
// <input type="file" id='file' className="custom-file-input"/>
// <span className='custom-file-control'></span>
// <input type="submit"/>
// </label>

// <Form>

// <FieldGroup
      // id="formControlsFile"
    //   type="file"
    //   label="File"
    //   help="Example block-level help text here."
    // />

// </Form>
