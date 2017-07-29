import React from 'react'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { mapObjectInstances} from '../../models/mapObject'
import Slider,  { Range, createSliderWithTooltip } from 'rc-slider'
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';



class SliderToday extends React.Component{

  constructor(props) { //may need this later
      super(props);
      this.state = {
        tooltipValue: 0,
        value:  (this.props.today_seconds_from_start/600) || 24
       
      }
    
  }

  componentDidMount(){

    if(this.props.today_seconds_from_start){
      this.placeMarkers(this.props.today_seconds_from_start)
    }
  }

  handleSliderChange(value){

    var secondsPassed = value*10*60
    this.placeMarkers(secondsPassed)
    
  }

  onAfterChange(value){
    this.setState({value,})  
    const secondsPassed = value * 60 * 10
    this.props.actions.setTodaySliderSecondsFromStart(secondsPassed)

  }

  placeMarkers(sliderSecondsFromStart){

    var todaysTrips = this.props.all_trips
    var sliderMarkerCoordsandIndexArray = []

    todaysTrips.forEach((trip, index)=>{

      

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

           // var indexOfStepPath = 0

            // console.log('step.path and indexOfStepPath', step.path, indexOfStepPath )
            var markerCoords = ({lat: step.path[indexOfStepPath].lat, lng: step.path[indexOfStepPath].lng})
            sliderMarkerCoordsandIndexArray.push({markerCoords, index, colour: trip.colour, message: trip.client_name})
            stepCompleted = true

           }
        });
      }
    });
    // console.log('instances', mapObjectInstances)
 
    mapObjectInstances.today.handleSliderMarkerArray(sliderMarkerCoordsandIndexArray)
    //add each step duration

    //when duration> TimeNowSeconds - StartTime then:

    // get last step duration and accumulated seconds - laststep duration = beginning of step

    // fraction of step =(TimeNowSecondsFromStart-beginning of step)/duration of step 

    // path [fraction of step * path.length ceil] is lat lng needed 


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

    const sliderValue = this.props.today_seconds_from_start/600 || 24
   
    return(
        <div className='grid-item-slider-today'>
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
    actions: bindActionCreators(actionCreators, dispatch)
  })
  const mapStateToProps=(state)=>({all_trips: state.trips.all_trips, today_seconds_from_start: state.trips.today_seconds_from_start})
  export default connect(mapStateToProps, mapDispatchToProps)(SliderToday)

