function handleUpdateData(
  state = {
    trips: null,
    survey_object_error: null,
    survey_object: null,
  },
  action,
) {
  switch (action.type) {
    case 'SEND_TRIP_FULFILLED':
      return { ...state, sendTripError: null }
      break

    case 'SEND_TRIP_REJECTED':
      return { ...state, sendTripError: action.payload }
      break

    case 'SEND_SURVEY_FULFILLED':
      return { ...state, sendSurveyError: null }
      break

    case 'SEND_SURVEY_REJECTED':
      return { ...state, sendTripError: action.payload }
      break

    case 'SEND_SURVEY_OBJECT_FULFILLED':
      return { ...state, survey_object_error: null }
      break

    case 'SEND_SURVEY_OBJECT_REJECTED':
      return { ...state, survey_object_error: action.payload }
      break
  }
  return state
}

export default handleUpdateData
