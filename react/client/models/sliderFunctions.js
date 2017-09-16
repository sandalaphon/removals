// import store from '../store'
// import {mapObjectInstances} from './mapObject'



// export function placeMarkers(sliderSecondsFromStart, pathname){
//     var {arrayOfTrips, currentTruckFlickerJob, mapObject} = getArrayAndTruckflickerJob(pathname)
//     var sliderMarkerObjectArray = []

//     if(currentTruckFlickerJob){
//       var trip = currentTruckFlickerJob
//       if(trip.hidden) return
//        sliderMarkerObjectArray =  getSliderMarkerObject(trip, sliderSecondsFromStart) ?  [getSliderMarkerObject(trip, sliderSecondsFromStart)] : [] 
       
//     }else{
//       arrayOfTrips.forEach((trip, index)=>{
//         if(trip.hidden) return
//           var sliderMarkerObject = getSliderMarkerObject(trip, sliderSecondsFromStart, index)
//            if(sliderMarkerObject) sliderMarkerObjectArray.push(sliderMarkerObject)
//       });
//     }
    
//     mapObject.handleSliderMarkerArray(sliderMarkerObjectArray)

//   }

//     function getSliderMarkerObject(trip, secondFromStart, index=0){

//       var truckSecondsFromStart = 0
//       var sliderMarkerObject
//       var stepCompleted = false
//       var {steps, leg, secondFromStart} = getStepsAndLegAndSecondFromStart(secondFromStart, trip, secondFromStart)

//       steps.forEach((step)=>{
//         if(stepCompleted) return
//         var currentStepDuration = step.duration.value
//          truckSecondsFromStart += currentStepDuration
//          if(truckSecondsFromStart>secondFromStart){
//           var fractionOfStep  = (  secondFromStart  -  (truckSecondsFromStart-currentStepDuration))/currentStepDuration
//           var indexOfStepPath = Math.floor(fractionOfStep*step.path.length)

//           var markerCoords = ({lat: step.path[indexOfStepPath].lat, lng: step.path[indexOfStepPath].lng})
//           sliderMarkerObject = {markerCoords, colour: trip.colour, message: trip.client_name, index, leg}
//           stepCompleted = true
//          }
//       });

//       return sliderMarkerObject
//   }

//    function getStepsAndLegAndSecondFromStart(secondFromStart, trip){
//     var from_branch_duration_seconds=trip.google_directions_from_branch.routes[0].legs[0].duration.value
//     var carry_duration_seconds=trip.google_directions.routes[0].legs[0].duration.value
//     var to_branch_duration_seconds=trip.google_directions_to_branch.routes[0].legs[0].duration.value
//     if(secondFromStart<=from_branch_duration_seconds){
//       var {steps} =trip.google_directions_from_branch.routes[0].legs[0]
//       var leg = 'from_branch'
//     }else if(secondFromStart<=carry_duration_seconds+from_branch_duration_seconds){
//       secondFromStart=secondFromStart-from_branch_duration_seconds
//       var {steps} =trip.google_directions.routes[0].legs[0]
//       var leg = 'carry'
//     }else{
//       secondFromStart=secondFromStart-from_branch_duration_seconds-carry_duration_seconds
//       var {steps} =trip.google_directions_to_branch.routes[0].legs[0]
//       var leg = 'to_branch'
//     }
//     return {steps, leg, secondFromStart}
//   }

//   function getArrayAndTruckflickerJob(pathname){
//     var arrayOfTrips
//     var currentTruckFlickerJob
//     var mapObject
//     switch(pathname){
//       case 'planner':
//       arrayOfTrips = store.getState().common.all_trips
//       currentTruckFlickerJob = store.getState().common.current_planner_truckflicker_job
//       mapObject = mapObjectInstances.planner
//       break;
//       case 'partload':
//       arrayOfTrips = store.getState().partload.best_pick_up_jobs
//       mapObject = mapObjectInstances.partload
//       currentTruckFlickerJob = store.getState().common.current_partload_truckflicker_job

//       break;
//       case 'today':
//       arrayOfTrips = store.getState().common.all_trips
//       currentTruckFlickerJob = store.getState().common.current_today_truckflicker_job
//       mapObject = mapObjectInstances.today
//       break;
//     }
//     return {arrayOfTrips, currentTruckFlickerJob, mapObject}

//   }