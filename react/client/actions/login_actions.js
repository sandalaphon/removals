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
///////////////////////////////////////////////////
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
////////////////////////////////////////////////
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
////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////

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

