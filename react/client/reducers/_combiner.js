import {combineReducers} from 'redux'
import { routerReducer} from 'react-router-redux'
import login from './view_login'
import trips from './tripsData'
import today from './view_today'
import planner from './view_planner'
import partload from './view_partload'
import update_data from './view_update_data'



const rootReducer = combineReducers({
  routing: routerReducer,
  login, 
  trips,
  today,
  planner,
  partload,
  update_data
})



export default rootReducer