function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

function getUniqueColor(index){
    var colours = [ '#0075DC', '#993F00', '#4C005C', '#191919', '#005C31' ,'#2BCE48' ,'#FFCC99' ,'#808080' ,'#94FFB5', '#8F7C00', '#9DCC00' ,'#C20088', '#003380' , '#FFA405', '#FFA8BB', '#426600' , '#FF0010' ,'#5EF1F2' ,'#00998F'  ,'#E0FF66' , '#740AFF' ,'#990000', '#FFFF80', '#FFFF00', '#FF5005', '#F0A3FF']
    if(index<24){
        return colours[index]
    }else{
       var newColour =getRandomColor()
       if(!colours.includes(newColour)){
        colours.push(newColour)
        return newColour
    }
}
}

function sortJoblist(list, attribute, order){
    var sorted
    if(order === 'asc'){
        sorted = list.sort(
            (a,b)=>{
                if (a[attribute] < b[attribute]) return -1
                    if (b[attribute] < a[attribute]) return 1
                        return 0
                })
    }else{
        sorted = list.sort(
            (a,b)=>{
                if (a[attribute] < b[attribute]) return 1
                    if (b[attribute] < a[attribute]) return -1
                        return 0
                })
    }
    return sorted
}


function handleData(state = {
    trips: null,
    droppedCells: [],
    highlightedCells: [],
    renderedRoutes: [],
    partload_collection_postcode: '',
    partload_delivery_postcode: '',
    partload_marker_array: [],
    best_pick_up_jobs: [],
    filter_search_string: ''
// all_trips:[]
},action){


  switch(action.type) {
    case 'SEND_TRIP_FULFILLED':
    return {...state,  sendTripError: null}
    break;
    case 'SEND_TRIP_REJECTED':
    return {...state, sendTripError: action.payload}
    break;
    //getAllTripsFromRails
    case 'GET_TRIPS_FULFILLED':

    var newArray = action.payload.slice()
    var anotherNewArray = newArray.map((trip, index)=>{
        var google_directions= JSON.parse(trip.google_directions)
        trip.google_directions = google_directions
        trip.colour=getUniqueColor(index)
        return trip
    })

    return {...state, all_trips: anotherNewArray, getTripsError: null}
    break;
    case 'GET_TRIPS_REJECTED':
    return {...state,  getTripsError: action.payload}
    break;
    //
    case 'CLEAR_PARTLOAD_MARKER_ARRAY':
    return {...state,  partload_marker_array: []}
    break;
    //

    case 'SET_TODAY_SLIDER_SECONDS_FROM_START':
    return { ...state, today_seconds_from_start: action.payload}
    break;

     case 'SET_FILTER_SEARCH_STRING':
    return { ...state, filter_search_string: action.payload}
    break;

    case 'BEST_PICK_UP_JOBS_FULFILLED' :
    console.log('action.payload', action.payload)
    var newArray = action.payload.slice()
    var anotherNewArray = newArray.map((trip, index)=>{
        var google_directions= JSON.parse(trip.google_directions)
        trip.google_directions = google_directions
        trip.colour=getUniqueColor(index)
        return trip
    })
    //
    return {...state, best_pick_up_jobs: anotherNewArray, best_pick_up_jobs_error: null}
    break;

    case 'BEST_PICK_UP_JOBS_REJECTED' :
    return {...state, best_pick_up_jobs: [], best_pick_up_jobs_error: action.payload}
    break;



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

    case 'SET_PARTLOAD_COLLECTION_POSTCODE':
    return{...state, partload_collection_postcode: action.payload}
    break;

    case 'SET_PARTLOAD_DELIVERY_POSTCODE':
    return{...state, partload_delivery_postcode: action.payload}
    break;

       case 'SET_CURRENT_TRUCKFLICKER_JOB':
    return{...state, current_truckflicker_job: action.payload}
    break;

    

    case 'ADD_MARKER_TO_PARTLOAD_MARKER_ARRAY':
    var holder = state.partload_marker_array.slice()
    holder.push(action.payload)
    return{...state, partload_marker_array: holder}
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

    case 'SORT_BY_COLUMN':
    var sorted = sortJoblist(state.all_trips, action.attribute, action.order)
    
    return{...state, all_trips: sorted}

}
return state
}

export default handleData