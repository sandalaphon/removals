import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import login from './view_login'
import sign_up from './view_sign_up'
import common from './_common'
import today from './view_today'
import planner from './view_planner'
import partload from './view_partload'
import account_management from './view_account_management'
import update_data from './view_update_data'
import surveyor from './view_surveyor'

const rootReducer = combineReducers({
  routing: routerReducer,
  common,
  login,
  sign_up,
  today,
  planner,
  partload,
  account_management,
  update_data,
  surveyor,
})

export default rootReducer
