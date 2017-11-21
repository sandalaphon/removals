import React from "react"
import { Link } from "react-router"
import BranchesInfo from "./BranchesInfo.jsx"

class Navb extends React.Component {

  constructor(props) {
    super(props)
    this.handleOutsideClick = this.handleOutsideClick.bind(this) // still have to bind, to see setState
    this.state = {
      branchOpen: false
    }
  }

  handleOutsideClick(e){
    var branchListTop    =  document.getElementById('branch-info')
    var branchListButton =  document.getElementById('button-branch-list-nav')

    if (e.target == branchListButton){ // button click
      document.removeEventListener('click', this.handleOutsideClick)
    }else if(!branchListTop.contains(e.target)){  //click outside
      document.getElementById("branch-info").classList.toggle("show")
      document.removeEventListener('click', this.handleOutsideClick)
      this.setState({branchOpen: false})
    }
  }

  toggleBranchList() {
    if (this.state.branchOpen){
      document.removeEventListener('click', this.handleOutsideClick)
      document.getElementById("branch-info").classList.toggle("show")
      this.setState({branchOpen : false})
    }else{
      document.addEventListener('click', this.handleOutsideClick)
      document.getElementById("branch-info").classList.toggle("show")
      this.setState({branchOpen : true})
    }
  }

  signOut(e) {
    e.preventDefault()
    this.props.signOut()
  }

  setPartloadOrRemovalFromStore(e) {
    e.preventDefault()
    document.querySelector("." + e.target.id).click()
  }

  render() {
    return (
      <div>
        <nav className="nav-bar">
          <div className="home-nav">
            <Link to="/">
              <i className="fa fa-home fa-lg" />
            </Link>
          </div>

          <div className="dropdown-nav">
            <button className="nav-dropdown-btn nav-btn">
              Logistics <i className="fa fa-caret-down" />
            </button>
            <div className="dropdown-nav-content" id="dropdown-nav-content">
              <Link to="/today" activeClassName="active">
                Today
              </Link>
              <Link to="/surveyor" activeClassName="active">
                Surveyor's Diary
              </Link>
              <Link to="/planner" activeClassName="active">
                Planner
              </Link>
              <Link
                to="/partload"
                className="partload_link"
                activeClassName="active"
              >
                Partload
              </Link>
            </div>
          </div>

          <div className="dropdown-nav">
            <button className="nav-acc-dropdown-btn nav-btn">
              Account <i className="fa fa-caret-down" />
            </button>
            <div className="dropdown-nav-content">
              <Link to="/account_management" activeClassName="active">
                Account
              </Link>
              <Link to="/update_data" activeClassName="active">
                Update Data
              </Link>
            </div>
          </div>

          <div className="dropdown-nav">
            <button className="nav-acc-dropdown-btn nav-btn">
              Distance <i className="fa fa-caret-down" />
            </button>

            <div className="dropdown-nav-content">
              <Link to="/removal_from_store" activeClassName="active">
                Removal From Store
              </Link>
              <button
                id="partload_link"
                onClick={this.setPartloadOrRemovalFromStore.bind(this)}
              >
                Partload
              </button>
            </div>
          </div>

          <button
            id="button-branch-list-nav"
            className="nav-btn"
            onClick={this.toggleBranchList.bind(this)}
          >
            Branch List
          </button>

          <div id="current-email">{this.props.displayEmail}</div>

          <button
            id="button-sign-out"
            className="nav-btn"
            onClick={this.signOut.bind(this)}
          >
            Sign Out
          </button>
        </nav>
        <div className="branch-sidebar" id="branch-info">
            <BranchesInfo />
        </div>
        
      </div>
    )
  }

}

export default Navb



 // TRIANGLE BRANCH BUTTON
 //  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
 //          <div
 //            className="branch-icon"
 //            onClick={this.toggleBranchList.bind(this)}
 //          >
 //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// <div className="csv-nav">
// <Link  to="/update_data" activeClassName="active">Update Data</Link>
// </div>

// <div className="account-nav">
// <Link  to="/account_management" activeClassName="active">Account</Link>
// </div>

// <div className="planner-nav">
// <Link to="/planner" activeClassName="active">Planner</Link>
// </div>

// <div className="today-nav">
// <Link to="/today" activeClassName="active">Today</Link>
// </div>

// <div className="partload-nav">
// <Link to="/partload" activeClassName="active">Logistics</Link>
// </div>

// <div className="surveyor-nav">
// <Link to="/surveyor" activeClassName="active">Surveyor's Diary</Link>
// </div>
