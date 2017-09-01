import {takeEvery} from 'redux-saga'
import {call, put} from 'redux-saga/effects'
import axios from 'axios'

//workerSaga
export function* createTripsFulfilledAsynch(){
  try{
const response = yield call(axios.get, 'http://localhost:5000/api/trips', {withCredentials:true})
console.log('worker saga', response )
//NOW yield put({type: GET_TRIPS_FULFILLED, payload: response.data})
//put similar to dispatch?
  }
  catch(e){
console.log(e)
yield put({type: 'GET_TRIPS_REJECTED'})
  }
} 


//watcher saga
export function* watchGetAllTripsFromRails(){
  console.log('saga listener on ')
  yield takeEvery('GET_TRIPS_FULFILLED', createTripsFulfilledAsynch)
  //note that the action would be 'GET_TRIP'
}






//rootSaga
// single entry point to start sagas at once
export function* rootSaga() {
yield [
  watchGetAllTripsFromRails()
]
}