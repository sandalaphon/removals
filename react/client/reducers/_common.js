
import * as helpers from './_helpers'

function handleTripData(state = {
  current_today_truckflicker_job: '',
  current_partload_truckflicker_job: '',
  current_planner_truckflicker_job: '',
  current_sureyor_truckflicker_job: '',
  // branch_status_partload: 0,
  // branch_status_today: 0,
  // branch_status_planner:0 ,
  all_trips: [],
  all_surveys: [],
  // show_to_branch: true,
  // show_from_branch: true,
  
  full_screen_map_today: false,
  full_screen_map_surveyor: false,
  full_screen_map_partload: false,
  full_screen_map_planner: false,

  branches_on_map_partload: false,
  branches_on_map_today: false,
  branches_on_map_planner: false,
  branches_on_map_surveyor: false,

  branch_list_displayed_partload: false,
  branch_list_displayed_planner: false,
  branch_list_displayed_today: false,
  branch_list_displayed_surveyor: false,

  planner_seconds_from_start: 14400,
  surveyor_seconds_from_start: 14400,
  partload_seconds_from_start: 14400,
  today_seconds_from_start: 14400,

  today_animation_speed:    4,
  planner_animation_speed:  4,
  partload_animation_speed: 4,
  surveyor_animation_speed: 4,

  asynch_loading_total: 0,
  survey_object: {},

  animation_running: false


},action){


  switch(action.type) {

    /////////////
    // case 'GET_SURVEY_OBJECT_FULFILLED':
    // console.log('s o f', action.payload)
    // var parsed_survey_object = JSON.parse(action.payload[0].all_surveys_object)
    
    // return {...state, survey_object_from_rails: parsed_survey_object, getSurveyObjectError: null}
    // break;
    
    // case 'GET_SURVEY_OBJECT_REJECTED':
    // return {...state,  getSurveyObjectError: action.payload}
    // break;

    /////////////////////////

    case 'GET_SURVEYS_FULFILLED':
    var received_surveys = action.payload.slice()
    received_surveys.forEach((survey_json)=>{
     var latLng = JSON.parse(survey_json.collection_latLng)
     survey_json.collection_latLng = latLng
    })
    if(state.asynch_loading_total==3){
        console.log('SURVEYS')
        // console.log(compose_survey_object(state.all_branches, state.all_surveys))

       

        return {...state, all_surveys: received_surveys, getSurveyError: null, asynch_loading_total: state.asynch_loading_total + 1}
       
    }
    
    return {...state, all_surveys: received_surveys, getSurveyError: null, asynch_loading_total: state.asynch_loading_total + 1}
    break;
    
    case 'GET_SURVEYS_REJECTED':
    return {...state,  getSurveyError: action.payload}
    break;

    case 'SET_ANIMATION_SPEED':
    var increment
    switch(action.pathname){
        
            case 'partload':
            increment = state.partload_animation_speed==1 && action.increment == -1 ? 0 : action.increment
            return { ...state, partload_animation_speed: state.partload_animation_speed + increment}
            break;
            case 'today':
            increment = state.today_animation_speed==1 && action.increment == -1 ? 0 : action.increment
            return { ...state, today_animation_speed: state.today_animation_speed + increment}
            break;
            case 'planner':
            increment = state.planner_animation_speed==1 && action.increment == -1 ? 0 : action.increment
            return { ...state, planner_animation_speed: state.planner_animation_speed + increment}
            break; 
            case 'surveyor':
            increment = state.surveyor_animation_speed==1 && action.increment == -1 ? 0 : action.increment
            return { ...state, surveyor_animation_speed: state.surveyor_animation_speed + increment}
            break;
          }
    break;



    case 'SET_SLIDER_SECONDS_FROM_START':
    switch(action.pathname){
        case 'partload':
        return { ...state, partload_seconds_from_start: action.secondsPassed}
        break;
        case 'today':
        return { ...state, today_seconds_from_start: action.secondsPassed}
        break;
        case 'planner':
        return { ...state, planner_seconds_from_start: action.secondsPassed}
        break; 
        case 'surveyor':
        return { ...state, surveyor_seconds_from_start: action.secondsPassed}
        break;
    }

    break;

    case 'TOGGLE_BRANCH_LIST_DISPLAYED':

    switch(action.pathname){
        case 'partload':
        return { ...state, branch_list_displayed_partload: !state.branch_list_displayed_partload}
        break;
        case 'today':
        return { ...state, branch_list_displayed_today: !state.branch_list_displayed_today}
        break;
        case 'planner':
        return { ...state, branch_list_displayed_planner: !state.branch_list_displayed_planner}
        break;
        case 'surveyor':
        return { ...state, branch_list_displayed_surveyor: !state.branch_list_displayed_surveyor}
        break;
    }
    break;

    // case 'TOGGLE_BRANCH_LIST_DISPLAYED':

    //     var branch_list_displayed = 
    //     {
    //         partload: 'branch_list_displayed_partload', 
    //         today: 'branch_list_displayed_today', 
    //         planner: 'branch_list_displayed_planner'
    //     }
    //     console.log(branch_list_displayed[action.pathname])
    //     return { ...state, [branch_list_displayed[action.pathname]]: !state[branch_list_displayed[action.pathname]]}
    //     break;
    

    case 'TOGGLE_BRANCHES_ON_MAP':
    switch(action.pathname){
        case 'partload':
        return { ...state, branches_on_map_partload: !state.branches_on_map_partload}
        break;
        case 'today':
        return { ...state, branches_on_map_today: !state.branches_on_map_today}
        break;
        case 'planner':
        return { ...state, branches_on_map_planner: !state.branches_on_map_planner}
        break;
        case 'surveyor':
        return { ...state, branches_on_map_surveyor: !state.branches_on_map_surveyor}
        break;
    }
    break;

    case 'TOGGLE_FULL_SCREEN_MAP':
        switch(action.pathname){
            case 'partload':
            return { ...state, full_screen_map_partload: !state.full_screen_map_partload}
            break;
            case 'today':
            return { ...state, full_screen_map_today: !state.full_screen_map_today}
            break;
            case 'planner':
            return { ...state, full_screen_map_planner: !state.full_screen_map_planner}
            break;
            case 'surveyor':
            return { ...state, full_screen_map_surveyor: !state.full_screen_map_surveyor}
            break;
        }

    return { ...state, full_screen_map: !state.full_screen_map}
    break;

    // case 'SET_SHOW_FROM_BRANCH':
    // return { ...state, show_from_branch: !state.show_from_branch}
    // break;

    case 'TOGGLE_ANIMATION_RUNNING':
    return { ...state, animation_running: !state.animation_running}
    break;

    // case 'SET_SHOW_TO_BRANCH':
    // return { ...state, show_to_branch: !state.show_to_branch}
    // break;


    case 'SET_FILTER_SEARCH_STRING':
    return { ...state, filter_search_string: action.payload}
    break;
    //
    case 'SET_PLANNER_SLIDER_SECONDS_FROM_START':
    return { ...state, planner_seconds_from_start: action.payload}
    break;



    case 'GET_TRIPS_FULFILLED':
    var newArray = action.payload.slice()
    var anotherNewArray = newArray.map((trip, index)=>{
        var google_directions= JSON.parse(trip.google_directions)
        trip.google_directions = google_directions
        var google_directions_to_branch= JSON.parse(trip.google_directions_to_branch)
        trip.google_directions_to_branch = google_directions_to_branch
        var google_directions_from_branch= JSON.parse(trip.google_directions_from_branch)
        trip.google_directions_from_branch = google_directions_from_branch
        
        var google_waypoints_directions= JSON.parse(trip.google_waypoints_directions)
        trip.google_waypoints_directions = google_waypoints_directions
       
        trip.colour=helpers.getUniqueColor(index)
        return trip
    })
    if(state.asynch_loading_total===3) {
        console.log('trips')
        // console.log(compose_survey_object(state.all_branches, state.all_surveys))
        // compose_survey_object(state.all_branches, state.all_surveys)
        // return {...state, all_trips: anotherNewArray, getTripsError: null, asynch_loading_total: state.asynch_loading_total + 1, survey_object: compose_survey_object(state.all_branches, state.all_surveys)}

        return {...state, all_trips: anotherNewArray, getTripsError: null, asynch_loading_total: state.asynch_loading_total + 1}
    }else{
        return {...state, all_trips: anotherNewArray, getTripsError: null, asynch_loading_total: state.asynch_loading_total + 1}
    }
   
    break;
    //
    case 'GET_TRIPS_REJECTED':
    return {...state,  getTripsError: action.payload}
    break;
    //
    case 'GET_EMPLOYEES_FULFILLED':
    if(state.asynch_loading_total===3) {
        console.log('EMPLOYEES')
        // compose_survey_object(state.all_branches, state.all_surveys)
        
        // return {...state, all_employees: action.payload, getEmployeesError: null, asynch_loading_total: state.asynch_loading_total+1, survey_object: compose_survey_object(state.all_branches, state.all_surveys)}

        return {...state, all_employees: action.payload, getEmployeesError: null, asynch_loading_total: state.asynch_loading_total+1}
    }else{
        return {...state, all_employees: action.payload, getEmployeesError: null, asynch_loading_total: state.asynch_loading_total+1}
    }
   
    break;

    case 'GET_EMPLOYEES_REJECTED':
    return {...state, getEmployeesError: action.payload}
    break;

    case 'GET_BRANCHES_FULFILLED':
    var newBranchesArray = action.payload.slice()
    var anotherNewArray = newBranchesArray.map((branch, index)=>{
        var latlng=JSON.parse(branch.latlng)
        branch.latlng = latlng
        branch.colour=helpers.getUniqueColor(index)
        return branch
    })
    if(state.asynch_loading_total==3){

        return {...state, all_branches: anotherNewArray, getBranchesError: null, asynch_loading_total: state.asynch_loading_total + 1}
    }else{
       return {...state, all_branches: anotherNewArray, getBranchesError: null, asynch_loading_total: state.asynch_loading_total + 1} 
    }
   
    break;
    
    case 'GET_BRANCHES_REJECTED':
    return {...state,  getBranchesError: action.payload}
    break;
    
   
    case 'SET_HIDDEN_STATUS':
    var holder = state.all_trips.slice()
    holder.forEach((job)=>{
        if(job.id===action.payload.id)
            {job.hidden = false}
    })
    return {...state,  all_trips: holder}
    break;
    //
    case 'SET_UNHIDDEN_STATUS':
    var holder = state.all_trips.slice()
    holder.forEach((job)=>{
        if(job.id===action.payload.id)
            {job.hidden = true}
    })
    return {...state,  all_trips: holder}
    break;
   

    case 'SET_CURRENT_TRUCKFLICKER_JOB':
    switch (action.pathname){
        case 'today':
        return{...state, current_today_truckflicker_job: action.payload}
        break;
        case 'planner':
        return{...state, current_planner_truckflicker_job: action.payload}
        break;
        case 'partload':
        return{...state, current_partload_truckflicker_job: action.payload}
        break;
        case 'surveyor':
        return{...state, current_surveyor_truckflicker_job: action.payload}
        break;
    }
    break;

    case 'CLEAR_CURRENT_TRUCKFLICKER_JOB':
      switch (action.pathname){
        case 'today':
        return{...state, current_today_truckflicker_job: ''}
        break;
        case 'planner':
        return{...state, current_planner_truckflicker_job: ''}
        break;
        case 'partload':
        return{...state, current_partload_truckflicker_job: ''}
        break;
        case 'surveyor':
        return{...state, current_surveyor_truckflicker_job: ''}
        break;
    }
    break;
    
  }
  return state
}



export default handleTripData


// function compose_survey_object(branches, surveys){
//     var object = {}
//     branches.forEach((branch)=>{
//         object[branch.branch_code]={}
//     })
//     surveys.forEach((survey)=>{
//         if(object[survey.branch_code][survey.moveware_employee_code]){
//             object[survey.branch_code][survey.moveware_employee_code].push(survey)
//         }else{
//             object[survey.branch_code][survey.moveware_employee_code]=[survey]
//         }
//     })
//     return object
// }