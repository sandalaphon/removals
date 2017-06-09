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


export function loginEmail(email){
  return {
    type: 'LOGIN_EMAIL_CHANGE',
    email
  }
}

export function loginPassword(password){
  return {
    type: 'LOGIN_PASSWORD_CHANGE',
    password
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