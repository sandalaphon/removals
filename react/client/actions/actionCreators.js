import axios from 'axios'

export function fetchUser(){
  return function(dispatch){
  const  url = 'http://localhost:5000/users.json'

  axios.get(url, {withCredentials: true})
  .then((response)=>{
      dispatch({
        type: 'FETCH_USER_FULFILLED',
        payload: response.data
      })
  })
  .catch((error)=>{
    dispatch({
      type: 'FETCH_USER_REJECTED',
      payload: error
    })
  })
}
}



export function setTodaySliderSecondsFromStart(secondsPassed){
  return {
    type: 'SET_TODAY_SLIDER_SECONDS_FROM_START',
    payload: secondsPassed
  }
}

export function setPlannerSliderSecondsFromStart(secondsPassed){
  return {
    type: 'SET_PLANNER_SLIDER_SECONDS_FROM_START',
    payload: secondsPassed
  }
}

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

export function setFilterSearchString(searchString){
  return {
    type: 'SET_FILTER_SEARCH_STRING',
    payload: searchString
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

export function loginEmail(email){
  return {
    type: 'LOGIN_EMAIL_CHANGE',
    email
  }
}
//
export function clearPartloadMarkerArray(){
  return {
    type: 'CLEAR_PARTLOAD_MARKER_ARRAY'
  }
}

export function addMarkerToPartloadMarkerArray(coords){
  return {
    type: 'ADD_MARKER_TO_PARTLOAD_MARKER_ARRAY',
    payload: coords
  }
}

export function setSearchQuery(searchString){
  return {
    type: 'SET_SEARCH_STRING',
    payload: searchString
  }
}

export function loginPassword(password){
  return {
    type: 'LOGIN_PASSWORD_CHANGE',
    password
  }
}

export function sortByColumn(attribute, order){
  return {
    type: 'SORT_BY_COLUMN',
    attribute,
    order
  }
}

export function signUploginEmail(signup_email){
  return {
    type: 'SIGNUP_EMAIL_CHANGE',
    signup_email
  }
}

export function signUploginPassword(password){
  return {
    type: 'SIGNUP_PASSWORD_CHANGE',
    password
  }
}

export function signUpPasswordConfirm(password){
  return {
    type: 'SIGNUP_PASSWORD_CONFIRM_CHANGE',
    password
  }
}

export function setCurrentDragJob(jobObject){
  return {
    type: 'SET_CURRENT_DRAG_JOB',
    payload: jobObject
  }
}

export function setDroppedCells(colourAndCellsObject){
  return {
    type: 'SET_DROPPED_CELLS',
    payload: colourAndCellsObject
  }
}

export function deleteDroppedCells(colour){
  return {
    type: 'DELETE_DROPPED_CELLS',
    payload: colour
  }
}


export function setHighlightedCells(cellIds){
  return {
    type: 'SET_HIGHLIGHTED_CELLS',
    payload: cellIds
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


export function signUpClick(signup_email, signup_password, signup_password_confirm, callback){
  return function(dispatch){
    const data = {
      user: {
        email: signup_email,
        password: signup_password,
        password_confirmation: signup_password_confirm
      }
    }

    const url = 'http://localhost:5000/users.json'
    
    axios.post(url, data)
    .then((response)=>{
      console.log('hello', callback)
     callback() 
      dispatch({
        type: 'SIGN_UP_FULFILLED',
        currentUser: response.data
      })

    })
    .catch((error)=>{
      dispatch({
        type: 'SIGN_UP_REJECTED',
        payload: error
      })
    })
   
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


  export function signInClick(user_email, user_password){
    return function(dispatch){
      const data = {
        user: {
          email: user_email,
          password: user_password
        }
      }

      const url = 'http://localhost:5000/users/sign_in.json'

      axios.post(url, data, {withCredentials: true})
      .then((response)=>{
        dispatch({
          type: 'SIGN_IN_FULFILLED',
          currentUser: response.data
        })
      })
      .catch((error)=>{
        dispatch({
          type: 'SIGN_IN_REJECTED',
          payload: error
        })
      })
    }
  }

  export function signOut(){
    return function(dispatch){
      const url = 'http://localhost:5000/users/sign_out.json'
      axios.delete(url, {withCredentials: true})
      .then((response)=>{
        dispatch({
          type: 'SIGN_OUT_FULFILLED',
          payload: response.data
        })
      })
      .catch((error)=>{
        dispatch({
          type: 'SIGN_OUT_REJECTED',
          payload: error
        })
      })
    }
  }

  export function getUsers(){
    return function(dispatch){
      const url = 'http://localhost:5000/api/users'
      axios.get(url, {withCredentials:true})
      .then((response)=>{
        dispatch({
          type: 'GET_USERS_FULFILLED',
          payload: response.data
        })
      })
      .catch((error)=>{
        dispatch({
        type: 'GET_USERS_REJECTED',
        payload: error
      })
     })
    }
  }

  export function updateAdmin(id,checked){
    
    return function(dispatch){

      const url = 'http://localhost:5000/users/' + id +'.json'
      const data = {
        user: {
          admin: checked
        }
      }
      
      axios.put(url, data, { withCredentials: true})
      .then((response)=>{
        dispatch({
          type: 'ADMIN_UPDATE_FULFILLED',
          payload: response.data
        })
      })
      .catch((error)=>{
        dispatch({
          type: 'ADMIN_UPDATE_REJECTED',
          payload: error
        })
      })
    }
  }

  export function deleteUser(id){
    return function(dispatch){
      const url = 'http://localhost:5000/users/' + id +'.json'

      axios.delete(url, { withCredentials: true})
      .then((response)=>{
        dispatch({
          type: 'DELETE_USER_FULFILLED',
          payload: response.data
        })
      })
      .catch((error)=>{
        dispatch({
          type: 'DELETE_USER_REJECTED',
          payload: error
        })
      })

    }
  }