import axios from 'axios'

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