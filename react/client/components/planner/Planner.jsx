import React from "react";
import JobList from "./JobList";
import Gmap from "../Gmap";
import Filter from "./Filter";
import TruckDayView from "./TruckDayView";
import TruckFlicker from "../TruckFlicker";
import SliderPlanner from "./SliderPlanner";
import BranchesInfo from "../BranchesInfo";
// import {connect} from 'react-redux'

class Planner extends React.Component {
  render() {
    var branchStyle = {
      gridArea: "lef",
      border: "4px solid green",
      height: "95vh",
      width: "60vw"
    };

    return (
      <div className="grid-planner">
        <div className="grid-item-planner-right width40vw">
          <Gmap />
          <TruckFlicker />
          <SliderPlanner />
        </div>

        <div className="grid-item-planner-left width60vw">
          <JobList />
          <Filter />
          <TruckDayView />
          <div className="branch-info-table-planner hidden" style={branchStyle}>
            <BranchesInfo />
          </div>
        </div>
      </div>
    );
  }
}

export default Planner;

// const mapStateToProps=(state)=>({
//   branch_status_planner: state.common.branch_status_planner,

// })

// export default connect(mapStateToProps)(Planner)

// import React from 'react'
// import JobList        from './JobList'
// import Gmap           from '../Gmap'
// import Filter         from './Filter'
// import TruckDayView   from './TruckDayView'
// import TruckFlicker   from '../TruckFlicker'
// import SliderPlanner  from './SliderPlanner'
// import {connect} from 'react-redux'

// class Planner extends React.Component {

//   render(){
//     var toDisplay
//  if(this.props.branch_status_planner==2){
//   toDisplay=<div className = 'grid-planner'>

//             <Gmap />
//             <TruckFlicker/>
//             <SliderPlanner/>
//       </div>
//  }else{
//   toDisplay=<div className = 'grid-planner'>
//             <JobList/>
//             <Filter/>
//             <TruckDayView />
//             <Gmap />
//             <TruckFlicker/>
//             <SliderPlanner/>
//       </div>
//  }
//     return(
//       <div >
//          {toDisplay}
//       </div>
//     )
//   }

// }

// // export default Planner
// const mapStateToProps=(state)=>({
//   branch_status_planner: state.common.branch_status_planner,

// })

// export default connect(mapStateToProps)(Planner)
