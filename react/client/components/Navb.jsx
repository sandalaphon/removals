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
     
      <div className="home-nav">
       <Link to="/" >Home</Link>
      </div> 

      <div className="planner-nav">
       <Link to="/planner" activeClassName="active">Planner</Link>
      </div> 

      <div className="today-nav">
       <Link to="/today" activeClassName="active">Today</Link>
      </div> 

      <div className="csv-nav">
       <Link  to="/update_data" activeClassName="active">Update Data</Link>
      </div>

      <div className="account-nav">
       <Link  to="/account_management" activeClassName="active">Account</Link>
      </div>
  
      <div id="current-email">{this.props.displayEmail}</div>
      <button id="button-sign-out" onClick={this.signOut.bind(this)}>Sign Out</button>
    </nav>


    )
 }
}

export default Navb
