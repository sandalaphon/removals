import React from 'react'
import Gmap from '../Gmap'
import Filter from '../planner/Filter'
import ListToday from './ListToday'
import SliderToday from './SliderToday'
import TruckFlicker from '../TruckFlicker'


class Today extends React.Component {

  render(){
    return(
      <div className = 'grid-today'>
        <TruckFlicker/>
        <Gmap/>
        <ListToday />
        <SliderToday />
      </div>
      )
  }
  
}

export default Today

// <p>We are Today</p>
