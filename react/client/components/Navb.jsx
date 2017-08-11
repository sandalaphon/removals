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
     
       <Link className="home-nav" to="/" >Home</Link>
    
       <Link className="planner-nav" to="/planner" activeClassName="active">Planner</Link>
   
       <Link className="today-nav" to="/today" activeClassName="active">Today</Link>
     
       <Link className="partload-nav" to="/partload" activeClassName="active">Partload</Link>
    
       <Link className="csv-nav" to="/update_data" activeClassName="active">Update Data</Link>
  
       <Link className="account-nav" to="/account_management" activeClassName="active">Account</Link>
    
      <div id="current-email">{this.props.displayEmail}</div>
      <button id="button-sign-out" onClick={this.signOut.bind(this)}>Sign Out</button>
    </nav>


    )
 }
}

export default Navb
