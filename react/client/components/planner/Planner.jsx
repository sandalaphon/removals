import React from 'react'
import JobList        from './JobList'
import Gmap           from '../Gmap'
import Filter         from './Filter'
import TruckDayView   from './TruckDayView'
import TruckFlicker   from '../TruckFlicker'
import SliderPlanner  from './SliderPlanner'

class Planner extends React.Component {
  
  render(){

    return(
      <div className = 'grid-planner'>
            <Gmap />
            <JobList/>
            <Filter/>
            <TruckDayView />
            <TruckFlicker/>
            <SliderPlanner/>
      </div>
    )
  }

}

export default Planner
