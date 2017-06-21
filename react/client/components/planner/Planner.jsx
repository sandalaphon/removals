import React from 'react'
import Gmap from './Gmap'
import Filter from './Filter'
import TruckDayView from './TruckDayView'
import TruckFlicker from './TruckFlicker'
import JobList from './JobList'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";


class Planner extends React.Component {
  

  render(){

    return(
      
      <div className = 'grid-planner'>
            <JobList/>
            <Filter setSearchQuery={this.props.actions.setSearchQuery}/>
            <TruckDayView />
            <Gmap />
            <TruckFlicker all_trips={this.props.state.trips.all_trips}/>
      </div>
      
      )
  }
}

const mapDispatchToProps=(dispatch)=>({
actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({state})


Planner = DragDropContext(HTML5Backend)(Planner);
export default connect(mapStateToProps, mapDispatchToProps)(Planner)
