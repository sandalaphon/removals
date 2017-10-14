
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

export function updateCost(cost_obj){
  return function(dispatch){
    const url = 'http://localhost:5000/api/costs/update'
    axios.put(url, cost_obj, {withCredentials:true})
    .then((response)=>{
      console.log('fulfilled', response.data)
      dispatch({
        type: 'UPDATE_COST_FULFILLED',
        payload: response.data
      })
    })
    .catch((error)=>{
      dispatch({
        type: 'UPDATE_COST_REJECTED',
        payload: error
      })
    })
  }  
}


export function getCostsFromRails(){
  return function(dispatch){
    const url = 'http://localhost:5000/api/costs/index'
    axios.get(url, {withCredentials:true})
    .then((response)=>{
      console.log('fulfilled', response.data)
      dispatch({
        type: 'GET_COSTS_FULFILLED',
        payload: response.data
      })
    })
    .catch((error)=>{
      dispatch({
        type: 'GET_COSTS_REJECTED',
        payload: error
      })
    })
  }  
}


export function setFuelPerMile18t(cost){
 return {
    type: 'SET FUEL PER MILE 18T',
    payload: cost
  }
}

export function setFuelPerMile9t(cost){
 return {
    type: 'SET FUEL PER MILE 9T',
    payload: cost
  }
}

export function setFuelPerMileLuton(cost){
 return {
    type: 'SET FUEL PER MILE LUTON',
    payload: cost
  }
}

export function setDriverPerHour18t(cost){
 return {
    type: 'SET DRIVER PER HOUR 18T',
    payload: cost
  }
}

export function setDriverPerHour9t(cost){
 return {
    type: 'SET DRIVER PER HOUR 9T',
    payload: cost
  }
}

export function setDriverPerHourLuton(cost){
 return {
    type: 'SET DRIVER PER HOUR LUTON',
    payload: cost
  }
}

export function setPorterPerHour(cost){
 return {
    type: 'SET PORTER PER HOUR',
    payload: cost
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