import axios from "axios";

export function setTodayDateSelector(milliSeconds) {
  return {
    type: "SET_TODAY_DATE_SELECTOR",
    payload: milliSeconds
  };
}

export function setTodayDateRange(date_range_object_milli) {
  return {
    type: "SET_TODAY_DATE_RANGE",
    payload: date_range_object_milli
  };
}

export function setTodayBranchSelected(branch_code) {
  return {
    type: "SET_TODAY_BRANCH_SELECTED",
    payload: branch_code
  };
}

export function setTodayTrips() {
  return {
    type: "SET_TODAY_TRIPS"
  };
}
