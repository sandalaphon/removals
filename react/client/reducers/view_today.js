import Trip from '../models/trip'

function handleTripData(state = {
  today_date_selector: todayStartMidnight(),
  today_branch_selected: 'All_Branches',
  today_trips: getTodayTrips(todayStartMidnight(), 'All_Branches')
},action){


  switch(action.type) {

    case 'SET_TODAY_DATE_SELECTOR':
    return { ...state, today_date_selector: action.payload}
    break;

    case 'SET_TODAY_BRANCH_SELECTED':
    return {...state, today_branch_selected: action.payload}
    break;

    case 'SET_TODAY_TRIPS':
    var trips = getTodayTrips(state.today_date_selector, state.today_branch_selected)
    return {...state, today_trips: trips}
    break;

  }
  return state
}

function getTodayTrips(todayMilli, branch_selected){
  return Trip.getTripsByDayMilliAndBranch(todayMilli, branch_selected)
}

function todayStartMidnight(){
  var date = new Date()
  date.setHours(0,0,0,0)
  return +date
}

export default handleTripData