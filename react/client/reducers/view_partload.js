function handlePartloadData(state = {

  partload_collection_postcode: '',
  partload_delivery_postcode: '',
  partload_marker_array: [],
  best_pick_up_jobs: [],
  current_today_truckflicker_job: '',
  current_partload_truckflicker_job: '',
  current_planner_truckflicker_job: '',
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
  }
  return state
}

export default handlePartloadData