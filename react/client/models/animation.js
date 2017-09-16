import store from '../store.js'
import { dispatch } from 'redux';

class Animation{

constructor(mapObject, pathname){
this.pathname = pathname
this.mapObject = mapObject
}

placeMarkers(sliderSecondsFromStart){
    var {arrayOfTrips, currentTruckFlickerJob} = this.getArrayAndTruckflickerJob(this.pathname)
    var sliderMarkerObjectArray = []

    if(currentTruckFlickerJob){
      var trip = currentTruckFlickerJob
      if(trip.hidden) return
       sliderMarkerObjectArray =  this.getSliderMarkerObject(trip, sliderSecondsFromStart) ?  [this.getSliderMarkerObject(trip, sliderSecondsFromStart)] : [] 
       
    }else{
      arrayOfTrips.forEach((trip, index)=>{
        if(trip.hidden) return
          var sliderMarkerObject = this.getSliderMarkerObject(trip, sliderSecondsFromStart, index)
           if(sliderMarkerObject) sliderMarkerObjectArray.push(sliderMarkerObject)
      });
    }
    
    this.mapObject.handleSliderMarkerArray(sliderMarkerObjectArray)

  }

getSliderMarkerObject(trip, secondsFromStart, index=0){

      var sliderMarkerObject
      var {steps, leg, secondsFromStart} = this.getStepsAndLegAndSecondsFromStartWaypoints(secondsFromStart, trip)
      var {fractionOfStep, currentStep} = this.getCurrentStepAndFractionOfStep(steps, secondsFromStart)
      if(!fractionOfStep) return
      var indexOfPath = Math.floor(fractionOfStep*currentStep.path.length)

      var markerCoords = ({lat: currentStep.path[indexOfPath].lat, lng: currentStep.path[indexOfPath].lng})
      sliderMarkerObject = {markerCoords, colour: trip.colour, message: trip.client_name, index, leg}

      return sliderMarkerObject
  }

  getCurrentStepAndFractionOfStep(steps, secondsFromStart){
    var fractionOfStep
    var currentStep
    var secondsStartToEndOfStep = 0
    var stepCompleted = false
    steps.forEach((step, index)=>{
      if(stepCompleted) return
       secondsStartToEndOfStep += step.duration.value
       if(secondsStartToEndOfStep>secondsFromStart){
        fractionOfStep  = (  secondsFromStart  -  (secondsStartToEndOfStep-step.duration.value))/step.duration.value
        currentStep = steps[index]
        stepCompleted = true
       }
    })

    console.log('fraction and current step', fractionOfStep, currentStep)
    return {fractionOfStep, currentStep}
  }

  // getStepsAndLegAndSecondsFromStart(secondsFromStart, trip){
  //   var from_branch_duration_seconds=trip.google_directions_from_branch.routes[0].legs[0].duration.value

  //   var carry_duration_seconds=trip.google_directions.routes[0].legs[0].duration.value

  //   var to_branch_duration_seconds=trip.google_directions_to_branch.routes[0].legs[0].duration.value
  //   if(secondsFromStart<=from_branch_duration_seconds){
  //     var {steps} =trip.google_directions_from_branch.routes[0].legs[0]
  //     var leg = 'from_branch'
  //   }else if(secondsFromStart<=carry_duration_seconds+from_branch_duration_seconds){
  //     secondsFromStart=secondsFromStart-from_branch_duration_seconds
  //     var {steps} =trip.google_directions.routes[0].legs[0]
  //     var leg = 'carry'
  //   }else{
  //     secondsFromStart=secondsFromStart-from_branch_duration_seconds-carry_duration_seconds
  //     var {steps} =trip.google_directions_to_branch.routes[0].legs[0]
  //     var leg = 'to_branch'
  //   }


  //   return {steps, leg, secondsFromStart}
  // }




  ////////////////

  getStepsAndLegAndSecondsFromStartWaypoints(secondsFromStart, trip){
    var from_branch = trip.google_waypoints_directions.routes[0].legs[0]
    var carry = trip.google_waypoints_directions.routes[0].legs[1]
    var to_branch = trip.google_waypoints_directions.routes[0].legs[2]

    var from_branch_duration_seconds = from_branch.duration.value
    var carry_duration_seconds       = carry.duration.value
    var to_branch_duration_seconds   = to_branch.duration.value

    if(secondsFromStart<=from_branch_duration_seconds){
      var {steps} = from_branch
      var leg = 'from_branch'
    }else if(secondsFromStart<=carry_duration_seconds+from_branch_duration_seconds){
      secondsFromStart=secondsFromStart-from_branch_duration_seconds
      var {steps} = carry
      var leg = 'carry'
    }else{
      secondsFromStart=secondsFromStart-from_branch_duration_seconds-carry_duration_seconds
      var {steps} = to_branch
      var leg = 'to_branch'
    }


    return {steps, leg, secondsFromStart}
  }


  ////////////////////////

 getArrayAndTruckflickerJob(pathname){
    var arrayOfTrips
    var currentTruckFlickerJob
   
    switch(pathname){
      case 'planner':
      arrayOfTrips = store.getState().common.all_trips
      currentTruckFlickerJob = store.getState().common.current_planner_truckflicker_job
    
      break;
      case 'partload':
      arrayOfTrips = store.getState().partload.best_pick_up_jobs
      currentTruckFlickerJob = store.getState().common.current_partload_truckflicker_job

      break;
      case 'today':
      arrayOfTrips = store.getState().common.all_trips
      currentTruckFlickerJob = store.getState().common.current_today_truckflicker_job
    
      break;
    }
    return {arrayOfTrips, currentTruckFlickerJob}

  }

}

export default Animation