import axios from 'axios'

///////////////////////
// export function renderJobList(){
//   return {
//     type: 'RENDER_JOB_LIST'
//   }
// }
//////////////////////////////////////
// export function setBranchDisplayStatus(pathname, showing){
//   return {
//     type: 'SET_BRANCH_DISPLAYED_STATUS',
//     showing,
//     pathname
//   }
// }

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

export function setShowToBranch(){
  return {
    type: 'SET_SHOW_TO_BRANCH'
  }
}

export function setShowFromBranch(){
  return {
    type: 'SET_SHOW_FROM_BRANCH'
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

export function composeData(){
  return {
    type: 'COMPOSE_DATA_COMPLETED'
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

export function getAllSurveysFromRails(){
  
  return function(dispatch){
    const url = 'http://localhost:5000/api/surveys'
    axios.get(url, {withCredentials:true})
  .then((response)=>{
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

export function getSurveyObjectFromRails(){
  
  return function(dispatch){
    const url = 'http://localhost:5000/api/survey_object'
    axios.get(url, {withCredentials:true})
  .then((response)=>{
    dispatch({
      type: 'GET_SURVEY_OBJECT_FULFILLED',
      payload: response.data
    })
  })
  .catch((error)=>{
    dispatch({
      type: 'GET_SURVEYS_OBJECT_REJECTED',
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





