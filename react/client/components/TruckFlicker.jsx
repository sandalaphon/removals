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
  }

  componentWillMount(){
    this.pathname = this.props.router.location.pathname.slice(1)
  }

  setInstanceVariables(){

    switch (this.pathname){
      case 'today':
      this.current_truckflicker_job = this.props.trips.current_today_truckflicker_job
      this.mapObject = mapObjectInstances.today
      this.relevantArray = this.props.trips.all_trips
      this.branchStatus = this.props.trips.branches_status_today
      break;
      case 'planner':
      this.current_truckflicker_job = this.props.trips.current_planner_truckflicker_job
      this.mapObject = mapObjectInstances.planner
      this.relevantArray = this.props.trips.all_trips
      break;
      case 'partload':
      this.current_truckflicker_job = this.props.trips.current_partload_truckflicker_job
      this.mapObject = mapObjectInstances.partload
      this.relevantArray = this.props.best_pick_up_jobs
      break;
    }
  }

  showAllRoutes(event){
    event.preventDefault()
    this.setInstanceVariables()
    // this.mapObject.clearMap()
    this.relevantArray.forEach((job)=>{
      this.props.actions.common_actions.setHiddenStatus(job)
    }) 
    this.props.actions.common_actions.clearCurrentTruckFlickerJob(this.pathname)
  }

  handlePreviousClick(event){
    event.preventDefault()
    this.renderAppropriateRoute(false)
  }

  handleNextClick(event){
   event.preventDefault()
   this.renderAppropriateRoute(true)
 }


 renderAppropriateRoute(next = true){
  this.setInstanceVariables()
  var jobToDisplay = this.getNextJobToDisplay(next)
  this.mapObject.clearMap()
  // this.mapObject.branchesShowing=false
  if(jobToDisplay){
    this.mapObject.drawRouteWithGoogleResponse(jobToDisplay)
      // this.current_truckflicker_job = jobToDisplay
      this.props.actions.common_actions.setCurrentTruckFlickerJob(jobToDisplay, this.pathname)
    }

  }

  getNextJobToDisplay(next){

    var arrayToUse = next ? this.relevantArray : this.relevantArray.slice().reverse()
    var jobToReturn
    var unfound=true
    if(!this.current_truckflicker_job){
      arrayToUse.forEach((job)=>{
        if(!job.hidden&&unfound){
          jobToReturn = job
          unfound=false
        } 
      })
    }else{
      let currentIndex = arrayToUse.indexOf(this.current_truckflicker_job)
      arrayToUse.forEach((job, index)=>{
        if(!job.hidden&&index>currentIndex&&unfound){
          jobToReturn=job
          unfound=false
        }
      })
      if(unfound){
        arrayToUse.forEach((job, index)=>{
          if(!job.hidden&&index<=currentIndex&&unfound){
            jobToReturn=job
            unfound=false
          }
        })
      }
    }
    return jobToReturn
  }

  handleShowFromBranch(event){
    event.preventDefault()
    this.props.actions.common_actions.setShowFromBranch()
  }

  handleShowToBranch(event){
    event.preventDefault()
    this.props.actions.common_actions.setShowToBranch()
  }

  render(){
    // this.setInstanceVariables()
    return (
      <div className = 'grid-item-truck-flicker'>
      <button onClick={this.showAllRoutes.bind(this)}>Show All Routes</button>
      <button onClick={this.handleShowToBranch.bind(this)}>Show To Branch</button>
      <button onClick={this.handleShowFromBranch.bind(this)}>Show From Branch</button>
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

