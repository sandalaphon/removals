import React from 'react'
import SignUp from './SignUp'
import UserList from './UserList'
import {Button, Collapse, Well} from 'react-bootstrap'

class AccountManagement extends React.Component {

  constructor(...args) {
      super(...args);

      this.state = {};
    }

  componentWillMount(){

    this.props.getUsers()
  }

  render(){
    var {signUpClick, signUploginEmail, signUploginPassword, signUpPasswordConfirm, getUsers, deleteUser, currentUser} = this.props
   
    return(
      
      <div>
      <Button bsSize="small" bsStyle="success" onClick={ ()=> this.setState({ open: !this.state.open })}>
               Click To Add A User
             </Button>

             <Collapse in={this.state.open}>
               <div>
                 <Well>
                   <SignUp 
                      signUpClick={signUpClick} 
                      signUploginEmail={signUploginEmail} 
                      signUploginPassword={signUploginPassword}
                      signUpPasswordConfirm={signUpPasswordConfirm}
                      getUsers={getUsers}/>
                 </Well>
               </div>
             </Collapse>

             <Button bsSize="small" bsStyle="success" onClick={ ()=> this.setState({ open1: !this.state.open1 })}>
                      View Users
                    </Button>

                    <Collapse in={this.state.open1}>
                      <div>
                        <Well>
                        <UserList 
                        updateAdmin={this.props.updateAdmin} 
                        users={this.props.loginDetails}
                        deleteUser={deleteUser}/>
                          
                        </Well>
                      </div>
                    </Collapse>       
      </div>
      )
       }
  }


export default AccountManagement

// <SignUp 
 // signUpClick={signUpClick} 
 // signUploginEmail={signUploginEmail} 
 // signUploginPassword={signUploginPassword}
 // signUpPasswordConfirm={signUpPasswordConfirm}
 // getUsers={getUsers}/>


