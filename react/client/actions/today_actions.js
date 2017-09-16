import axios from 'axios'

export function setTodayDateSelector(milliSeconds){
  return {
    type: 'SET_TODAY_DATE_SELECTOR',
    payload: milliSeconds
  }
}