import Trip from '../models/trip'

function handleTripData(
  state = {
    today_date_selector: todayStartMidnight(),
    today_branch_selected: 'All_Branches',
    today_post_code: '',
    today_date_range: {
      start_date: todayStartMidnight(),
      end_date: todayStartMidnight(),
    },
    today_closest: [],
    date_open: false,
    postcode_loading: false,
    today_trips: getTodayTrips(
      { start_date: todayStartMidnight(), end_date: todayStartMidnight() },
      'All_Branches',
    ),
  },
  action,
) {
  switch (action.type) {
    case 'SET_TODAY_DATE_SELECTOR':
      return { ...state, today_date_selector: action.payload }
      break

      

      case 'SET_TODAY_POSTCODE':
      if(!action.payload){
        return { ...state, today_post_code: action.payload, today_closest: [] }
      }else{
        return { ...state, today_post_code: action.payload }
      }
        
        break

    case 'TOGGLE DATE OPEN':
      return { ...state, date_open: !state.date_open }
      break

      case 'TOGGLE POSTCODE LOADING':
        return { ...state, postcode_loading: !state.postcode_loading }
        break

      case 'SET_TODAY_BRANCH_SELECTED':
        return { ...state, today_branch_selected: action.payload }
        break

      case 'CLOSEST_TRIPS_FULFILLED':
      var today_closest_trips = action.payload.map(trip => {
        return Trip.getTripById(trip.id)
      })
        return { ...state, today_closest: today_closest_trips, today_closest_error: null, postcode_loading: !state.postcode_loading }
        break

        case "CLOSEST_TRIPS_REJECTED":
          return { ...state, today_closest: [], today_closest_error: action.payload, postcode_loading: !state.postcode_loading }
          break

    case 'SET_TODAY_TRIPS':
      // var trips = getTodayTrips(state.today_date_selector, state.today_branch_selected)
      var trips = getTodayTrips(
        state.today_date_range,
        state.today_branch_selected,
      )
      return { ...state, today_trips: trips }
      break

    case 'SET_TODAY_DATE_RANGE':
      return { ...state, today_date_range: action.payload }
      break
  }
  return state
}

function getTodayTrips(date_range, branch_selected) {
  return Trip.getTripsByDateRangeAndBranch(date_range, branch_selected)
}

function todayStartMidnight() {
  var date = new Date()
  date.setHours(0, 0, 0, 0)
  return +date
}

export default handleTripData
