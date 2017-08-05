import axios from 'axios'

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