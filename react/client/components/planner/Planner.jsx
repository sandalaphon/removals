import React from 'react'
import Gmap from './Gmap'
import Filter from './Filter'
import TruckDayView from './TruckDayView'
import TruckFlicker from './TruckFlicker'
import JobList from './JobList'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'



class Planner extends React.Component {
  

  render(){

    return(
      <div className = 'grid-planner'>
            <JobList 
              deleteDroppedCells={this.props.actions.deleteDroppedCells}
              setCurrentDragJob={this.props.actions.setCurrentDragJob} 
              all_trips={this.props.state.trips.all_trips} 
              isInScheduler={this.props.state.trips.isInScheduler} />
            <Filter/>
            <TruckDayView />
            <Gmap />
            <TruckFlicker/>
      </div>
      )
  }
}

const mapDispatchToProps=(dispatch)=>({
actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({state})
export default connect(mapStateToProps, mapDispatchToProps)(Planner)
