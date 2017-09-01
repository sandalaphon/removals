import { applyMiddleware,createStore, compose } from 'redux'
import { syncHistoryWithStore} from 'react-router-redux'
import { browserHistory} from 'react-router'
import rootReducer from './reducers/_combiner'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './sagas/sagas'


const  defaultState = {
    // loginDetails: {}

}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancers = compose(
//   window.devToolsExtension ? window.devToolsExtension() : f => f
//   )
const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware, thunk, logger())
// const middleware = applyMiddleware(thunk)

const enhancer = composeEnhancers(middleware)

const store = createStore(rootReducer, defaultState,  enhancer)

export const history = syncHistoryWithStore(browserHistory, store)

//took out middleware and logger from createStore (they are included in enhancer and seems to work...redux extension now works)

//if(module.hot){
 // module.hot.accept('./reducers/', ()=>{
 //   const nextRootReducer = require('./reducers/index').default
 //   store.replaceReducer(nextRootReducer)
 // })
 
//}

// sagaMiddleware.run(rootSaga)

export default store;