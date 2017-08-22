import React from 'react'
import {Link} from 'react-router'
import {mapObjectInstances} from '../models/mapObject'
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

   getMapObject(pathname){
    console.log(pathname)
     var mapObjects = {
       planner: mapObjectInstances.planner,
       partload: mapObjectInstances.partload,
       today: mapObjectInstances.today
     }
    return mapObjects[pathname]
   }

   toggleBranchList(e){
    e.preventDefault()
    var pathname = this._reactInternalInstance._context.router.getCurrentLocation().pathname.slice(1)
    console.log(pathname)
    if(!(pathname == 'partload'||pathname == 'today'||pathname == 'planner')) return
    var mapObject = this.getMapObject(pathname)
    console.log(mapObject)
      mapObject.toggleBranchList.call(mapObject)

   }

 render(){

  return(

    <nav  className="nav-bar">

    <button id="button-branch-list-nav" onClick={this.toggleBranchList.bind(this)}>Branch List</button>
     
      <div className="home-nav">
       <Link to="/" >Home</Link>
      </div> 

      <div className="planner-nav">
       <Link to="/planner" activeClassName="active">Planner</Link>
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
  
      <div id="current-email">{this.props.displayEmail}</div>
      <button id="button-sign-out" onClick={this.signOut.bind(this)}>Sign Out</button>
    </nav>


    )
 }
}

export default Navb
