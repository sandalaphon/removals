import store from '../store.js'
import { dispatch } from 'redux'

class Animation {
  constructor(mapObject, pathname) {
    this.pathname = pathname
    this.mapObject = mapObject
  }

  placeMarkers(sliderSecondsFromStart) {
    var {
      arrayOfTrips,
      currentTruckFlickerJob,
    } = this.getArrayAndTruckflickerJob(this.pathname)
    var sliderMarkerObjectArray = []

    if (currentTruckFlickerJob) {
      var trip = currentTruckFlickerJob
      if (trip.hidden[this.pathname]) return
      sliderMarkerObjectArray = this.getSliderMarkerObject(
        trip,
        sliderSecondsFromStart,
      )
        ? [this.getSliderMarkerObject(trip, sliderSecondsFromStart)]
        : []
    } else {
      arrayOfTrips.forEach((trip, index) => {
        if (trip.hidden[this.pathname]) return
        var sliderMarkerObject = this.getSliderMarkerObject(
          trip,
          sliderSecondsFromStart,
          index,
        )
        if (sliderMarkerObject) sliderMarkerObjectArray.push(sliderMarkerObject)
      })
    }

    this.mapObject.handleSliderMarkerArray(sliderMarkerObjectArray)
  }

  getSliderMarkerObject(trip, secondsFromStart, index = 0) {
    var sliderMarkerObject
    var {
      steps,
      leg,
      secondsFromStart,
    } = this.getStepsAndLegAndSecondsFromStartWaypoints(secondsFromStart, trip)
    if (steps) {
      var {
        fractionOfStep,
        currentStep,
      } = this.getCurrentStepAndFractionOfStep(steps, secondsFromStart)
    } else {
      switch (leg) {
        case 'loading':
          return {
            markerCoords:
              trip.google_waypoints_directions.routes[0].legs[1].start_location,
            colour: trip.colour,
            message: trip.client_name,
            index,
            leg,
          }
          break
        case 'unloading':
          return {
            markerCoords:
              trip.google_waypoints_directions.routes[0].legs[1].end_location,
            colour: trip.colour,
            message: trip.client_name,
            index,
            leg,
          }
          break
      }
    }

    if (fractionOfStep == undefined) return
    var indexOfPath = Math.floor(fractionOfStep * currentStep.path.length)

    var markerCoords = {
      lat: currentStep.path[indexOfPath].lat,
      lng: currentStep.path[indexOfPath].lng,
    }
    sliderMarkerObject = {
      markerCoords,
      colour: trip.colour,
      message: trip.client_name,
      index,
      leg,
    }

    return sliderMarkerObject
  }

  getCurrentStepAndFractionOfStep(steps, secondsFromStart) {
    var fractionOfStep
    var currentStep
    // <<<<<<< HEAD
    var secondsStartToEndOfStep = 0
    var stepCompleted = false
    steps.forEach((step, index) => {
      if (stepCompleted) return
      secondsStartToEndOfStep += step.duration.value
      if (secondsStartToEndOfStep > secondsFromStart) {
        fractionOfStep =
          (secondsFromStart - (secondsStartToEndOfStep - step.duration.value)) /
          step.duration.value
        currentStep = steps[index]
        stepCompleted = true
        // =======
        //     var secondsStartToEndOfStep = 0
        //     var stepCompleted = false
        //     steps.forEach((step, index)=>{
        //       if(stepCompleted) return
        //        secondsStartToEndOfStep += step.duration.value

        //        if(secondsStartToEndOfStep>secondsFromStart){
        //         fractionOfStep  = (  secondsFromStart  -  (secondsStartToEndOfStep-step.duration.value))/step.duration.value
        //         currentStep = steps[index]
        //         stepCompleted = true
        // >>>>>>> develop
      }
    })

    return { fractionOfStep, currentStep }
  }

  getStepsAndLegAndSecondsFromStartWaypoints(secondsFromStart, trip) {
    var from_branch = trip.google_waypoints_directions.routes[0].legs[0]
    var carry = trip.google_waypoints_directions.routes[0].legs[1]
    var to_branch = trip.google_waypoints_directions.routes[0].legs[2]

    var from_branch_duration_seconds = from_branch.duration.value
    var carry_duration_seconds = carry.duration.value
    var to_branch_duration_seconds = to_branch.duration.value

    if (secondsFromStart <= from_branch_duration_seconds) {
      var { steps } = from_branch
      var leg = 'from_branch'
    } else if (
      secondsFromStart <=
      from_branch_duration_seconds + trip.seconds_to_load
    ) {
      var steps = null
      var leg = 'loading'
    } else if (
      secondsFromStart <=
      carry_duration_seconds +
        from_branch_duration_seconds +
        trip.seconds_to_load
    ) {
      secondsFromStart =
        secondsFromStart - from_branch_duration_seconds - trip.seconds_to_load
      var { steps } = carry
      var leg = 'carry'
    } else if (
      secondsFromStart <=
      carry_duration_seconds +
        from_branch_duration_seconds +
        trip.seconds_to_load +
        trip.seconds_to_unload
    ) {
      var steps = null
      var leg = 'unloading'
    } else {
      secondsFromStart =
        secondsFromStart -
        from_branch_duration_seconds -
        carry_duration_seconds -
        trip.seconds_to_load -
        trip.seconds_to_unload
      var { steps } = to_branch
      var leg = 'to_branch'
    }

    return { steps, leg, secondsFromStart }
  }

  ////////////////////////

  getArrayAndTruckflickerJob(pathname) {
    var arrayOfTrips
    var currentTruckFlickerJob

    switch (pathname) {
      case 'planner':
        arrayOfTrips = store.getState().common.all_trips
        currentTruckFlickerJob = store.getState().common
          .current_planner_truckflicker_job

        break
      case 'partload':
        arrayOfTrips = store.getState().partload.best_pick_up_jobs
        currentTruckFlickerJob = store.getState().common
          .current_partload_truckflicker_job

        break
      case 'today':
      if(store.getState().today.today_closest.length){
        arrayOfTrips = store.getState().today.today_closest
      }else{ 
             arrayOfTrips = store.getState().today.today_trips
      }
        
        currentTruckFlickerJob = store.getState().common
          .current_today_truckflicker_job

        break
      case 'removal_from_store':
        // arrayOfTrips = store.getState().removal_from_store.removal_from_store_trips
        arrayOfTrips = []
        currentTruckFlickerJob = store.getState().common
          .current_removal_from_store_truckflicker_job

        break
    }
    return { arrayOfTrips, currentTruckFlickerJob }
  }
}

export default Animation
