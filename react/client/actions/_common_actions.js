import axios from 'axios'

///////////////////////
// export function renderJobList(){
//   return {
//     type: 'RENDER_JOB_LIST'
//   }
// }
//////////////////////////////////////



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


  

  
