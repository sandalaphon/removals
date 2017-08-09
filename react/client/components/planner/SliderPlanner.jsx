import React from 'react'
import * as plannerActions from '../../actions/planner_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { mapObjectInstances} from '../../models/mapObject'
import Slider,  { Range, createSliderWithTooltip } from 'rc-slider'
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';



class SliderPlanner extends React.Component{

  constructor(props) { //may need this later
      super(props);
      this.state = {
        tooltipValue: 0,
        value:  (this.props.planner_seconds_from_start/600) || 24
       
      }
    
  }

  componentDidMount(){
    if(this.props.current_planner_truckflicker_job){
      mapObjectInstances.planner.drawRouteWithGoogleResponse(this.props.current_planner_truckflicker_job)
    }
    if(this.props.planner_seconds_from_start){
      this.placeMarkers(this.props.planner_seconds_from_start)
    }
  }

  handleSliderChange(value){

    var secondsPassed = value*10*60
    this.placeMarkers(secondsPassed)
    
  }

  onAfterChange(value){
    this.setState({value,})  
    const secondsPassed = value * 60 * 10
    this.props.actions.planner_actions.setPlannerSliderSecondsFromStart(secondsPassed)

  }

  placeMarkers(sliderSecondsFromStart){

    var plannersTrips = this.props.all_trips
    var sliderMarkerCoordsandIndexArray = []

    if(this.props.current_planner_truckflicker_job){
      var trip = this.props.current_planner_truckflicker_job
      var steps =trip.google_directions.routes[0].legs[0].steps
      var truckSecondsFromStart = 0
      var stepCompleted = false

      steps.forEach((step)=>{
        if(stepCompleted) return
        var currentStepDuration = step.duration.value
         truckSecondsFromStart += currentStepDuration
         if(truckSecondsFromStart>sliderSecondsFromStart){

          var fractionOfStep = (  sliderSecondsFromStart  -  (truckSecondsFromStart-currentStepDuration))/currentStepDuration
          var indexOfStepPath = Math.floor(fractionOfStep*step.path.length)

          var markerCoords = ({lat: step.path[indexOfStepPath].lat, lng: step.path[indexOfStepPath].lng})
          sliderMarkerCoordsandIndexArray.push({markerCoords, colour: trip.colour, message: trip.client_name})
          stepCompleted = true

         }
      });
    }else{
      plannersTrips.forEach((trip, index)=>{

        if(!trip.hidden){
          var steps =trip.google_directions.routes[0].legs[0].steps
          var truckSecondsFromStart = 0
          var stepCompleted = false

          steps.forEach((step)=>{
            if(stepCompleted) return
            var currentStepDuration = step.duration.value
             truckSecondsFromStart += currentStepDuration
             if(truckSecondsFromStart>sliderSecondsFromStart){

              var fractionOfStep = (  sliderSecondsFromStart  -  (truckSecondsFromStart-currentStepDuration))/currentStepDuration
              var indexOfStepPath = Math.floor(fractionOfStep*step.path.length)
              var markerCoords = ({lat: step.path[indexOfStepPath].lat, lng: step.path[indexOfStepPath].lng})
              sliderMarkerCoordsandIndexArray.push({markerCoords, index, colour: trip.colour, message: trip.client_name})
              stepCompleted = true

             }
          });
        }
      });
    }
    
    mapObjectInstances.planner.handleSliderMarkerArray(sliderMarkerCoordsandIndexArray)

  }

  sortTimeDisplay(v){
    // console.log(v)
    let startValue = 8 //8am
    // let endValue = 72 //8pm
    let minutesFromStartValue = v*10
    let minutesLeft = minutesFromStartValue%60
    let hoursPassed = (minutesFromStartValue-minutesLeft)/60
    if(minutesLeft===0) minutesLeft='00'
    const time = `${startValue+hoursPassed}:${minutesLeft} `
    return time
  }

  render(){
    const SliderWithTooltip = createSliderWithTooltip(Slider);

    const marks = {
      0:  '8:00',
      12: '10:00',
      24: '12:00',
      36: '14:00',
      48: '16:00',
      60: '18:00',
      72: '20:00',
    };

    const sliderValue = this.props.planner_seconds_from_start/600 || 24
   
    return(
        <div className='grid-item-slider'>
        <div className = 'slider-div'>
        <SliderWithTooltip 
        min={0} 
        max={72} 
        marks={marks} 
        step = {1}
        defaultValue = {this.state.value}
        // value = {this.state.value}
        included = {false}
        onChange = {this.handleSliderChange.bind(this)}
        onAfterChange = {this.onAfterChange.bind(this)}
        tipFormatter = {value=>`${this.sortTimeDisplay(value)}`}
      
        />
        
        </div>
        </div>
    )
  }

}

const mapDispatchToProps=(dispatch)=>({
  actions:{
    planner_actions: bindActionCreators(plannerActions, dispatch)
  } 
})

const mapStateToProps=(state)=>({
  all_trips:                          state.common.all_trips, 
  planner_seconds_from_start:         state.planner.planner_seconds_from_start, 
  current_planner_truckflicker_job:   state.common.current_planner_truckflicker_job})

export default connect(mapStateToProps, mapDispatchToProps)(SliderPlanner)