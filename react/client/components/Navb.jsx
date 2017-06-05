import React from 'react'
import {Link} from 'react-router'
import {NavDropdown,MenuItem, Navbar, Nav, NavItem, Button, Form, FormGroup, FormControl} from 'react-bootstrap'
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
    <Navbar inverse className="row navrow">  
      <Navbar.Header>
      <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>

      <Nav bsStyle= 'pills' onSelect={this.handleSelect} >

      <LinkContainer to="/home">
      <NavItem  >Home</NavItem>
      </LinkContainer>

      <LinkContainer to="/planner">
      <NavItem >Planner</NavItem>
      </LinkContainer>

      <LinkContainer to="/today">
      <NavItem >Today</NavItem>
      </LinkContainer>

      <LinkContainer to="/surveyors_diary">
      <NavItem >Surveyors Diary</NavItem>
      </LinkContainer>

      <LinkContainer to="/update_data">
      <NavItem >Update Data</NavItem>
      </LinkContainer>

      <NavDropdown title="Account" id="nav-dropdown">
        <MenuItem ><LinkContainer to="/account_management"><NavItem >View/Edit User</NavItem></LinkContainer></MenuItem>
        <MenuItem eventKey="1"><LinkContainer to="/account_management/add_user"><NavItem >Add a User</NavItem></LinkContainer></MenuItem>
        <MenuItem >Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem >Separated link</MenuItem>
      </NavDropdown>



      
      </Nav>

      <Nav pullRight>
      <NavItem><Button bsStyle="danger" onClick={this.signOut.bind(this)}>Sign Out</Button></NavItem>
      </Nav>
      <Navbar.Text pullRight>{this.props.displayEmail}</Navbar.Text>




      </Navbar.Collapse>
    </Navbar>
  

    )
 }
}

export default Navb

// <Navbar.Text className="pullLeft">Welcome: {this.props.displayEmail}</Navbar.Text>

// <LinkContainer to="/account_management">
// <NavItem >Manage Account</NavItem>
// </LinkContainer>



// <Nav bsStyle = 'tabs' justified >

// <NavItem><Link to = "home">Home</Link></NavItem>
// <NavItem><Link to = "planner">Planner</Link></NavItem>
// <NavItem><Link to = "surveyors_diary">Surveyors Diary</Link></NavItem>
// <NavItem><Link to = "update_data">Update Data</Link></NavItem>
// <NavItem><Link to = "account_management" >Manage Account</Link></NavItem>

// <NavItem><Navbar.Form >
        // <FormGroup>
          // <FormControl type="text" placeholder="Search" />
        
    
        // <Button bsStyle="warning" type="submit">Submit</Button>
        // </FormGroup>
      // </Navbar.Form></NavItem>
// <NavItem pullRight><Button bsStyle='danger' onClick={this.signOut.bind(this)}>Sign Out</Button></NavItem>
// </Nav>

    // displayEmail={this.props.displayEmail} 
// signUpClick={this.props.signUpClick} 
// signUploginEmail={this.props.signUploginEmail} 
// signUploginPassword={this.props.signUploginPassword}
// signUpPasswordConfirm={this.props.signUpPasswordConfirm}