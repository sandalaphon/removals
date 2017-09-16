import axios from 'axios'

export function sendSingleTripToRails(trip){

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

export function sendSingleSurveyToRails(survey){

  return function(dispatch){
    const data = {survey}
    const url = 'http://localhost:5000/api/surveys/new.json'
     axios.post(url, data, {withCredentials: true})
     .then((response)=>{
     
      dispatch({
        type: 'SEND_SURVEY_FULFILLED',
        payload: response.data
      })
     })
     .catch((error)=>{
      dispatch({
        type: 'SEND_SURVEY_REJECTED',
        payload: error
      })
     })

  }
}
