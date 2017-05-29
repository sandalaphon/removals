import {combineReducers} from 'redux'
import { routerReducer} from 'react-router-redux'
import loginDetails from './login'


const rootReducer = combineReducers({
  loginDetails, 
  routing: routerReducer
})



export default rootReducer