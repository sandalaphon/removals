import axios from "axios";
import Trip from '../models/trip'

export function setTodayDateSelector(milliSeconds) {
  return {
    type: "SET_TODAY_DATE_SELECTOR",
    payload: milliSeconds
  };
}

export function toggleDateOpen(){
  return {
    type: 'TOGGLE DATE OPEN'
  }
}

export function togglePostcodeLoading(){
  return {
    type: 'TOGGLE POSTCODE LOADING'
  }
}


export function setTodayDateRange(date_range_object_milli) {
  return {
    type: "SET_TODAY_DATE_RANGE",
    payload: date_range_object_milli
  };
}

export function setTodayBranchSelected(branch_code) {
  return {
    type: "SET_TODAY_BRANCH_SELECTED",
    payload: branch_code
  };
}

export function setTodayPostCode(post_code) {
  return {
    type: "SET_TODAY_POSTCODE",
    payload: post_code
  };
}

export function setTodayTrips() {
  return {
    type: "SET_TODAY_TRIPS"
  };
}

export function getClosestTripsToPostCodeInGivenDateRange(date_range_object_milli, lat_lng, branch) {
  console.log('i am here', date_range_object_milli, branch, lat_lng)
  return function(dispatch){
    const url = "http://localhost:5000/api/trips/today_closest.json"
    const data = {date_range_object_milli, lat_lng, branch}
    axios
    .post(url, data, { withCredentials: true})
    .then(response => {
      console.log('response', response)
      response.data.forEach(trip => {
       new Trip(trip);
      });
      dispatch({
        type: "CLOSEST_TRIPS_FULFILLED",
        payload: response.data
      })
    })
    .catch(error => {
      console.log('error', error)
      dispatch({
        type: "CLOSEST_TRIPS_REJECTED",
        payload: error
      })
    })
  }
  
}
