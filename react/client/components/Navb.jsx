import React from 'react'
import {Link} from 'react-router'
import BranchesInfo from './BranchesInfo.jsx'

class Navb extends React.Component {

  signOut(e){
    e.preventDefault()
    this.props.signOut()
  }

  toggleBranchList(e){
    console.log("clicked")
    document.getElementById("myDropdown").classList.toggle("show");
  }

  render(){

    return(
      <div>
        <nav  className="nav-bar">
         
          <div className="home-nav">
           <Link to="/" >Home</Link>
          </div> 

          <div className="planner-nav">
           <Link to="/planner" activeClassName="active">Planner</Link>
          </div> 

          <div className="surveyor-nav">
           <Link to="/surveyor" activeClassName="active">Surveyor's Diary</Link>
          </div> 

          <div className="today-nav">
           <Link to="/today" activeClassName="active">Today</Link>
          </div> 

          <div className="partload-nav">
           <Link to="/partload" activeClassName="active">Partload</Link>
          </div> 

          <div className="csv-nav">
           <Link  to="/update_data" activeClassName="active">Update Data</Link>
          </div>

          <div className="account-nav">
           <Link  to="/account_management" activeClassName="active">Account</Link>
          </div>

          <button id="button-branch-list-nav" onClick={this.toggleBranchList.bind(this)}>
            Branch List
          </button>


          <div id="current-email">
            {this.props.displayEmail}
          </div>

          <button id="button-sign-out" onClick={this.signOut.bind(this)}>
            Sign Out
          </button>

        </nav>
        <div className="branch-sidebar" id="myDropdown">

          <div className="branch-list">

          <BranchesInfo/>
          </div>
          <div className="branch-icon" onClick={this.toggleBranchList.bind(this)}>
          branches
          </div>
          

        </div>
      </div>
    )
  }

}

export default Navb
