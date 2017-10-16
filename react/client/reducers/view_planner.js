import * as helpers from './_helpers'
import store from '../store.js'

function handlePlannerData(
  state = {
    droppedCells: [],
    highlightedCells: [],
    planner_seconds_from_start: '',
    currentDragJob: null,
  },
  action,
) {
  switch (action.type) {
    /////////////////////////////////////////////////////////////
    // THIS IS NOW IN COMMON ACTIONS//////////////////////////
    //////////////////////////////////////////////////////
    // case 'SET_FILTER_SEARCH_STRING':
    // return { ...state, filter_search_string: action.payload}
    // break;
    //////////////////////////////////////////////////////////

    // case 'SET_PLANNER_SLIDER_SECONDS_FROM_START':
    // return { ...state, planner_seconds_from_start: action.payload}
    // break;

    case 'SET_CURRENT_DRAG_JOB':
      return { ...state, currentDragJob: action.payload }
      break
    //
    case 'SET_DROPPED_CELLS':
      return {
        ...state,
        droppedCells: state.droppedCells.concat(action.payload),
      }
      break
    //
    case 'SET_HIGHLIGHTED_CELLS':
      return { ...state, highlightedCells: action.payload }
      break
    //
    case 'DELETE_DROPPED_CELLS':
      var newArray = state.droppedCells.slice()
      state.droppedCells.forEach((object, index) => {
        if (object.colour === action.payload) {
          newArray.splice(index, 1)
        }
      })
      return { ...state, droppedCells: newArray }
      break
    //
    case 'SORT_BY_COLUMN':
      var new_all_trips = store.getState().common.all_trips
      var sorted = helpers.sortJoblist(
        new_all_trips,
        action.attribute,
        action.order,
      )
      return { ...state, all_trips: sorted }
      break
  }
  return state
}

export default handlePlannerData
