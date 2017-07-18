import React from 'react'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { mapObjectInstances} from '../../models/mapObject'
import Slider,  { Range, createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css';



class SliderToday extends React.Component{

  constructor(props) { //may need this later
      super(props);
  }

  render(){
    const wrapperStyle = {width: 100, margin: 20};
    return(
        <div className='grid-item-slider-today'>
        <div style = {wrapperStyle}>
      
        <Range min={0} max={20} defaultValue = {[2,5]}/>
        </div>
        </div>
      )
  }
  }

  const mapDispatchToProps=(dispatch)=>({
    actions: bindActionCreators(actionCreators, dispatch)
  })
  const mapStateToProps=(state)=>({trips: state.trips})
  export default connect(mapStateToProps, mapDispatchToProps)(SliderToday)