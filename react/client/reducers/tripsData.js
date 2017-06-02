function handleData(state = {
trips: null
},action){


  switch(action.type) {
    case 'SEND_TRIP_FULFILLED':
    return {...state, trips: action.payload, sendTripError: null}
    break;
    case 'SEND_TRIP_REJECTED':
    return {...state, sendTripError: action.payload}
    break;
  }
  return state
}

export default handleData