
import * as helpers from './_helpers'

function handleTripData(state = {
  trips: null,
  // renderedRoutes: [],
  current_today_truckflicker_job: '',
  current_partload_truckflicker_job: '',
  current_planner_truckflicker_job: '',
  branch_status_partload: 0,
  branch_status_today: 0,
  branch_status_planner:0 ,
  all_trips: []
},action){


  switch(action.type) {

    case 'SET_BRANCH_DISPLAYED_STATUS':
        switch(action.pathname){
            case 'partload':
            return { ...state, branch_status_partload: action.showing}
            break;
            case 'today':
            return { ...state, branch_status_today: action.showing}
            break;
            case 'planner':
            return { ...state, branch_status_planner: action.showing}
            break;
        }
    
    break;

    case 'SET_FILTER_SEARCH_STRING':
    return { ...state, filter_search_string: action.payload}
    break;
    //
    case 'SET_PLANNER_SLIDER_SECONDS_FROM_START':
    return { ...state, planner_seconds_from_start: action.payload}
    break;

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
    case 'GET_BRANCHES_FULFILLED':
    var newBranchesArray = action.payload.slice()
    var anotherNewArray = newBranchesArray.map((branch, index)=>{
        branch.colour=helpers.getUniqueColor(index)
        return branch
    })
    return {...state, all_branches: anotherNewArray, getBranchesError: null}
    break;
    //
    case 'GET_BRANCHES_REJECTED':
    return {...state,  getBranchesError: action.payload}
    break;
    
    //
    case 'SET_HIDDEN_STATUS':
    var holder = state.all_trips.slice()
    console.log('id', action.payload.id)
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
    
  }
  return state
}

export default handleTripData