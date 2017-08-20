import React from 'react'
import * as todayActions from '../../actions/today_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { mapObjectInstances} from '../../models/mapObject'
import Slider,  { Range, createSliderWithTooltip } from 'rc-slider'
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import {placeMarkers} from '../../models/sliderFunctions'



class SliderToday extends React.Component{

  constructor(props) { //may need this later
      super(props);
      this.state = {
        tooltipValue: 0,
        value:  (this.props.today_seconds_from_start/600) || 24
      } 
  }

  componentDidMount(){
    if(this.props.current_today_truckflicker_job){
      mapObjectInstances.today.drawRouteWithGoogleResponse(this.props.current_today_truckflicker_job)
    }
    if(this.props.today_seconds_from_start){
      placeMarkers(this.props.today_seconds_from_start, 'today')
    }
    mapObjectInstances.today.display_branches(this.props.branch_status_today) 
  }

  handleSliderChange(value){
    var secondsPassed = value*10*60
    placeMarkers(secondsPassed, 'today')
    
  }

  onAfterChange(value){
    this.setState({value,})  
    const secondsPassed = value * 60 * 10
    this.props.actions.today_actions.setTodaySliderSecondsFromStart(secondsPassed)

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
  actions: {
    today_actions: bindActionCreators(todayActions, dispatch)
  }
})

const mapStateToProps=(state)=>({
  all_trips: state.common.all_trips, 
  today_seconds_from_start: state.today.today_seconds_from_start, 
  current_today_truckflicker_job: state.common.current_today_truckflicker_job,
  branch_status_today: state.common.branch_status_today,
})

export default connect(mapStateToProps, mapDispatchToProps)(SliderToday)

