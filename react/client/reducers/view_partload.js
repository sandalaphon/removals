import * as helpers from './_helpers'

function handlePartloadData(state = {

  partload_collection_postcode: '',
  partload_delivery_postcode: '',
  partload_marker_array: [],
  best_pick_up_jobs: [],
  partload_seconds_from_start: ''

},action){

  switch(action.type) {
    //
    case 'SET_PARTLOAD_SLIDER_SECONDS_FROM_START':
    return { ...state, partload_seconds_from_start: action.payload}
    break;
    //
    case 'ADD_MARKER_TO_PARTLOAD_MARKER_ARRAY':
      var holder = state.partload_marker_array.slice()
      holder.push(action.payload)
    return{...state, partload_marker_array: holder}
    break;
    //
    case 'CLEAR_PARTLOAD_MARKER_ARRAY':
    return {...state,  partload_marker_array: []}
    break;
    //
    case 'SET_PARTLOAD_COLLECTION_POSTCODE':
    return{...state, partload_collection_postcode: action.payload}
    break;
    //
    case 'SET_PARTLOAD_DELIVERY_POSTCODE':
    return{...state, partload_delivery_postcode: action.payload}
    break;
    //
    case 'BEST_PICK_UP_JOBS_FULFILLED' :
      var newArray = action.payload.slice()
      var anotherNewArray = newArray.map((trip, index)=>{
        var google_directions= JSON.parse(trip.google_directions)
        trip.google_directions = google_directions
        var google_directions_to_branch= JSON.parse(trip.google_directions_to_branch)
        trip.google_directions_to_branch = google_directions_to_branch
        var google_directions_from_branch= JSON.parse(trip.google_directions_from_branch)
        trip.google_directions_from_branch = google_directions_from_branch
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

  }
  return state
}

export default handlePartloadData