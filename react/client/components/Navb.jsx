import React from 'react'
import {Link} from 'react-router'
// import { LinkContainer } from 'react-router-bootstrap';

class Navb extends React.Component {
  signOut(e){
    e.preventDefault()
    //execute 
    this.props.signOut()
  }

  handleSelect(eventKey) {
     event.preventDefault();
     if(eventKey){
      alert(`selected ${eventKey}`);
      // this.props.addUser()
     }
    
   }

  render(){

    return(
      <nav  className="nav-bar">
        <Link 
          to="/"
          className="home-nav" >
          Home
        </Link>
        <Link 
          to="/planner"  
          className="planner-nav" 
          activeClassName="active">
          Planner
        </Link>
        <Link 
          to="/today" 
          className="today-nav" 
          activeClassName="active">
          Today
        </Link>
        <Link 
          to="/partload" 
          className="partload-nav" 
          activeClassName="active">
          Partload
        </Link>
        <Link  
          to="/update_data" 
          className="csv-nav" 
          activeClassName="active">
          Update Data
        </Link>
        <Link  
          to="/account_management" 
          className="account-nav" 
          activeClassName="active">
          Account
        </Link>
        <div id="current-email">
          {this.props.displayEmail}
        </div>
        <button 
          id="button-sign-out" 
          onClick={this.signOut.bind(this)}>
          Sign Out
        </button>
      </nav>


      )
   }

}

export default Navb
