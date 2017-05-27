import {combineReducers} from 'redux'
import { routerReducer} from 'react-router-redux'
import handleLogin from './login'



const rootReducer = combineReducers({
  loginDetails: handleLogin, 
  routing: routerReducer
})







export default rootReducer