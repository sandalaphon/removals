function handleData(state = {
trips: null,
isInScheduler: false
},action){


  switch(action.type) {
    case 'SEND_TRIP_FULFILLED':
    return {...state, trips: action.payload, sendTripError: null}
    break;
    case 'SEND_TRIP_REJECTED':
    return {...state, sendTripError: action.payload}
    break;
    //getAllTripsFromRails
    case 'GET_TRIPS_FULFILLED':
    return {...state, all_trips: action.payload, getTripsError: null}
    break;
    case 'GET_TRIPS_REJECTED':
    return {...state,  getTripsError: action.payload}
    break;
    case 'IS_IN_SCHEDULER':
    return{...state, isInScheduler: action.payload}
    break;
    case 'SET_CURRENT_DRAG_JOB':
    return{...state, currentDragJob: action.payload}


  }
  return state
}

export default handleData