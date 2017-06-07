import React from 'react'
import {Link} from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';


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
       <Link to="/">Home</Link>
      </div> 

      <div className="planner-nav">
       <Link to="/planner">Planner</Link>
      </div> 

      <div className="today-nav">
       <Link to="/today">Today</Link>
      </div> 

      <div className="planner2-nav active">
       <Link  to="/planner">planner</Link>
      </div>
  
      <div id="current-email">{this.props.displayEmail}</div>
      <button id="button-sign-out"onClick={this.signOut.bind(this)}/>
    </nav>


    
  

    )
 }
}

export default Navb
