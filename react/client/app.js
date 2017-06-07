import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import store, {history} from './store'
import Raven from 'raven-js'
import {sentry_url, logException} from './helpers/config'

import LoginBox from './components/sign_in/LoginBox'
import Main from './components/Main'
import Layout from './components/Layout'

import Home from './components/home/Home'
import Planner from './components/planner/Planner'
import Today from './components/today/Today'
import Surveyor from './components/surveyor_diary/Surveyor'
import UpdateDataSmart from './components/update_data/UpdateDataSmart'
import AccountManagementSmart from './components/account_management/AccountManagementSmart'


Raven.config(sentry_url, {
  tags: { git_commit: "Joseph what the fuck",
  user_level: "access level mega"}
}).install()

// Raven.showReportDialog()//user gets a pop up

class TopComponent extends React.Component {

  render(){
     
    return(
      <Provider store= {store}>
      <Router history = {browserHistory}>
        <Route path="/" component= {Main}> 
          <IndexRoute component= {Home}></IndexRoute> 
          <Route path="home" component= {Home}></Route>
          <Route path="planner" component= {Planner}></Route>
          <Route path="today" component= {Today}></Route>
          <Route path="surveyors_diary" component= {Surveyor}></Route>
          <Route path="update_data" component= {UpdateDataSmart}></Route>
          <Route path="account_management" component= {AccountManagementSmart}></Route>
          <Route path="account_management/add_user" component= {AccountManagementSmart}></Route>
        </Route>
      </Router>
      </Provider>
      )
  }

}

ReactDOM.render(<TopComponent className='container'/>, document.getElementById('app'))