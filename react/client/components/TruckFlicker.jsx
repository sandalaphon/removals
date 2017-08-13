import React from 'react'
import {mapObjectInstances} from '../models/mapObject'
import * as commonActions from '../actions/_common_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'


class TruckFlicker extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
    }
    // this.indexOfRenderedRoute = -1
    
  }

  showAllRoutes(event){
    event.preventDefault()
  }

  handlePreviousClick(event){
    event.preventDefault()
    this.renderAppropriateRoute(false)
 }

 handleNextClick(event){
   event.preventDefault()
   this.renderAppropriateRoute(true)
  }

  // renderAppropriateRoute(next = true){
 
  //   var increment = next ? 1 : -1 // +1 for next, -1 for previous
  //   var numberHiddenRoutes = 0 //to create guard for all hidden list
  //   var mapObject
  //   var relevantArray
  //   var current_truckflicker_job
  //   var pathname =this.props.router.location.pathname
  //   switch (pathname){
  //     case '/today':
  //     current_truckflicker_job = this.props.trips.current_today_truckflicker_job
  //     mapObject = mapObjectInstances.today
  //     relevantArray = this.props.trips.all_trips
  //     pathname='today'
  //     break;
  //     case '/planner':
  //     current_truckflicker_job = this.props.trips.current_planner_truckflicker_job
  //     mapObject = mapObjectInstances.planner
  //     relevantArray = this.props.trips.all_trips
  //     pathname='planner'
  //     break;
  //     case '/partload':
  //     current_truckflicker_job = this.props.trips.current_partload_truckflicker_job
  //     mapObject = mapObjectInstances.partload
  //     relevantArray = this.props.best_pick_up_jobs
  //     pathname='partload'
  //     break;
  //   }

  //   var arrayOfUnhiddenIndexes = this.getIndexesOfUnhidden(relevantArray)

  //   if(!next && this.indexOfRenderedRoute === -1 ){
  //            this.indexOfRenderedRoute=relevantArray.length
  //      }
    
  //   if(current_truckflicker_job){
  //       this.indexOfRenderedRoute = relevantArray.indexOf(current_truckflicker_job)     
  //   }
  //  var counter = this.indexOfRenderedRoute

  //   if(next && this.indexOfRenderedRoute===relevantArray.length-1 ){
  //     console.log('next and last one')
  //     this.indexOfRenderedRoute = -1
  //     counter = -1
  //   }
  //   if(!next && this.indexOfRenderedRoute===0){
  //     this.indexOfRenderedRoute = counter = relevantArray.length
  //   }

  //   mapObject.branchesShowing=false
 
  //   while(true){ 
  //     console.log('pathname', pathname)
  //     counter = counter + increment
  //     if(counter>=relevantArray.length || counter < 0) break
  //     var job = relevantArray[counter]
  //     if (!job.hidden){
  //       this.props.actions.common_actions.setCurrentTruckFlickerJob(job, pathname)
  //       mapObject.clearMap()
  //       mapObject.drawRouteWithGoogleResponse(job)
  //       this.indexOfRenderedRoute = counter
  //       break
  //     }else{
  //       numberHiddenRoutes = numberHiddenRoutes + 1
  //       if(numberHiddenRoutes>=relevantArray.length) break
  //     }

  //   }

  // }

  renderAppropriateRoute(next = true){
  
    var increment = next ? 1 : -1 // +1 for next, -1 for previous
    // var numberHiddenRoutes = 0 //to create guard for all hidden list
    var mapObject
    var relevantArray
    var current_truckflicker_job
    var pathname =this.props.router.location.pathname
    switch (pathname){
      case '/today':
      current_truckflicker_job = this.props.trips.current_today_truckflicker_job
      mapObject = mapObjectInstances.today
      relevantArray = this.props.trips.all_trips
      pathname='today'
      break;
      case '/planner':
      current_truckflicker_job = this.props.trips.current_planner_truckflicker_job
      mapObject = mapObjectInstances.planner
      relevantArray = this.props.trips.all_trips
      pathname='planner'
      break;
      case '/partload':
      current_truckflicker_job = this.props.trips.current_partload_truckflicker_job
      mapObject = mapObjectInstances.partload
      relevantArray = this.props.best_pick_up_jobs
      pathname='partload'
      break;
    }

    var arrayOfUnhiddenIndexes = this.getIndexesOfUnhidden(relevantArray)

    

   //  if(!next && this.indexOfRenderedRoute === -1 ){
   //           this.indexOfRenderedRoute=relevantArray.length
   //     }
    
   //  if(current_truckflicker_job){
   //      this.indexOfRenderedRoute = relevantArray.indexOf(current_truckflicker_job)     
   //  }
   // var counter = this.indexOfRenderedRoute

   //  if(next && this.indexOfRenderedRoute===relevantArray.length-1 ){
   //    console.log('next and last one')
   //    this.indexOfRenderedRoute = -1
   //    counter = -1
   //  }
   //  if(!next && this.indexOfRenderedRoute===0){
   //    this.indexOfRenderedRoute = counter = relevantArray.length
   //  }

    mapObject.branchesShowing=false
  
    // while(true){ 
    //   console.log('pathname', pathname)
    //   counter = counter + increment
    //   if(counter>=relevantArray.length || counter < 0) break
    //   var job = relevantArray[counter]
    //   if (!job.hidden){
    //     this.props.actions.common_actions.setCurrentTruckFlickerJob(job, pathname)
    //     mapObject.clearMap()
    //     mapObject.drawRouteWithGoogleResponse(job)
    //     this.indexOfRenderedRoute = counter
    //     break
    //   }else{
    //     numberHiddenRoutes = numberHiddenRoutes + 1
    //     if(numberHiddenRoutes>=relevantArray.length) break
    //   }

    // }

  }

  getIndexesOfUnhidden(relevantArray){
    var arrayOfUnhiddenIndexes = []
    relevantArray((job, index)=>{
      if(!job.hidden){
        arrayOfUnhiddenIndexes.push(index)
      }
    })
  }




  render(){
    return (
      <div className = 'grid-item-truck-flicker'>
        <button onClick={this.showAllRoutes.bind(this)}>Show All Routes</button>
        <button onClick={this.handlePreviousClick.bind(this)}>Previous</button>
        <button onClick={this.handleNextClick.bind(this)}>Next</button>
      </div>
    );
  }

}

const mapDispatchToProps=(dispatch)=>({
  actions: {
      common_actions: bindActionCreators(commonActions, dispatch)
    }
})

const mapStateToProps=(state)=>({
  trips: state.common,
  best_pick_up_jobs: state.partload.best_pick_up_jobs
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TruckFlicker))

