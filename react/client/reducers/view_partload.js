import * as helpers from './_helpers'

function handlePartloadData(
  state = {
    partload_collection_postcode: '',
    partload_delivery_postcode: '',
    partload_marker_array: [],
    best_pick_up_jobs: [],
    partload_seconds_from_start: '',
    removal_from_store_suggestion_array: [],
    ros_requested_ids: [],
    trips_loaded_by_id: [],
  },
  action,
) {
  switch (action.type) {
    // case 'SET_PARTLOAD_SLIDER_SECONDS_FROM_START':
    // return { ...state, partload_seconds_from_start: action.payload}
    // break;
    // //
    case 'ADD_MARKER_TO_PARTLOAD_MARKER_ARRAY':
      var holder = state.partload_marker_array.slice()
      holder.push(action.payload)
      return { ...state, partload_marker_array: holder }
      break

    case 'GET_TRIP_BY_ID_FROM_RAILS_FULFILLED':
      var holder = state.trips_loaded_by_id.slice()
      holder.push(action.trip_id)
      return {
        ...state,
        trips_loaded_by_id: holder,
        trips_loaded_by_id_error: null,
      }
      break
    //

    case 'GET_TRIP_BY_ID_FROM_RAILS_REJECTED':
      return { ...state, trips_loaded_by_id_error: action.payload }
      break

    case 'CLEAR_PARTLOAD_MARKER_ARRAY':
      return { ...state, partload_marker_array: [] }
      break
    //
    case 'SET_PARTLOAD_COLLECTION_POSTCODE':
      return { ...state, partload_collection_postcode: action.payload }
      break
    ////////////////

    case 'GET_REMOVAL_FROM_STORE_SUGGESTIONS_FULFILLED':
      var holder = state.ros_requested_ids.concat([+action.trip_id])
      return {
        ...state,
        removal_from_store_suggestion_array: action.payload,
        ros_requested_ids: holder,
        removal_from_store_error: null,
      }
      break

    case 'GET_REMOVAL_FROM_STORE_SUGGESTIONS_REJECTED':
      return {
        ...state,
        removal_from_store_suggestion_array: [],
        removal_from_store_error: action.payload,
      }
      break

    //////////

    case 'SET_PARTLOAD_DELIVERY_POSTCODE':
      return { ...state, partload_delivery_postcode: action.payload }
      break
    //
    case 'BEST_PICK_UP_JOBS_FULFILLED':
      var newArray = action.payload.slice()
      var anotherNewArray = newArray.map((trip, index) => {
        var google_waypoints_directions = JSON.parse(
          trip.google_waypoints_directions,
        )
        trip.google_waypoints_directions = google_waypoints_directions
        trip.colour = helpers.getUniqueColor(index)
        return trip
      })
      return {
        ...state,
        best_pick_up_jobs: anotherNewArray,
        best_pick_up_jobs_error: null,
      }
      break
    //
    case 'BEST_PICK_UP_JOBS_REJECTED':
      return {
        ...state,
        best_pick_up_jobs: [],
        best_pick_up_jobs_error: action.payload,
      }
      break
    //
    case 'CLEAR_BEST_PICK_UP_JOBS':
      return { ...state, best_pick_up_jobs: [], best_pick_up_jobs_error: '' }
      break
  }
  return state
}

export default handlePartloadData
