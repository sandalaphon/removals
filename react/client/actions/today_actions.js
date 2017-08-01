import axios from 'axios'

export function setTodaySliderSecondsFromStart(secondsPassed){
  return {
    type: 'SET_TODAY_SLIDER_SECONDS_FROM_START',
    payload: secondsPassed
  }
}