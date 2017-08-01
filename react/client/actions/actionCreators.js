import axios from 'axios'

///////////////////////
export function renderJobList(){
  return {
    type: 'RENDER_JOB_LIST'
  }
}
//////////////////////////////////////

export function setCurrentTruckFlickerJob(job, pathname){
  return {
    type: 'SET_CURRENT_TRUCKFLICKER_JOB',
    payload: job,
    pathname
  }
}

export function clearCurrentTruckFlickerJob(pathname){
  return {
    type: 'CLEAR_CURRENT_TRUCKFLICKER_JOB',
    pathname
  }
}

export function setHiddenStatus(job){
  return {
    type: 'SET_HIDDEN_STATUS',
    payload: job
  }
}
//
export function setUnhiddenStatus(job){
  return {
    type: 'SET_UNHIDDEN_STATUS',
    payload: job
  }
}

export function sortByColumn(attribute, order){
  return {
    type: 'SORT_BY_COLUMN',
    attribute,
    order
  }
}

export function sendSingleTripToRails(trip){
  console.log('trip', trip)
  return function(dispatch){
    const data = {trip}
    const url = 'http://localhost:5000/api/trips/new.json'
     axios.post(url, data, {withCredentials: true})
     .then((response)=>{
      dispatch({
        type: 'SEND_TRIP_FULFILLED',
        payload: response.data
      })
     })
     .catch((error)=>{
      dispatch({
        type: 'SEND_TRIP_REJECTED',
        payload: error
      })
     })

  }
}

export function getAllTripsFromRails(){
  return function(dispatch){
    const url = 'http://localhost:5000/api/trips'
    axios.get(url, {withCredentials:true})
    .then((response)=>{
      dispatch({
        type: 'GET_TRIPS_FULFILLED',
        payload: response.data
      })
    })
    .catch((error)=>{
      dispatch({
        type: 'GET_TRIPS_REJECTED',
        payload: error
      })
    })
  }
}


  

  
