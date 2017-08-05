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

