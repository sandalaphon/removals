
import * as helpers from './_helpers'

function handleTripData(state = {
  trips: null,
  renderedRoutes: [],
  
  best_pick_up_jobs: [],
  filter_search_string: '',
  current_today_truckflicker_job: '',
  current_partload_truckflicker_job: '',
  current_planner_truckflicker_job: ''
 
// all_trips:[]
},action){


  switch(action.type) {

    case 'SEND_TRIP_FULFILLED':
    return {...state,  sendTripError: null}
    break;
    //
    case 'SEND_TRIP_REJECTED':
    return {...state, sendTripError: action.payload}
    break;
    //
    case 'GET_TRIPS_FULFILLED':
    var newArray = action.payload.slice()
    var anotherNewArray = newArray.map((trip, index)=>{
        var google_directions= JSON.parse(trip.google_directions)
        trip.google_directions = google_directions
        trip.colour=helpers.getUniqueColor(index)
        return trip
    })
    return {...state, all_trips: anotherNewArray, getTripsError: null}
    break;
    //
    case 'GET_TRIPS_REJECTED':
    return {...state,  getTripsError: action.payload}
    break;
    //
    case 'SET_TODAY_SLIDER_SECONDS_FROM_START':
    return { ...state, today_seconds_from_start: action.payload}
    break;
    //
    
    
    //
    case 'SET_FILTER_SEARCH_STRING':
    return { ...state, filter_search_string: action.payload}
    break;
    //
    case 'BEST_PICK_UP_JOBS_FULFILLED' :
      var newArray = action.payload.slice()
      var anotherNewArray = newArray.map((trip, index)=>{
        var google_directions= JSON.parse(trip.google_directions)
        trip.google_directions = google_directions
        trip.colour=helpers.getUniqueColor(index)
        return trip
      })
    return {...state, best_pick_up_jobs: anotherNewArray, best_pick_up_jobs_error: null}
    break;
    //
    case 'BEST_PICK_UP_JOBS_REJECTED' :
    return {...state, best_pick_up_jobs: [], best_pick_up_jobs_error: action.payload}
    break;
    //
    case 'CLEAR_BEST_PICK_UP_JOBS' :
    return {...state, best_pick_up_jobs: [], best_pick_up_jobs_error: ''}
    break;
    //
    case 'SET_HIDDEN_STATUS':
    var holder = state.all_trips.slice()
    holder.forEach((job)=>{
        if(job.id===action.payload.id)
            {job.hidden = false}
    })
    return {...state,  all_trips: holder}
    break;
    //
    case 'SET_UNHIDDEN_STATUS':
    var holder = state.all_trips.slice()
    holder.forEach((job)=>{
        if(job.id===action.payload.id)
            {job.hidden = true}
    })
    return {...state,  all_trips: holder}
    break;
    //
    
    
    //
    case 'SET_CURRENT_TRUCKFLICKER_JOB':
    switch (action.pathname){
        case 'today':
        return{...state, current_today_truckflicker_job: action.payload}
        break;
        case 'planner':
        return{...state, current_planner_truckflicker_job: action.payload}
        break;
        case 'partload':
        return{...state, current_partload_truckflicker_job: action.payload}
        break;
    }
    break;
    //
    case 'CLEAR_CURRENT_TRUCKFLICKER_JOB':
      switch (action.pathname){
        case 'today':
        return{...state, current_today_truckflicker_job: ''}
        break;
        case 'planner':
        return{...state, current_planner_truckflicker_job: ''}
        break;
        case 'partload':
        return{...state, current_partload_truckflicker_job: ''}
        break;
    }
    break;
    
    //
    
    //
    case 'SORT_BY_COLUMN':
    var sorted = helpers.sortJoblist(state.all_trips, action.attribute, action.order)
    return{...state, all_trips: sorted}
    break;
  }
  return state
}

export default handleTripData