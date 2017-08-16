import React from 'react'
import JobList        from './JobList'
import Gmap           from '../Gmap'
import Filter         from './Filter'
import TruckDayView   from './TruckDayView'
import TruckFlicker   from '../TruckFlicker'
import SliderPlanner  from './SliderPlanner'
// import {connect} from 'react-redux'

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
