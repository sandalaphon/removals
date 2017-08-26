
import * as helpers from './_helpers'

function handleTripData(state = {
  trips: null,
  // renderedRoutes: [],
  current_today_truckflicker_job: '',
  current_partload_truckflicker_job: '',
  current_planner_truckflicker_job: '',
  // branch_status_partload: 0,
  // branch_status_today: 0,
  // branch_status_planner:0 ,
  all_trips: [],
  show_to_branch: true,
  show_from_branch: true,
  full_screen_map_today: false,
  full_screen_map_partload: false,
  full_screen_map_planner: false,
  branches_on_map_partload: false,
  branches_on_map_today: false,
  branches_on_map_planner: false,
  branch_list_displayed_partload: false,
  branch_list_displayed_planner: false,
  branch_list_displayed_today: false,
  clicked_branch_id: 35,
  branch_list_item_open:{
    open: false,
    class: "section"
  }

},action){


  switch(action.type) {

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
    }
    break;

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
    }
    break;

    case 'TOGGLE_BRANCH_LIST_ITEM':
      let toggle
      if (state.branch_list_item_open.open==true){
        toggle= {
          open: false,
          class: "section"
        }
      }else{
        console.log("in else?")
        toggle = {
          open: true,
          class: "section open"
        }
      }
      console.log("toggle",state.branch_list_item_open)
    return {...state, branch_list_item_open: toggle}
    break;



    case 'SET_BRANCH_ICON_CLICKED_ID':
    let icon_toggle
    if (state.clicked_branch_id == action.id){
      console.log("sameclicked")
      icon_toggle = {open: false, class: "section"}
    }
    else{
      icon_toggle = {open: true, class: "section open"}
    }



    return {...state, clicked_branch_id: action.id, branch_list_item_open: icon_toggle}
    break;

    // case 'SET_BRANCH_DISPLAYED_STATUS':
    //     switch(action.pathname){
    //         case 'partload':
    //         return { ...state, branch_status_partload: action.showing}
    //         break;
    //         case 'today':
    //         return { ...state, branch_status_today: action.showing}
    //         break;
    //         case 'planner':
    //         return { ...state, branch_status_planner: action.showing}
    //         break;
    //     }
    
    // break;


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
        }

    return { ...state, full_screen_map: !state.full_screen_map}
    break;

    case 'SET_SHOW_FROM_BRANCH':
    return { ...state, show_from_branch: !state.show_from_branch}
    break;

    case 'SET_SHOW_TO_BRANCH':
    return { ...state, show_to_branch: !state.show_to_branch}
    break;


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
       
        trip.colour=helpers.getUniqueColor(index)
        return trip
    })
    return {...state, all_trips: anotherNewArray, getTripsError: null}
    break;
    //
    case 'GET_TRIPS_REJECTED':
    return {...state,  getTripsError: action.payload}
    break;
    //
    case 'GET_EMPLOYEES_FULFILLED':
    return {...state, all_employees: action.payload, getEmployeesError: null}
    break;

    case 'GET_EMPLOYEES_REJECTED':
    return {...state, getEmployeesError: action.payload}
    break;

    case 'GET_BRANCHES_FULFILLED':
    var newBranchesArray = action.payload.slice()
    var anotherNewArray = newBranchesArray.map((branch, index)=>{
        branch.colour=helpers.getUniqueColor(index)
        return branch
    })
    return {...state, all_branches: anotherNewArray, getBranchesError: null}
    break;
    //
    case 'GET_BRANCHES_REJECTED':
    return {...state,  getBranchesError: action.payload}
    break;
    
    //
    case 'SET_HIDDEN_STATUS':
    var holder = state.all_trips.slice()
    console.log('id', action.payload.id)
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
    //
    //
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
    }
    break;
    //
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
    }
    break;
    
  }
  return state
}

export default handleTripData