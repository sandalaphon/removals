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
    this.indexOfRenderedRoute = undefined
    
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


  renderAppropriateRoute(next = true){

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

    var jobToDisplay = this.getNextJobToDisplay(next, relevantArray, current_truckflicker_job)
    mapObject.clearMap()
  
    mapObject.branchesShowing=false
    if(jobToDisplay){
      mapObject.drawRouteWithGoogleResponse(jobToDisplay)
      this.props.actions.common_actions.setCurrentTruckFlickerJob(jobToDisplay, pathname)
    }
   
  }

  getNextJobToDisplay(next, relevantArray, current_truckflicker_job){

    var arrayToUse = next ? relevantArray : relevantArray.slice().reverse()
    var indexOfJob
    var jobToReturn
    var unfound=true
    if(!current_truckflicker_job){
      arrayToUse.forEach((job)=>{

        if(!job.hidden&&unfound){
          jobToReturn = job
          unfound=false
        } 
      })
    }else{
      let currentIndex = arrayToUse.indexOf(current_truckflicker_job)
      console.log(currentIndex)
     
      arrayToUse.forEach((job, index)=>{
        console.log(!job.hidden, index>currentIndex, unfound)
        if(!job.hidden&&index>currentIndex&&unfound){
          jobToReturn=job
          unfound=false
        }
      
      })
      if(unfound){
        arrayToUse.forEach((job, index)=>{
          if(!job.hidden&&index<currentIndex&&unfound){
            jobToReturn=job
            unfound=false
          }
        })
      }
    }

      return jobToReturn

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

