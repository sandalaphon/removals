import store from '../store'
import { mapObjectInstances } from './mapObject'
import Appointment from './appointments'

export function placeSurveyorCars(sliderSecondsFromStart, dateMilli) {
  var selected_branch = store.getState().surveyor.surveyor_branch_selected
  var arrivalTime
  var surveyFinishTime
  var nextAppointmentTime
  var departureTimeMilli
  var surveyNext
  var sliderMarkerObjects = []
  var tenMinsContingencyInMilli = 10 * 60 * 1000
  var timeSpentAtEachSurvey30minsMilli = 30 * 60 * 1000

  var legs

  var surveyors = Appointment.getAllSurveyorsByBranch(selected_branch)
  var surveyors_hidden = store.getState().surveyor.surveyors_hidden

  surveyors.forEach(surveyor_code => {
    if (surveyors_hidden[surveyor_code]) return
    console.log('s_code', surveyor_code)
    console.log('dateMilli', dateMilli)
    console.log('mapObject', mapObjectInstances['surveyor'])
    var driveWaitObject = {}
    var surveyor_colour = 'blue'
    var routeDisplayObj =
      mapObjectInstances['surveyor'].surveyRoutesByCode[
        dateMilli + surveyor_code
      ]
    if (!routeDisplayObj) return

    legs = routeDisplayObj.directions.routes[0].legs
    var travelTimes = setTravelTimeOfEachLegArray(legs)
    var surveyors_surveys = Appointment.getSurveysByBranchDayAndSurveyor(
      dateMilli,
      selected_branch,
      surveyor_code,
    )

    legs.forEach((leg, i) => {
      surveyNext = surveyors_surveys[i]

      if (i == 0) {
        nextAppointmentTime = surveyNext.milliseconds_since_1970
        departureTimeMilli =
          nextAppointmentTime - travelTimes[i] - tenMinsContingencyInMilli
        driveWaitObject[departureTimeMilli] = 'drive'
      }
      if (surveyNext) {
        arrivalTime = departureTimeMilli + travelTimes[i]
        driveWaitObject[arrivalTime] = 'wait'
        nextAppointmentTime = surveyNext.milliseconds_since_1970
        driveWaitObject[nextAppointmentTime] = 'survey'
        surveyFinishTime =
          surveyNext.milliseconds_since_1970 + timeSpentAtEachSurvey30minsMilli
        driveWaitObject[surveyFinishTime] = 'drive'
        departureTimeMilli = surveyFinishTime
      }
    })
    var sliderMarkerObj = getSliderMarkerObject(
      sliderSecondsFromStart,
      dateMilli,
      driveWaitObject,
      legs,
      surveyor_code,
    )
    sliderMarkerObjects.push(sliderMarkerObj)
  })

  mapObjectInstances['surveyor'].handleSliderMarkerArray(
    sliderMarkerObjects,
    false,
  )
}

function getSliderMarkerObject(
  sliderSecondsFromStart,
  dateMilli,
  driveWaitObject,
  legs,
  surveyor_code,
) {
  var date = new Date(dateMilli)
  date.setHours(8, 0, 0, 0)

  var milliAt8am = +date
  var timeMilli = sliderSecondsFromStart * 1000 + milliAt8am
  var milliKey
  var indexX
  var secondsFromStartOfStep

  console.log('driveWaitObject', driveWaitObject)

  Object.keys(driveWaitObject).forEach((milli, index) => {
    // var milliseconds
    if (+milli < timeMilli) {
      secondsFromStartOfStep = (timeMilli - +milli) / 1000

      milliKey = milli
      indexX = index

      var endOfLeg = +milli + legs[Math.floor(indexX / 3)].duration.value * 1000
      if (endOfLeg < timeMilli && Math.floor(indexX / 3) == legs.length - 1)
        indexOfLeg = NaN
    }
  })

  var surveyor_colour = 'blue'
  var indexOfLeg = Math.floor(indexX / 3)
  var iconCode = driveWaitObject[milliKey]
  if (isNaN(indexOfLeg)) return

  var sliderMarkerObject = getSurveyorSliderMarkerObject(
    legs[indexOfLeg].steps,
    secondsFromStartOfStep,
    iconCode,
    surveyor_colour,
    surveyor_code,
  )

  return sliderMarkerObject
}

function setTravelTimeOfEachLegArray(legs) {
  var travelTimeMilliOfEachLeg = legs.map(leg => {
    return leg.duration.value * 1000
  })
  return travelTimeMilliOfEachLeg
}

function getSurveyorSliderMarkerObject(
  steps,
  secondsFromStart,
  iconCode,
  surveyor_colour,
  surveyor_code,
) {
  var secondsToStep = 0
  var sliderMarkerObject = {}
  var stepCompleted = false

  if (iconCode != 'drive') {
    var markerCoords = {
      lat: steps[steps.length - 1].end_point.lat(),
      lng: steps[steps.length - 1].end_point.lng(),
    }
    return {
      markerCoords,
      colour: surveyor_colour,
      message: surveyor_code,
      leg: iconCode,
    }
  }
  steps.forEach(step => {
    if (stepCompleted) return
    var currentStepDuration = step.duration.value
    secondsToStep += currentStepDuration
    if (secondsToStep > secondsFromStart) {
      var fractionOfStep =
        (secondsFromStart - (secondsToStep - currentStepDuration)) /
        currentStepDuration
      var indexOfStepPath = Math.floor(fractionOfStep * step.path.length)

      var markerCoords = {
        lat: step.path[indexOfStepPath].lat(),
        lng: step.path[indexOfStepPath].lng(),
      }

      sliderMarkerObject = {
        markerCoords,
        colour: surveyor_colour,
        message: surveyor_code,
        leg: iconCode,
      }
      stepCompleted = true
    }
  })

  return sliderMarkerObject
}
