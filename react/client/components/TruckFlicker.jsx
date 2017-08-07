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
    this.indexOfRenderedRoute = -1 
  }

  handlePreviousClick(event){
    event.preventDefault()
    switch (this.props.location.pathname){
      case '/today':
        var relevantArray = this.props.trips.all_trips
        if(this.props.trips.current_today_truckflicker_job){
          this.indexOfRenderedRoute = relevantArray.indexOf(this.props.trips.current_today_truckflicker_job)
        }
        this.renderAppropriateRoute(relevantArray, false, 'today')

        // AND setState or store rendered route attribute and index
        //And then deal with highlighting in list
      break;
     //
      case '/planner':
        var relevantArray = this.props.trips.all_trips
        if(this.props.trips.current_planner_truckflicker_job){
          this.indexOfRenderedRoute = relevantArray.indexOf(this.props.trips.current_planner_truckflicker_job)
        }
        this.renderAppropriateRoute(relevantArray, false, 'planner')
        // AND setState or store rendered route attribute and index
        //And then deal with highlighting in list
      break;
      //
      case '/partload':
        var relevantArray = this.props.best_pick_up_jobs
        if(this.props.trips.current_partload_truckflicker_job){
          this.indexOfRenderedRoute = relevantArray.indexOf(this.props.trips.current_partload_truckflicker_job)
        }
        this.renderAppropriateRoute(relevantArray, false, 'partload')
        // AND setState or store rendered route attribute and index
        //And then deal with highlighting in list
      break;
   }

 }

 handleNextClick(event){
   event.preventDefault()
   console.log(this.props)

  switch (this.props.location.pathname){
    case '/today':
      var relevantArray = this.props.trips.all_trips
      if(this.props.trips.current_today_truckflicker_job){
        this.indexOfRenderedRoute = relevantArray.indexOf(this.props.trips.current_today_truckflicker_job)
      }
     this.renderAppropriateRoute(relevantArray, true, 'today')
    break;
    //
    case '/planner':
      var relevantArray = this.props.trips.all_trips
      if(this.props.trips.current_planner_truckflicker_job){
        this.indexOfRenderedRoute = relevantArray.indexOf(this.props.trips.current_planner_truckflicker_job)
      }
     this.renderAppropriateRoute(relevantArray, true, 'planner')
    break;
    //
    case '/partload':
     var relevantArray = this.props.best_pick_up_jobs
     if(this.props.trips.current_partload_truckflicker_job){
       this.indexOfRenderedRoute = relevantArray.indexOf(this.props.trips.current_partload_truckflicker_job)
     }
     this.renderAppropriateRoute(relevantArray, true, 'partload')
    break;
    }
  }

  renderAppropriateRoute(relevantArray, next = true, pathname){
    var counter = this.indexOfRenderedRoute
    var increment = next ? 1 : -1 // +1 for next, -1 for previous
    var numberHiddenRoutes = 0 //to create guard for all hidden list
    var mapObject
    switch (pathname){
      case 'today':
      mapObject = mapObjectInstances.today
      break;
      case 'planner':
      mapObject = mapObjectInstances.planner
      break;
      case 'partload':
      mapObject = mapObjectInstances.partload
      break;
    }

    if(next && this.indexOfRenderedRoute===relevantArray.length-1 ){
      console.log('next and last one')
      this.indexOfRenderedRoute = -1
      counter = -1
    }
    if(!next && this.indexOfRenderedRoute===0){
      this.indexOfRenderedRoute = counter = relevantArray.length
    }

    while(true){ 
      counter = counter + increment
      if(counter>=relevantArray.length || counter < 0) break
      var job = relevantArray[counter]
      if (!job.hidden){
        this.props.actions.common_actions.setCurrentTruckFlickerJob(job, pathname)
        mapObject.clearMap()
        mapObject.drawRouteWithGoogleResponse(job)
        this.indexOfRenderedRoute = counter
        break
      }else{
        numberHiddenRoutes = numberHiddenRoutes + 1
        if(numberHiddenRoutes>=relevantArray.length) break
      }

    }

  }

  render(){
    return (
      <div className = 'grid-item-truck-flicker'>
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

