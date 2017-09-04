import React from 'react'
import * as surveyorActions from '../../actions/surveyor_actions'
import * as commonActions from '../../actions/_common_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {mapObjectInstances} from '../../models/mapObject'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {appointments} from '../../models/appointments'
import Appointment from '../../models/appointments'

class SurveyList extends React.Component {

  constructor(props){
    super(props)
    this.state={
    }
   
    this.colours= ['#4C005C' ,'#2BCE48','#808080' ,'#94FFB5', '#8F7C00', '#9DCC00', '#FFA8BB', '#426600' , '#FF0010' ,'#5EF1F2' ,'#00998F' ,'#C20088'  ,'#E0FF66', '#FFFF80', '#FFFF00', '#FF5005', '#F0A3FF', '#005C31','#FFCC99','#993F00','#003380', '#990000','#191919','#740AFF','#FFA405', '#0075DC']
    this.surveyors_colours = {}
  }

  componentDidMount(){
    this.setState({
      mapObject: mapObjectInstances.surveyor,
    })
  }



  componentDidUpdate(){
    if(!this.state.mapObject){
      this.setState({
        mapObject: mapObjectInstances.surveyor
      })
    }
  }

  assignColourToSurveyor(surveyor_code){
    if(!this.colours.lenght) this.surveyors_colours[surveyor_code] = '#0088FF'
    this.surveyors_colours[surveyor_code] = this.colours.pop()
  }

  calculateCurrentSurveyorRoute(surveyor_code, surveys){
     if(!surveys.length) return
      if(!this.surveyors_colours[surveyor_code]){
        this.assignColourToSurveyor(surveyor_code)
      }
      
      var polylineColour = this.surveyors_colours[surveyor_code]
      var branch = this.getBranchByBranchCode(this.props.selected_branch)
      var dateMilli = this.props.survey_current_date_milliseconds
      var daySurveyorUnique = dateMilli+surveyor_code

        var latlngsOfSurveys = surveys.map((survey)=>{
          return survey.collection_latLng
        })
       
        
        // this.props.actions.surveyor_actions.setVisibleSurveyorNColour({[surveyor_code]: this.surveyors_colours[surveyor_code]})

        this.state.mapObject.drawRouteWithWayPoints(branch.latlng, branch.latlng, latlngsOfSurveys, polylineColour, daySurveyorUnique)
     
      }
    


  surveyAndFlickerDateAreTheSame(surveyDate){
      var dateFlickerDate = new Date(this.props.survey_current_date_milliseconds)
      var appointment_date = new Date(surveyDate)
      if(dateFlickerDate.toDateString()==appointment_date.toDateString()){
        return true
      }else{
        return false
      }
  }


  handleTableRowHover(event){

    var survey = this.getSurveyById( event.currentTarget.id )
    this.state.mapObject.highlightMarker(survey.collection_latLng, survey.client_name
      )
  }

  getSurveyById(surveyId){
    return this.props.all_surveys.find((survey)=>{
      return survey.id==surveyId
    })
  }

  getBranchByBranchCode(branch_code){
   var branch =  this.props.all_branches.find((branch)=>{
      return branch.branch_code==branch_code
    })
   return branch
  }

  handleSurveyorClick(e){
    var surveyor_code = e.currentTarget.id
    this.props.actions.surveyor_actions.toggleSurveyorHidden(surveyor_code)
  }

  formatTimeFromPSQL(milliseconds){
    // console.log('time', time)
    // var milliseconds = Date.parse(time)
    var dateObj = new Date(milliseconds)
    var hours = dateObj.getHours()

    if(hours.toString.length<2){
      hours = '0'+hours
    }
    var minutes = dateObj.getMinutes()
    if(minutes.toString.length<2){
      minutes = '0'+minutes
    }
    var timeString = hours + ':' + minutes
    return timeString
  }

  getToDisplay(){
    if(this.state.mapObject){
      return this.getTable()
    }else{
      return(<tr key={Date.now()}></tr>)
    }
  }

  showBranchIconAndCenterMap(selected_branch){
    var branch = this.getBranchByBranchCode(selected_branch)
    var mapO = this.state.mapObject
    mapO.setCenter.call(mapO, branch.latlng)
    mapO.placeMarker.call(mapO, branch.latlng, mapO.branchSymbol("#265eb7"), mapO.branchesMarkers, true, true, branch.address, mapO.handleBranchMarkerClick.bind(mapO))
  }


getTable(){

  var selected_branch = this.props.selected_branch
  var currentDayMilli = this.props.survey_current_date_milliseconds
  var todaysSurveys
  var toDisplay = []
  this.state.mapObject.clearMarkers(this.state.mapObject.surveyMarkers) 
  this.state.mapObject.clearMarkers(this.state.mapObject.highlightedMarkers) 
  this.state.mapObject.clearMap()

  if(this.props.all_branches) {
    this.showBranchIconAndCenterMap(selected_branch)
  }else{
    return
  }

  if(!this.props.all_surveys) return


    this.todaysAppointments = Appointment.getSurveysByBranchAndDay(currentDayMilli, selected_branch)
    this.branch_surveyors = Appointment.getAllSurveyorsByBranch(selected_branch)

    this.branch_surveyors.forEach((surveyor)=>{
      toDisplay.push(
        <tr key={surveyor}><th
        onClick={this.handleSurveyorClick.bind(this)}
        id={surveyor} 
        colSpan='5'
        style={{testAlign: 'left'}}> {surveyor}</th></tr>
        )
      if(this.props.surveyors_hidden[surveyor]) return 

      
      var surveyors_surveys = Appointment.getSurveysByBranchDayAndSurveyor(currentDayMilli, selected_branch, surveyor)


    this.calculateCurrentSurveyorRoute(surveyor, surveyors_surveys)
    console.log('surveyors_surveys', surveyors_surveys)
      surveyors_surveys.forEach((survey)=>{
        this.state.mapObject.placeSurveyMarker(survey.collection_latLng, survey.client_name)
         toDisplay.push(  
           <tr 
           onClick = {this.state.mapObject.setCenter.bind(this.state.mapObject, survey.collection_latLng)}
           onMouseOver={this.handleTableRowHover.bind(this)}
           key={survey.survey_id}
           id={survey.survey_id}>
          <td>{this.formatTimeFromPSQL(survey.milliseconds_since_1970)}</td>
          <td>{survey.moveware_code}</td>
          <td>{survey.client_name}</td>
          <td>{survey.moveware_employee_code}</td>
         
          <td>{survey.appointment_date}</td>
          </tr>)
      })

    })
   

    return toDisplay  
  }


  render(){
      var headerStyle = {backgroundColor: 'gainsboro'}
      var tableStyle = { tableLayout: 'fixed', width: '50vw' }
      var tdStyle = { width: '20%' }
    return(
      <div className='grid-item-survey-list'>
      <table 
      style = {tableStyle}
     >
      <thead style={headerStyle}>
      <tr key='survey-list-header'>
      <td><b>Time</b></td>
      <td><b>Moveware</b></td>
      <td><b>Client Name</b></td>
      <td><b>Rep</b></td>
      
      <td><b>Date</b></td>
      </tr>
      </thead>
      <tbody>
      {this.getToDisplay.call(this)}
      </tbody>
      </table>
      </div>
      )
  }
}


const mapDispatchToProps=(dispatch)=>({
  actions: {
   surveyor_actions: bindActionCreators( surveyorActions, dispatch),
   common_actions: bindActionCreators( commonActions, dispatch),
 }
})

const mapStateToProps=(state)=>({
  // all_surveys: state.surveyor.all_surveys,
  all_branches: state.common.all_branches,
  // survey_object_rails: state.common.survey_object_from_rails,
  selected_branch: state.surveyor.surveyor_branch_selected,
  surveyors_hidden: state.surveyor.surveyors_hidden,
  all_trips: state.common.all_trips,
  all_surveys: state.common.all_surveys,
  // survey_object: state.common.survey_object,
  branches_on_map_surveyor: state.common.branches_on_map_surveyor,
  survey_current_date_milliseconds: state.surveyor.survey_current_date_milliseconds,
})


export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)