
function handleTripData(state = {
  today_date_selector: todayStartMidnight()
},action){


  switch(action.type) {

    case 'SET_TODAY_DATE_SELECTOR':
    return { ...state, today_date_selector: action.payload}
    break;

  }
  return state
}

function todayStartMidnight(){
  var date = new Date()
  date.setHours(8,0,0,0)
  return +date
}

export default handleTripData