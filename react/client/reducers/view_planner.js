
function handlePlannerData(state = {

  droppedCells: [],
  highlightedCells: [],
  planner_seconds_from_start: '',
  currentDragJob: null



},action){

  switch(action.type) {
    //
    case 'SET_PLANNER_SLIDER_SECONDS_FROM_START':
    return { ...state, planner_seconds_from_start: action.payload}
    break;

    case 'SET_CURRENT_DRAG_JOB':
    return{...state, currentDragJob: action.payload}
    break;
    //
    case 'SET_DROPPED_CELLS':
    return{...state, droppedCells: state.droppedCells.concat(action.payload)}
    break;
    //
    case 'SET_HIGHLIGHTED_CELLS':
    return{...state, highlightedCells: action.payload}
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

  }
  return state
}

export default handlePlannerData