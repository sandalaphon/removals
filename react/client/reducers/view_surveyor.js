
function handleSurveyor(state = {
  // all_surveys: [],
  survey_current_date_milliseconds: null,
  surveyor_branch_selected: 'AVI'
},action){


  switch(action.type) {
 
 // case 'GET_SURVEYS_FULFILLED':
 // var received_surveys = action.payload.slice()
 // received_surveys.forEach((survey_json)=>{
 //  var latLng = JSON.parse(survey_json.collection_latLng)
 //  survey_json.collection_latLng = latLng
 // })
 // return {...state, all_surveys: received_surveys, getSurveyError: null}
 // break;
 
 // case 'GET_SURVEYS_REJECTED':
 // return {...state,  getSurveyError: action.payload}
 // break;

 case 'SET_SURVEY_CURRENT_DATE':
 return {...state,  survey_current_date_milliseconds: action.payload}
 break;

 case 'SET_SURVEYOR_BRANCH_SELECTED':
 return {...state, surveyor_branch_selected: action.payload}
 break;

  }
  
  return state
}

// constructSurveysObject(all_surveys){
//   var surveyObj = {}
//   all_surveys.forEach((survey, index)=>{
//     if(surveyObj[survey.branch_code]){
//       surveyObj[survey.branch_code]=Object.assign(surveyObj[survey.branch_code], surveyObj[survey.branch_code])
//     }else{

//     }
//   })
// }

export default handleSurveyor