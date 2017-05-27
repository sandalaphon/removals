import { applyMiddleware,createStore, compose } from 'redux'
import { syncHistoryWithStore} from 'react-router-redux'
import { browserHistory} from 'react-router'
import rootReducer from './reducers/index'
// import comments from './data/comments'
// import posts from './data/posts'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const  defaultState = {
    loginDetails: {}
  // comments
}

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )
const middleware = applyMiddleware( thunk, logger())
const store = createStore(rootReducer, defaultState, middleware, logger(),  enhancers)

export const history = syncHistoryWithStore(browserHistory, store)

//if(module.hot){
 // module.hot.accept('./reducers/', ()=>{
 //   const nextRootReducer = require('./reducers/index').default
 //   store.replaceReducer(nextRootReducer)
 // })
 
//}

export default store;