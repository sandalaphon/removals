function handleSurveyor(
  state = {
    survey_current_date_milliseconds: null,
    surveyor_branch_selected: 'AVI',
    survey_overview: true,
    surveyors_hidden: {},
  },
  action,
) {
  switch (action.type) {
    case 'SET_VISIBLE_SURVEYORS':
      return { ...state, visible_surveyors: action.payload }
      break

    case 'TOGGLE_SURVEYOR_OVERVIEW':
      return { ...state, survey_overview: !state.survey_overview }
      break

    case 'TOGGLE_SURVEYOR_HIDDEN':
      var obj = Object.assign({}, state.surveyors_hidden)
      if (obj[action.payload]) {
        obj[action.payload] = false
      } else {
        obj[action.payload] = true
      }
      return { ...state, surveyors_hidden: obj }
      break

    case 'SET_SURVEY_CURRENT_DATE':
      return { ...state, survey_current_date_milliseconds: action.payload }
      break

    case 'SET_SURVEYOR_BRANCH_SELECTED':
      return { ...state, surveyor_branch_selected: action.payload }
      break
  }

  return state
}

export default handleSurveyor
