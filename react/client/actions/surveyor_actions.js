import axios from "axios";

export function toggleSurveyorHidden(surveyor_code) {
  return {
    type: "TOGGLE_SURVEYOR_HIDDEN",
    payload: surveyor_code
  };
}

export function toggleSurveyorOverview() {
  return {
    type: "TOGGLE_SURVEYOR_OVERVIEW"
  };
}

export function setVisibleSurveyors(surveyor_codes) {
  return {
    type: "SET_VISIBLE_SURVEYORS",
    payload: surveyor_codes
  };
}

export function setSurveyorBranchSelected(branch_code) {
  return {
    type: "SET_SURVEYOR_BRANCH_SELECTED",
    payload: branch_code
  };
}

export function setSurveyCurrentDate(dateMilliseconds) {
  return {
    type: "SET_SURVEY_CURRENT_DATE",
    payload: dateMilliseconds
  };
}
