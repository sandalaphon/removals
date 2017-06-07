import React from 'react'
import Gmap from './Gmap'
import Filter from './Filter'
import TruckDayView from './TruckDayView'
import TruckFlicker from './TruckFlicker'

class Planner extends React.Component {
  render(){
    return(
      <div className = 'grid-planner'>
            <Filter/>
            <TruckDayView />
            <Gmap />
            <TruckFlicker/>
      </div>
      )
  }
}

export default Planner
