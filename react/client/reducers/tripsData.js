function handleData(state = {
    trips: null,
    droppedCells: [],
    highlightedCells: [],
    renderedRoutes: [],
    visible_jobList: []
// all_trips:[],
// all_trips_reference: []
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
    var newArray = action.payload.slice()
    var anotherNewArray = newArray.map((trip)=>{
        var google_directions= JSON.parse(trip.google_directions)
        trip.google_directions = google_directions

        return trip
    })

    return {...state, all_trips: anotherNewArray, all_trips_reference: anotherNewArray, getTripsError: null}
    break;
    case 'GET_TRIPS_REJECTED':
    return {...state,  getTripsError: action.payload}
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
    case 'SET_UNHIDDEN_STATUS':
    var holder = state.all_trips.slice()
    holder.forEach((job)=>{
        if(job.id===action.payload.id)
        {job.hidden = true}
    })
    return {...state,  all_trips: holder}
    break;
    //
    case 'SET_CURRENT_DRAG_JOB':
    return{...state, currentDragJob: action.payload}
    break;
    case 'SET_DROPPED_CELLS':
    return{...state, droppedCells: state.droppedCells.concat(action.payload)}
    break;
    case 'SET_HIGHLIGHTED_CELLS':
    return{...state, highlightedCells: action.payload}
    break;

    // case 'SET_SEARCH_STRING':
    // return{...state, searchString: action.payload}
    // break;

 case 'DELETE_DROPPED_CELLS':
 var newArray = state.droppedCells.slice()
 state.droppedCells.forEach((object, index)=>{
    if(object.colour===action.payload) {
        newArray.splice(index,1)
    }
})
 return{...state, droppedCells: newArray}
 break;
 case 'SORT_BY_CLIENT_NAME':
 var sorted
 if(action.payload === 'asc'){
    sorted = state.all_trips.sort(
        (a,b)=>{
            if (a.client_name < b.client_name) return -1
                if (b.client_name < a.client_name) return 1
                    return 0
            })
}else{
    sorted = state.all_trips.sort(
        (a,b)=>{
            if (a.client_name < b.client_name) return 1
                if (b.client_name < a.client_name) return -1
                    return 0
            })
}
return{...state, all_trips: sorted}

}
return state
}

export default handleData