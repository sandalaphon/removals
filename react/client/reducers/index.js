import {combineReducers} from 'redux'
import { routerReducer} from 'react-router-redux'
import loginDetails from './login'
import trips from './tripsData'


const rootReducer = combineReducers({
  loginDetails, 
  routing: routerReducer,
  trips
})



export default rootReducer