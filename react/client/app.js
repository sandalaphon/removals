import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import store, {history} from './store'
import Raven from 'raven-js'
import {sentry_url, logException} from './helpers/config'

import LoginBox from './components/sign_in/LoginBox'
import Layout from './components/Layout'
import Partload from './components/partload/Partload'
import Home from './components/home/Home'
import Planner from './components/planner/Planner'
import Today from './components/today/Today'
import Surveyor from './components/surveyor_diary/Surveyor'
import UpdateData from './components/update_data/UpdateData'
import RemovalFromStore from './components/removal_from_store/RemovalFromStore'
import AccountManagement from './components/account_management/AccountManagement'


// Raven.config(sentry_url, {
//   tags: { git_commit: "Hello Joseph",
//   user_level: "access level mega"}
// }).install()

// Raven.showReportDialog()//user gets a pop up

class TopComponent extends React.Component {

  render(){
     
    return(
      <Provider store= {store}>
      <Router history = {history}>
        <Route path="/" component= {Layout}> 
          <IndexRoute component= {Home}></IndexRoute> 
          <Route path="home" component= {Home}></Route>
          <Route path="planner" component= {Planner}></Route>
          <Route path="today" component= {Today}></Route>
          <Route path="surveyor" component= {Surveyor}></Route>
          <Route path="update_data" component= {UpdateData}></Route>
          <Route path="account_management" component= {AccountManagement}></Route>
          <Route path="partload" component= {Partload}></Route>
          <Route path="removal_from_store" component= {RemovalFromStore}></Route>
          <Route path="account_management/add_user" component= {AccountManagement}></Route>
        </Route>
      </Router>
      </Provider>
      )
  }

}

ReactDOM.render(<TopComponent className='container'/>, document.getElementById('app'))