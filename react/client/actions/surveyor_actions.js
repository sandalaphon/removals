import axios from 'axios'

export function getAllSurveysFromRails(){
  
  return function(dispatch){
    console.log('get all surveys action')
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