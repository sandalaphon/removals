
function handleSurveyor(state = {
  all_surveys: []
},action){


  switch(action.type) {
 
 case 'GET_SURVEYS_FULFILLED':
 var received_surveys = action.payload.slice()
 return {...state, all_surveys: received_surveys, getSurveyError: null}
 break;
 
 case 'GET_SURVEYS_REJECTED':
 return {...state,  getSurveyError: action.payload}
 break;

  }
  
  return state
}

export default handleSurveyor