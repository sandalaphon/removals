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

export function removal_from_store_suggestions_request(trip_id, end_date_milli){
  return function(dispatch) {
    const url = `http://localhost:5000/api/removal_from_store/123/${end_date_milli}/${trip_id}`
    console.log('url', url)
    // const url = 'http://localhost:5000/api/removal_from_store/123/1511827200000/1241'
    axios.get(url, {withCredentials:true})
    .then((response)=>{
      var diversions_promised = []
      var latlng_holder                            = JSON.parse(response.data[0].latlng)
      var directions_holder                        = JSON.parse(response.data[4].google_waypoints_directions)
      response.data[0].latlng                      = latlng_holder
      response.data[4].google_waypoints_directions = directions_holder
   
      response.data[2].forEach((trip)=>{
       var a = new Trip(trip)
       var diversion = createDiversion(trip, response.data)
       diversions_promised.push(diversion)
      })
      
      response.data[3].forEach((trip)=>{
       var a = new Trip(trip)
       var diversion = createDiversion(trip, response.data, false)
       diversions_promised.push(diversion)
       console.log('diversion', diversion)
     })
      Promise.all(diversions_promised)
      .then((diversions)=>{
        dispatch({
          type: 'GET_REMOVAL_FROM_STORE_SUGGESTIONS_FULFILLED',
          payload: response.data,
          trip_id
        })
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
// return new Promise((resolve, reject)=>{
  console.log('response array', response_array)
   var g_dir = JSON.parse(trip.google_waypoints_directions)
   trip.google_waypoints_directions = g_dir
   return Diversion.diversion_factory(trip, response_array, single_trip_solution)
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

// function getGoogleDirectionPromise(branch_lat_lng, waypoint_latlng_array){
//   var directionInput = {
//       origin: branch_lat_lng,
//       destination: branch_lat_lng,
//       waypoints: waypointArray,
//       travelMode: 'DRIVING',
//       avoidTolls: true
//     }

// var directionsService = new google.maps.DirectionsService()
// directionsService.route(directionInput, function(response, status){
//   if(status==='OK'){
//     console.log('response', response)
//     resolve(response)

//   }else{
//     console.log('in promise error', status)
//     reject(status)
//   }
// })

// }


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

