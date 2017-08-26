import React from 'react'
import {Link} from 'react-router'
import {mapObjectInstances} from '../models/mapObject'
import BranchesInfo from './BranchesInfo.jsx'
import interact from 'interact.js'
// import { LinkContainer } from 'react-router-bootstrap';
interact('.resize-drag')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: false,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    //target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
  });


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
    // e.preventDefault()
    // var pathname = this._reactInternalInstance._context.router.getCurrentLocation().pathname.slice(1)
    // console.log(pathname)
    // if(!(pathname == 'partload'||pathname == 'today'||pathname == 'planner')) return
    // var mapObject = this.getMapObject(pathname)
    // console.log(mapObject)
    //   mapObject.toggleBranchList.call(mapObject)
      document.getElementById("myDropdown").classList.toggle("show");
    

   }


   



 render(){

  return(

    <nav  className="nav-bar">

      <button id="button-branch-list-nav" onClick={this.toggleBranchList.bind(this)}>Branch List</button>

      <div className="dropdown-content resize-drag" id="myDropdown">
            <BranchesInfo/>
      </div>

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
