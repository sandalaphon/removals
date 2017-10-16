import React from "react"
import * as surveyorActions from "../../actions/surveyor_actions"
import * as commonActions from "../../actions/_common_actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { mapObjectInstances } from "../../models/mapObject"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { appointments } from "../../models/appointments"
import Appointment from "../../models/appointments"

class SurveyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.colours = [
      "#4C005C",
      "#2BCE48",
      "#808080",
      "#94FFB5",
      "#8F7C00",
      "#9DCC00",
      "#FFA8BB",
      "#426600",
      "#FF0010",
      "#5EF1F2",
      "#00998F",
      "#C20088",
      "#E0FF66",
      "#FFFF80",
      "#FFFF00",
      "#FF5005",
      "#F0A3FF",
      "#005C31",
      "#FFCC99",
      "#993F00",
      "#003380",
      "#990000",
      "#191919",
      "#740AFF",
      "#FFA405",
      "#0075DC"
    ]
    this.surveyors_colours = {}
  }

  componentDidMount() {
    this.setState({
      mapObject: mapObjectInstances.surveyor
    })
  }

  componentDidUpdate() {
    if (!this.state.mapObject) {
      this.setState({
        mapObject: mapObjectInstances.surveyor
      })
    }
  }

  assignColourToSurveyor(surveyor_code) {
    if (!this.colours.length) this.surveyors_colours[surveyor_code] = "#0088FF"
    this.surveyors_colours[surveyor_code] = this.colours.pop()
  }

  calculateCurrentSurveyorRoute(surveyor_code, surveys) {
    if (!surveys.length) return
    if (!this.surveyors_colours[surveyor_code]) {
      this.assignColourToSurveyor(surveyor_code)
    }

    var polylineColour = this.surveyors_colours[surveyor_code]
    var branch = this.getBranchByBranchCode(this.props.selected_branch)
    var dateMilli = this.props.survey_current_date_milliseconds
    var daySurveyorUnique = dateMilli + surveyor_code

    var latlngsOfSurveys = surveys.map(survey => {
      return survey.collection_latLng
    })

    this.state.mapObject.drawRouteWithWayPoints(
      branch.latlng,
      branch.latlng,
      latlngsOfSurveys,
      polylineColour,
      daySurveyorUnique
    )

    // <<<<<<< HEAD
  }

  // =======
  //         var latlngsOfSurveys = surveys.map((survey)=>{
  //           return survey.collection_latLng
  //         })

  //         this.state.mapObject.drawRouteWithWayPoints(branch.latlng, branch.latlng, latlngsOfSurveys, polylineColour, daySurveyorUnique)
  //       }

  // >>>>>>> develop
  surveyAndFlickerDateAreTheSame(surveyDate) {
    var dateFlickerDate = new Date(this.props.survey_current_date_milliseconds)
    var appointment_date = new Date(surveyDate)
    if (dateFlickerDate.toDateString() == appointment_date.toDateString()) {
      return true
    } else {
      return false
    }
  }

  handleTableRowHover(event) {
    var survey = this.getSurveyById(event.currentTarget.id)
    this.state.mapObject.highlightMarker(
      survey.collection_latLng,
      survey.client_name
    )
  }

  getSurveyById(survey_id) {
    return this.props.all_surveys.find(survey => {
      return survey.id == survey_id
    })
  }

  getBranchByBranchCode(branch_code) {
    var branch = this.props.all_branches.find(branch => {
      return branch.branch_code == branch_code
    })
    return branch
  }

  handleSurveyorClick(e) {
    var surveyor_code = e.currentTarget.id
    this.props.actions.surveyor_actions.toggleSurveyorHidden(surveyor_code)
  }

  formatTimeFromPSQL(milliseconds) {
    var dateObj = new Date(milliseconds)
    var hours = dateObj.getHours()

    if (hours.toString.length < 2) {
      hours = "0" + hours
    }
    var minutes = dateObj.getMinutes()
    if (minutes.toString.length < 2) {
      minutes = "0" + minutes
    }
    var timeString = hours + ":" + minutes
    return timeString
  }

  getToDisplay() {
    if (this.state.mapObject) {
      return this.getTable()
    } else {
      return <tr key={Date.now()} />
    }
  }

  showBranchIconAndCenterMap(selected_branch) {
    var branch = this.getBranchByBranchCode(selected_branch)
    var mapO = this.state.mapObject
    mapO.setCenter.call(mapO, branch.latlng)
    mapO.placeMarker.call(
      mapO,
      branch.latlng,
      mapO.branchSymbol("#265eb7"),
      mapO.branchesMarkers,
      true,
      true,
      branch.address,
      mapO.handleBranchMarkerClick.bind(mapO)
    )
  }

  handleSurveyorOverviewClick(e) {
    console.log(e.currentTarget.id)
    this.props.actions.surveyor_actions.toggleSurveyorOverview()
  }

  show_overview_table() {
    if (
      !this.props.all_surveys ||
      !this.props.all_branches ||
      !this.state.mapObject
    )
      return <div />
    var currentDayMilli = this.props.survey_current_date_milliseconds
    this.selected_branch = this.props.selected_branch
    this.state.mapObject.clearMap(true, false)
    this.showBranchIconAndCenterMap(this.selected_branch)

    this.branch_surveyors = Appointment.getAllSurveyorsByBranch(
      this.selected_branch
    )
    var headerStyle = { backgroundColor: "gainsboro" }
    var tableStyle = { tableLayout: "fixed", width: "50vw" }
    var tdStyle20 = { width: "20%" }
    var tdStyleSurveyorHeader = {
      width: `${80 / this.branch_surveyors.length}%`
    }
    var surveyors_headers = this.branch_surveyors.map(surveyor_code => {
      return (
        <td
          id={surveyor_code}
          onClick={this.handleSurveyorOverviewClick.bind(this)}
          style={tdStyleSurveyorHeader}
        >
          <b>{surveyor_code}</b>
        </td>
      )
    })
    return (
      <div className="grid-item-survey-list">
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr key="survey-list-header">
              <td style={tdStyle20}>
                <b>Time</b>
              </td>

              {surveyors_headers}
            </tr>
          </thead>
          <tbody>{this.get_overview_table_body.call(this)}</tbody>
        </table>
      </div>
    )
  }

  get_overview_table_body() {
    var currentDayMilli = this.props.survey_current_date_milliseconds
    var date = new Date(this.props.survey_current_date_milliseconds)
    date.setHours(8)
    var td_array = []
    this.branch_surveyors.map(surveyor_code => {
      var surveyors_surveys = Appointment.getSurveysByBranchDayAndSurveyor(
        currentDayMilli,
        this.selected_branch,
        surveyor_code
      )
      //// place survey markers
      surveyors_surveys.forEach(survey => {
        this.state.mapObject.placeSurveyMarker(
          survey.collection_latLng,
          survey.client_name
        )
      })
      //// draw surveyor routes
      this.calculateCurrentSurveyorRoute(surveyor_code, surveyors_surveys)
    })

    var table_rows = []
    for (var i = 0; i < 19; i++) {
      date.setMinutes(date.getMinutes() + 30)
      var time_to_display = date.toLocaleTimeString().substr(0, 5)
      var tds = []

      this.branch_surveyors.forEach(surveyor_code => {
        var surveyors_surveys = Appointment.getSurveysByBranchDayAndSurveyor(
          currentDayMilli,
          this.selected_branch,
          surveyor_code
        )
        var survey_now = surveyors_surveys.find(survey => {
          return survey.milliseconds_since_1970 == +date
        })

        survey_now
          ? tds.push(<td>{survey_now.survey_id}</td>)
          : tds.push(<td>No Appointment</td>)
      })
      table_rows.push(
        <tr>
          <td>{time_to_display}</td>
          {tds}
        </tr>
      )
    }
    return table_rows
  }

  getTable() {
    var selected_branch = this.props.selected_branch
    var currentDayMilli = this.props.survey_current_date_milliseconds
    var todaysSurveys
    var toDisplay = []

    this.state.mapObject.clearMap(true, false)
    if (!this.props.all_surveys || !this.props.all_branches) return
    this.showBranchIconAndCenterMap(selected_branch)

    this.todaysAppointments = Appointment.getSurveysByBranchAndDay(
      currentDayMilli,
      selected_branch
    )
    this.branch_surveyors = Appointment.getAllSurveyorsByBranch(selected_branch)

    this.branch_surveyors.forEach(surveyor => {
      toDisplay.push(
        <tr key={surveyor}>
          <th
            onClick={this.handleSurveyorClick.bind(this)}
            id={surveyor}
            colSpan="5"
            style={{ testAlign: "left" }}
          >
            {" "}
            {surveyor}
          </th>
        </tr>
      )
      if (this.props.surveyors_hidden[surveyor]) return

      var surveyors_surveys = Appointment.getSurveysByBranchDayAndSurveyor(
        currentDayMilli,
        selected_branch,
        surveyor
      )

      this.calculateCurrentSurveyorRoute(surveyor, surveyors_surveys)

      surveyors_surveys.forEach(survey => {
        this.state.mapObject.placeSurveyMarker(
          survey.collection_latLng,
          survey.client_name
        )
        toDisplay.push(
          <tr
            onClick={this.state.mapObject.setCenter.bind(
              this.state.mapObject,
              survey.collection_latLng
            )}
            onMouseOver={this.handleTableRowHover.bind(this)}
            key={survey.survey_id}
            id={survey.survey_id}
          >
            <td>{this.formatTimeFromPSQL(survey.milliseconds_since_1970)}</td>
            <td>{survey.moveware_code}</td>
            <td>{survey.client_name}</td>
            <td>{survey.moveware_employee_code}</td>

            <td>{survey.appointment_date}</td>
          </tr>
        )
      })
    })

    return toDisplay
  }

  render() {
    var headerStyle = { backgroundColor: "gainsboro" }
    var tableStyle = { tableLayout: "fixed", width: "50vw" }
    var tdStyle = { width: "20%" }
    if (this.props.survey_overview) return this.show_overview_table()
    return (
      <div className="grid-item-survey-list">
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr key="survey-list-header">
              <td>
                <b>Time</b>
              </td>
              <td>
                <b>Moveware</b>
              </td>
              <td>
                <b>Client Name</b>
              </td>
              <td>
                <b>Rep</b>
              </td>
              <td>
                <b>Date</b>
              </td>
            </tr>
          </thead>
          <tbody>{this.getToDisplay.call(this)}</tbody>
        </table>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    surveyor_actions: bindActionCreators(surveyorActions, dispatch),
    common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps = state => ({
  all_branches: state.common.all_branches,
  selected_branch: state.surveyor.surveyor_branch_selected,
  survey_overview: state.surveyor.survey_overview,
  surveyors_hidden: state.surveyor.surveyors_hidden,
  all_trips: state.common.all_trips,
  all_surveys: state.common.all_surveys,
  branches_on_map_surveyor: state.common.branches_on_map_surveyor,
  survey_current_date_milliseconds:
    state.surveyor.survey_current_date_milliseconds
})

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)
