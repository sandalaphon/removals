import React from 'react'
import {mapObjectInstances} from '../models/mapObject'
import * as actionCreators from '../actions/actionCreators'
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

     this.renderAppropriateRoute(relevantArray, false, 'today')
     // AND setState or store rendered route attribute and index
     //And then deal with highlighting in list
     break;

     case '/planner':

     var relevantArray = this.props.trips.all_trips

     this.renderAppropriateRoute(relevantArray, false, 'planner')
     // AND setState or store rendered route attribute and index
     //And then deal with highlighting in list
     break;

     case '/partload':

     var relevantArray = this.props.trips.best_pick_up_jobs

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

    this.renderAppropriateRoute(relevantArray, true, 'today')

      break;

      case '/planner':

      var relevantArray = this.props.trips.all_trips

      this.renderAppropriateRoute(relevantArray, true, 'planner')

        break;


        case '/partload':

        var relevantArray = this.props.trips.best_pick_up_jobs

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

  while(true){ 


    counter = counter + increment
    if(counter>=relevantArray.length || counter < 0) break


      var job = relevantArray[counter]
    
    if (!job.hidden){
      // var key = `${pathname}`

      this.props.actions.setCurrentTruckFlickerJob(job, pathname)
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
  actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({trips: state.trips})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TruckFlicker))

