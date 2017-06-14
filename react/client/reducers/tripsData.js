function handleData(state = {
trips: null,
isInScheduler: false,
droppedCells: [],
highlightedCells: [],
divCounter: 0
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
    break;
    case 'SET_DROPPED_CELLS':
    return{...state, droppedCells: state.droppedCells.concat(action.payload)}
    break;
    case 'SET_HIGHLIGHTED_CELLS':
    return{...state, highlightedCells: action.payload}
    break;
    case 'INCREMENT_DIV_COUNTER':
    return{...state, divCounter: state.divCounter+1}
    break;
    case 'DECREMENT_DIV_COUNTER':
    return{...state, divCounter: state.divCounter-1}
    break;
    case 'DELETE_DROPPED_CELLS':
        var newArray = state.droppedCells.slice()
    state.droppedCells.forEach((object, index)=>{
        if(object.colour===action.payload) {
            newArray.splice(index,1)
        }
    })
    return{...state, droppedCells: newArray}


  }
  return state
}

export default handleData