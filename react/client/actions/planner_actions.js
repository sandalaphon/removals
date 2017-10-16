import axios from "axios";

// export function setPlannerSliderSecondsFromStart(secondsPassed){
//   return {
//     type: 'SET_PLANNER_SLIDER_SECONDS_FROM_START',
//     payload: secondsPassed
//   }
// }

export function setSearchQuery(searchString) {
  return {
    type: "SET_SEARCH_STRING",
    payload: searchString
  };
}

export function setCurrentDragJob(jobObject) {
  return {
    type: "SET_CURRENT_DRAG_JOB",
    payload: jobObject
  };
}

export function setDroppedCells(colourAndCellsObject) {
  return {
    type: "SET_DROPPED_CELLS",
    payload: colourAndCellsObject
  };
}

export function deleteDroppedCells(colour) {
  return {
    type: "DELETE_DROPPED_CELLS",
    payload: colour
  };
}

export function setHighlightedCells(cellIds) {
  return {
    type: "SET_HIGHLIGHTED_CELLS",
    payload: cellIds
  };
}

export function sortByColumn(attribute, order) {
  return {
    type: "SORT_BY_COLUMN",
    attribute,
    order
  };
}
