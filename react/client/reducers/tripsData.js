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

        // var path = trip.google_directions.routes.overview_path

        // var collectLat = path[0].lat
        // var collectLng =path[0].lng
        // var deliveryLat = path[path.length-1].lat
        // var deliveryLng = path[path.length-1].lng

        // trip.collection_latlng = {collectLat, collectLng}
        // trip.delivery_latlng = {deliveryLat, deliveryLng}

        return trip
    })
    // var finalArray = anotherNewArray.map((trip)=>{
    //    var path = trip.google_directions.routes.overview_path

    //    var collectLat = path[0].lat
    //    var collectLng =path[0].lng
    //    var deliveryLat = path[path.length-1].lat
    //    var deliveryLng = path[path.length-1].lng

    //    trip.collection_latlng = {collectLat, collectLng}
    //    trip.delivery_latlng = {deliveryLat, deliveryLng}
    //    return trip
    // })
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
        {job.hidden_status = false}
    })
    return {...state,  all_trips: holder}
    break;
    case 'SET_UNHIDDEN_STATUS':
    var holder = state.all_trips.slice()
    holder.forEach((job)=>{
        if(job.id===action.payload.id)
        {job.hidden_status = true}
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
    case 'DELETE_ROUTE_TO_RENDER':
    return{...state, newRouteToRender: null}
    break;
    case 'SET_SEARCH_STRING':
    return{...state, searchString: action.payload}
    break;

    case 'INCLUDE_IN_VISIBLE_JOBLIST':
    var holder_visible = state.visible_jobList.slice()
    if(!holder_visible.includes(action.payload)){
        holder_visible.push(action.payload)
    }
    return{...state, visible_jobList: holder_visible}
    break;

    case 'EXCLUDE_FROM_VISIBLE_JOBLIST':
    var holder_visible = state.visible_jobList.slice()
    if(holder_visible.includes(action.payload)){
     var index = holder_visible.indexOf(action.payload)
     holder_visible.splice(index, 1)
 }
 return{...state, visible_jobList: holder_visible}
 break;

 case 'ADD_LAT_LNG_TO_RENDERED_ROUTES':
 var newRenderedRoutes = state.renderedRoutes.slice()
 newRenderedRoutes.push(action.payload)
 return{...state, renderedRoutes: newRenderedRoutes, newRouteToRender: action.payload}
 break;
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