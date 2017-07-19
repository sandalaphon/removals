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
        tooltipValue: 0
      }
  }

  handleSliderChange(value){
    console.log(value)
    this.setState({tooltipValue: value})
   
  }

  sortTimeDisplay(v){
    console.log(v)
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
    // const Slider = createSliderWithTooltip
    // const Handle = Slider.Handle;
    // const handle = (props) => {
    //   const { value, dragging, index, ...restProps } = props;
    //   return (
    //     <Tooltip
    //       prefixCls="rc-slider-tooltip"
    //       overlay={value}
    //       visible={dragging}
    //       placement="top"
    //       key={index}
    //     >
    //       <Handle value={value} {...restProps} />
    //     </Tooltip>
    //   );
    // }; 
    const marks = {
      0:  '8:00',
      12: '10:00',
      24: '12:00',
      36: '14:00',
      48: '16:00',
      60: '18:00',
      72: '20:00',
    };
   
    return(
        <div className='grid-item-slider-today'>
        <div className = 'slider-div'>
        <SliderWithTooltip 
        min={0} 
        max={72} 
        marks={marks} 
        step = {1}
        defaultValue = {24}
        included = {false}
        tipFormatter = {value=>`${this.sortTimeDisplay(value)}`}
    
        />
        
        </div>
        </div>
      )
  }
  }
  // handle={handle}
 
  // <Range min={0} max={24} defaultValue = {[2]}/>

  const mapDispatchToProps=(dispatch)=>({
    actions: bindActionCreators(actionCreators, dispatch)
  })
  const mapStateToProps=(state)=>({trips: state.trips})
  export default connect(mapStateToProps, mapDispatchToProps)(SliderToday)