import axios from 'axios'

// export function getAllSurveysFromRails(){
  
//   return function(dispatch){
//     console.log('get all surveys action')
//     const url = 'http://localhost:5000/api/surveys'
//     axios.get(url, {withCredentials:true})
//     .then((response)=>{
//       dispatch({
//         type: 'GET_SURVEYS_FULFILLED',
//         payload: response.data
//       })
//     })
//     .catch((error)=>{
//       dispatch({
//         type: 'GET_SURVEYS_REJECTED',
//         payload: error
//       })
//     })
//   }
// }

export function setSurveyorBranchSelected(branch_code){
  return {
    type: 'SET_SURVEYOR_BRANCH_SELECTED',
    payload: branch_code
  }
}

export function setSurveyCurrentDate(dateMilliseconds){
 return {
  type: 'SET_SURVEY_CURRENT_DATE',
  payload: dateMilliseconds
 }
}