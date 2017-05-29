import React from 'react'
import {Link} from 'react-router'

class Nav extends React.Component {
  signOut(e){
    e.preventDefault()
    //execute 
    this.props.signOut()
  }



 render(){

  return(
    <div>
    <h1>Removal Company Admin User: {this.props.displayEmail}</h1>
    <Link to = "home">Home</Link>
    <Link to = "planner">Planner</Link>
    <Link to = "surveyors_diary">Surveyors Diary</Link>
    <Link to = "update_data">Update Data</Link>
    <Link  to = "account_management"
   >Manage Account</Link>
    <button onClick={this.signOut.bind(this)}>Sign Out</button>
    </div>
    )
 }
}

export default Nav

    // displayEmail={this.props.displayEmail} 
// signUpClick={this.props.signUpClick} 
// signUploginEmail={this.props.signUploginEmail} 
// signUploginPassword={this.props.signUploginPassword}
// signUpPasswordConfirm={this.props.signUpPasswordConfirm}