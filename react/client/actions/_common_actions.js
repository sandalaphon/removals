import axios from 'axios'
import Appointment from '../models/appointments'
import Trip from '../models/trip'

export function setSliderSecondsFromStart(secondsPassed, pathname){
  return {
    type: 'SET_SLIDER_SECONDS_FROM_START',
    secondsPassed,
    pathname
  }
}

export function toggleAnimationRunning(){
  return {
    type: 'TOGGLE_ANIMATION_RUNNING'
  }
}

export function setAnimationSpeed(pathname, increment){
  return {
    type: 'SET_ANIMATION_SPEED',
    pathname,
    increment
  }
}

export function toggleBranchListDisplayed(pathname){
  return {
    type: 'TOGGLE_BRANCH_LIST_DISPLAYED',
    pathname
  }
}

export function toggleBranchesOnMap(pathname){
  return {
    type: 'TOGGLE_BRANCHES_ON_MAP',
    pathname
  }
}

// <<<<<<< HEAD
// export function setShowToBranch(){
//   return {
//     type: 'SET_SHOW_TO_BRANCH'
//   }
// }
// =======
// export function setBranchIconClickedId(id){
//   return {
//     type: 'SET_BRANCH_ICON_CLICKED_ID',
//     id
//   }
// }

// export function setShowToBranch(){
//   return {
//     type: 'SET_SHOW_TO_BRANCH'
//   }
// }
// >>>>>>> develop

// export function setShowFromBranch(){
//   return {
//     type: 'SET_SHOW_FROM_BRANCH'
//   }
// }

export function set_ids_of_trips(id){
  return {
    type: 'SET_IDS_OF_TRIPS',
    id
  }
}

export function toggleFullScreenMap(pathname){
  return {
    type: 'TOGGLE_FULL_SCREEN_MAP',
    pathname
  }
}

export function setFilterSearchString(searchString){
  return {
    type: 'SET_FILTER_SEARCH_STRING',
    payload: searchString
  }
}

export function setCurrentTruckFlickerJob(job, pathname){
  return {
    type: 'SET_CURRENT_TRUCKFLICKER_JOB',
    payload: job,
    pathname
  }
}

export function clearCurrentTruckFlickerJob(pathname){
  console.log('pathname', pathname)
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

// export function composeData(){
//   return {
//     type: 'COMPOSE_DATA_COMPLETED'
//   }
// }

export function getAllTripsFromRails(){
  return function(dispatch){
    const url = 'http://localhost:5000/api/trips'
    axios.get(url, {withCredentials:true})
    .then((response)=>{
      response.data.forEach((trip)=>{
        var a = new Trip(trip)
      })
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

//////////////////////////////



export function getRosCandidatesFromRails(){
  return function(dispatch){
    const url = 'http://localhost:5000/api/rosCandidates'
    axios.get(url, {withCredentials:true})
    .then((response)=>{
      response.data.forEach((trip)=>{
        // var a = new Trip(trip)
      })
      dispatch({
        type: 'GET_ROS_CANDIDATES_FULFILLED',
        payload: response.data
      })
    })
    .catch((error)=>{
      dispatch({
        type: 'GET_ROS_CANDIDATES_REJECTED',
        payload: error
      })
    })
  }
}


/////////////////////////////////////////
export function getAllSurveysFromRails(){
  
  return function(dispatch){
    const url = 'http://localhost:5000/api/surveys'
    axios.get(url, {withCredentials:true})
  .then((response)=>{
    response.data.forEach((survey)=>{
      var a = new Appointment(
        survey.appointment_date, 
        survey.appointment_time,
        survey.moveware_code, 
        survey.collection_address, 
        survey.collection_postcode, 
        survey.client_name, 
        survey.duration, 
        survey.branch_code, 
        survey.moveware_employee_code, 
        survey.collection_latLng, 
        survey.milliseconds_since_1970,
        survey.id
        )
    })
    dispatch({
      type: 'GET_SURVEYS_FULFILLED',
      payload: response.data
    })
  })
  .catch((error)=>{
    dispatch({
      type: 'GET_SURVEYS_REJECTED',
      payload: error
    })
  })
  }
}

export function getAllEmployeesFromRails(){
  return function(dispatch){
    const url = 'http://localhost:5000/api/employees'
    axios.get(url, {withCredentials:true})
    .then((response)=>{
      dispatch({
        type: 'GET_EMPLOYEES_FULFILLED',
        payload: response.data
      })
    })
    .catch((error)=>{
      dispatch({
        type: 'GET_EMPLOYEES_REJECTED',
        payload: error
      })
    }) 
  }
}

export function getAllBranchesFromRails(){
  return function(dispatch){
    const url = 'http://localhost:5000/api/branches'
    axios.get(url, {withCredentials:true})
    .then((response)=>{
      dispatch({
        type: 'GET_BRANCHES_FULFILLED',
        payload: response.data
      })
    })
    .catch((error)=>{
      dispatch({
        type: 'GET_BRANCHES_REJECTED',
        payload: error
      })
    })
  }
}





