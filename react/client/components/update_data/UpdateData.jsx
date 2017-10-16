import React from "react"
import {
  Form,
  Button,
  FormControl,
  form,
  FormGroup,
  ControlLabel,
  HelpBlock
} from "react-bootstrap"
import { Converter } from "csvtojson"
import Geocoder from "../../models/geocoder"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as commonActions from "../../actions/_common_actions"
import * as updateDataActions from "../../actions/update_data_actions"

class UpdateData extends React.Component {
  constructor(props) {
    super(props)
    this.trips = []
    this.surveys = []
    this.completedSurveyJson = []
  }

  handleFileSubmitClick() {
    var file = document.getElementById("file").files[0]
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = this.convertToJson.bind(
      this,
      reader,
      this.trips,
      this.getGoogleDirectionsAndSendToRailsDb.bind(this)
    )
  }
  logger(input) {}

  getHomeBranchOfJob(branchCode) {
    var branchToReturn
    this.props.all_branches.forEach(branch => {
      if (branch.branch_code === branchCode) {
        branchToReturn = branch
      }
    })
    return branchToReturn
  }

  assignLoadingAndUnloadingTimes(json) {
    var seconds_to_load = this.getLoadingTime(json)
    var seconds_to_unload = this.getUnloadingTime(json)
    console.log("seconds to load", seconds_to_load)
    json["seconds_to_load"] = seconds_to_load
    json["seconds_to_unload"] = seconds_to_unload
    console.log("json", json)
    return json
  }

  getLoadingTime(json) {
    console.log("json.men_requested", typeof json.men_requested)
    console.log("json.voume", typeof json.volume)
    switch (+json.men_requested) {
      case 2: //2 men load 150 cuft per hour
        console.log("2")
        return Math.ceil(+json.volume / 150 * 3600)
        break
      case 3: //3 men load 250 cuft per hour
        console.log("3")
        return Math.ceil(+json.volume / 250 * 3600)
        break
      case 4: // 4 men load 350 cuft per hour
        console.log("4")
        return Math.ceil(+json.volume / 350 * 3600)
      case 5: // 5 men load 450 cuft per hour
        console.log("5")
        return Math.ceil(+json.volume / 450 * 3600)
        break
      default:
        console.log("default")
    }
  }

  getUnloadingTime(json) {
    switch (+json.men_requested) {
      case 2: //2 men unload 200 cuft per hour
        return Math.ceil(+json.volume / 200 * 3600)
        break
      case 3: //3 men unload 300 cuft per hour
        return Math.ceil(+json.volume / 300 * 3600)
        break
      case 4: // 4 men unload 400 cuft per hour
        return Math.ceil(+json.volume / 400 * 3600)
        break
      case 5: // 5 men unload 500 cuft per hour
        return Math.ceil(+json.volume / 500 * 3600)
        break
    }
  }

  assignDateMilli(json) {
    console.log("json.date", json.date)
    var date = new Date(json.date)
    date.setHours(0, 0, 0, 0)
    console.log("date", +date)
    json["dateMilli"] = +date
    return json
  }

  getGoogleDirectionsAndSendToRailsDb(json) {
    json = this.assignLoadingAndUnloadingTimes(json)
    json = this.assignDateMilli(json)
    var branch = this.getHomeBranchOfJob(json.branch_code)
    var collectionString = json.collection_postcode
      ? json.collection_postcode
      : json.collection_address
    var deliveryString = json.delivery_postcode
      ? json.delivery_postcode
      : json.delivery_address
    var waypoints_route = this.getGoogleWaypointsResponsePromise(
      branch.postcode,
      collectionString,
      deliveryString
    )

    Promise.all([waypoints_route])
      .then(values => {
        json["google_waypoints_directions"] = JSON.stringify(values[0])
        json["return_bearing"] = this.getReturnBearing(json, values[0])
        console.log("json", json)
      })
      .then(value => {
        this.props.actions.update_data_actions.sendSingleTripToRails(json)
      })
  }

  getReturnBearing(json, google_waypoints_directions) {
    console.log("google", google_waypoints_directions)

    var branch_lat_lng =
      google_waypoints_directions.routes[0].legs[2].end_location
    var lat_lng_of_delivery =
      google_waypoints_directions.routes[0].legs[1].end_location

    var startLat = this.getRadians(lat_lng_of_delivery.lat())
    var startLong = this.getRadians(lat_lng_of_delivery.lng())
    var endLat = this.getRadians(branch_lat_lng.lat())
    var endLong = this.getRadians(branch_lat_lng.lng())

    var dLong = endLong - startLong

    var dPhi = Math.log(
      Math.tan(endLat / 2.0 + Math.PI / 4.0) /
        Math.tan(startLat / 2.0 + Math.PI / 4.0)
    )
    if (Math.abs(dLong) > Math.PI) {
      if (dLong > 0.0) dLong = -(2.0 * Math.PI - dLong)
      else dLong = 2.0 * Math.PI + dLong
    }

    return (this.getDegrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0
  }

  getRadians(n) {
    return n * (Math.PI / 180)
  }

  getDegrees(n) {
    return n * (180 / Math.PI)
  }

  getGoogleResponsePromise(startString, finishString) {
    return new Promise((resolve, reject) => {
      var directionsService = new google.maps.DirectionsService()
      var directionInput = {
        origin: startString,
        destination: finishString,
        waypoints: [],
        travelMode: "DRIVING",
        avoidTolls: true
      }

      directionsService.route(directionInput, function(response, status) {
        if (status === "OK") {
          resolve(response)
        } else {
          reject(status)
        }
      })
    })
  }

  getGoogleWaypointsResponsePromise(
    branch_postcode,
    collectionString,
    deliveryString
  ) {
    var waypts = [{ location: collectionString }, { location: deliveryString }]
    return new Promise((resolve, reject) => {
      var directionsService = new google.maps.DirectionsService()
      var directionInput = {
        origin: branch_postcode,
        destination: branch_postcode,
        waypoints: waypts,
        travelMode: "DRIVING",
        avoidTolls: true
      }

      console.log("directionInput", directionInput)

      directionsService.route(directionInput, function(response, status) {
        if (status === "OK") {
          resolve(response)
        } else {
          reject(status)
        }
      })
    })
  }

  calculateSecondsSince1970(json, sendTrip = true) {
    var dateString = json.appointment_date //"2017-10-05"
    var timeString = json.appointment_time //"16:00"
    var year = +dateString.substring(0, 4)
    var month = +dateString.substring(5, 7) - 1
    var day = +dateString.substring(8)
    var hours = +timeString.substring(0, 2)
    var minutes = +timeString.substring(3)

    var date = new Date(year, month, day, hours, minutes)
    var milliseconds = date.valueOf()
    json["milliseconds_since_1970"] = milliseconds
    if (sendTrip) {
      this.completedSurveyJson.push(json)
    } else {
      return milliseconds
    }
  }

  convertToJson(reader, instance_variable_array, callback) {
    var csv = new Converter()
    var text = event.target.result
    csv
      .fromString(text)
      .on("json", json => {
        instance_variable_array.push(json)
      })
      .on("done", () => {
        if (instance_variable_array == this.surveys) {
          callback.call(this)
        } else {
          instance_variable_array.forEach((json, index) => {
            setTimeout(() => {
              callback.call(this, json)
            }, 1000 * index)
          })
        }
      })
  }

  handleSurveyFileSubmitClick(event) {
    event.preventDefault()
    var file = document.getElementById("surveys_file").files[0]
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = this.convertToJson.bind(
      this,
      reader,
      this.surveys,
      this.surveysCallback1.bind(this)
    )
    // alert('survey data')
  }

  surveysCallback1() {
    var promises = []
    var multiple = 0
    this.surveys.forEach(survey => {
      multiple++
      // console.log('mult', multiple)
      promises.push(this.surveysCallback.call(this, survey, multiple))
    })
    Promise.all(promises)
      .then(arrayOfSurveysWithLatLngs => {
        // console.log('all should have latlng', arrayOfSurveysWithLatLngs)
        arrayOfSurveysWithLatLngs.forEach(survey => {
          this.calculateSecondsSince1970(survey)
        })

        this.completedSurveyJson.forEach(survey => {
          this.props.actions.update_data_actions.sendSingleSurveyToRails(survey)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  surveysCallback(survey_json, multiple) {
    console.log("surveys callback")
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var geocoder = new Geocoder()
        geocoder
          .getLatLngPromise(survey_json.collection_postcode)
          .then(coords => {
            // console.log('resolvish')
            survey_json["collection_latLng"] = JSON.stringify(coords)
            resolve(survey_json)
          })
          .catch(status => {
            reject(status)
          })
      }, 1000 * multiple)
    })
  }

  // sortSurveysByTime(object){
  //   for(var branches in object){

  //     for(var eachDay in object[branches]){

  //       for(var surveyor_code in object[branches][eachDay]){

  //         object[branches][eachDay][surveyor_code].sort((a,b)=>{
  //           if(a.milliseconds_since_1970>b.milliseconds_since_1970) return 1
  //             if(a.milliseconds_since_1970<b.milliseconds_since_1970) return -1
  //               if(a.milliseconds_since_1970==b.milliseconds_since_1970) return 0
  //         })
  //       }
  //     }
  //   }
  // }

  getDayOfSurvey(milliseconds) {
    var dateObject = new Date(milliseconds)
    dateObject.setHours(0, 0, 0, 0)
    return +dateObject
  }

  render() {
    return (
      <div>
        <Form inline>
          <FormGroup>
            <ControlLabel>Please Select CSV File</ControlLabel>
            <FormControl type="file" id="file" />
            <Button
              bsStyle="success"
              bsSize="small"
              onClick={this.handleFileSubmitClick.bind(this)}
            >
              Submit
            </Button>

            <br />
            <ControlLabel>Please Select Surveys CSV File</ControlLabel>
            <FormControl type="file" id="surveys_file" />
            <Button
              bsStyle="success"
              bsSize="small"
              onClick={this.handleSurveyFileSubmitClick.bind(this)}
            >
              Submit
            </Button>

            <FormControl.Feedback />
            <HelpBlock>CSV stands for Comma Separated Values</HelpBlock>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  all_branches: state.common.all_branches
})

const mapDispatchToProps = dispatch => ({
  actions: {
    update_data_actions: bindActionCreators(updateDataActions, dispatch),

    commonActions: bindActionCreators(commonActions, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateData)
