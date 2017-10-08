import axios from 'axios'
import Trip from '../models/trip'
import Diversion from '../models/diversion'

// export function setPartloadSliderSecondsFromStart(secondsPassed){
//   return {
//     type: 'SET_PARTLOAD_SLIDER_SECONDS_FROM_START',
//     payload: secondsPassed
//   }
// }

export function clearPartloadMarkerArray(){
  return {
    type: 'CLEAR_PARTLOAD_MARKER_ARRAY'
  }
}

export function removal_from_store_suggestions_request(){
  return function(dispatch) {
    const url = 'http://localhost:5000/api/removal_from_store/123/1511827200000/1241'
    axios.get(url, {withCredentials:true})
    .then((response)=>{
      // response.data[0].latlng = JSON.parse(response.data[0].latlng)
      var latlng2 = JSON.parse(response.data[0].latlng)
      response.data[0].latlng = latlng2
      var directions = JSON.parse(response.data[4].google_waypoints_directions)
      response.data[4].google_waypoints_directions = directions
   
      response.data[2].forEach((trip)=>{
       var a = new Trip(trip)
       // var g_dir = JSON.parse(trip.google_waypoints_directions)
       // trip.google_waypoints_directions = g_dir
       var diversion = createDiversion(trip, response.data)
       a.possible_diversions.push(diversion)
      })
      
      response.data[3].forEach((trip)=>{
       var a = new Trip(trip)
       
       var diversion = createDiversion(trip, response.data, false)
       a.possible_diversions.push(diversion)
      })
      dispatch({
        type: 'GET_REMOVAL_FROM_STORE_SUGGESTIONS_FULFILLED',
        payload: response.data
      })
    })
    .catch((error)=>{
      dispatch({
        type: 'GET_REMOVAL_FROM_STORE_SUGGESTIONS_REJECTED',
        payload: error
      })
    })
  }
}

function createDiversion(trip, response_array, single_trip_solution = true){
  console.log('response array', response_array)
   var g_dir = JSON.parse(trip.google_waypoints_directions)
   trip.google_waypoints_directions = g_dir
   var diversion = new Diversion(trip, response_array, single_trip_solution)
   return diversion

  
}

export function addMarkerToPartloadMarkerArray(coords){
  return {
    type: 'ADD_MARKER_TO_PARTLOAD_MARKER_ARRAY',
    payload: coords
  }
}

export function getPickUpBestJobsFromRails(startLat, startLng){
  return function(dispatch){
    const url = 'http://localhost:5000/api/trips/partload_closest_pickup.json'
    const data = {
      startLat, startLng
    }

    axios.post(url, data, {withCredentials: true})
    .then((response)=>{
      console.log("response from rails", response.data)
      dispatch({
        type: 'BEST_PICK_UP_JOBS_FULFILLED',
        payload: response.data
      })
    })
    .catch((error)=>{
      dispatch({
        type: 'BEST_PICK_UP_JOBS_REJECTED',
        payload: error
      })
    })
  }
}


export function clearPickUpBestJobs(){
  return {
    type: 'CLEAR_BEST_PICK_UP_JOBS'
  
  }
}


export function setPartloadCollectionPostcode(postcode){
  return {
    type: 'SET_PARTLOAD_COLLECTION_POSTCODE',
    payload: postcode
  }
}

export function setPartloadDeliveryPostcode(postcode){
  return {
    type: 'SET_PARTLOAD_DELIVERY_POSTCODE',
    payload: postcode
  }
}

