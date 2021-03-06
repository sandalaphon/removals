import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import store, {history} from './store'
import Raven from 'raven-js'
import {sentry_url, logException} from './helpers/config'
import LoginBox from './components/LoginBox'
import Home from './components/Home'
import Planner from './components/Planner'
import Surveyor from './components/Surveyor'
import UpdateData from './components/UpdateData'
import Main from './components/Main'


Raven.config(sentry_url, {
  tags: { git_commit: "Joseph what the fuck",
  user_level: "access level mega"}
}).install()

// Raven.showReportDialog()//user gets a pop up




class TopComponent extends React.Component {

  render(){

//const rendered = if

     
    
    return(
      <Provider store= {store}>
      <Router history = {browserHistory}>
      
      <Route path="/" component= {Main}> 
      <IndexRoute component= {Planner}></IndexRoute> 
      <Route path="home" component= {Home}></Route>
      <Route path="planner" component= {Planner}></Route>
      <Route path="surveyors_diary" component= {Surveyor}></Route>
      <Route path="update_data" component= {UpdateData}></Route>
     
      </Route>
    
    
 

      </Router>
      </Provider>
      )
  }
}


//
// <IndexRoute component= {Home}/>




ReactDOM.render(<TopComponent className='container'/>, document.getElementById('app'))