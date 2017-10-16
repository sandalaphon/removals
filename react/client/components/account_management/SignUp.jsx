import React from "react";
// import {Link} from 'react-router'
import store from "../../store.js";
import { Button } from "react-bootstrap";

class SignUp extends React.Component {
  // constructor(...args) {
  //     super(...args);
  //     this.state = {showModal: false};
  //   }

  // closeModal() {
  //     this.setState({ showModal: false });
  //   }

  //   openModal() {
  //     this.setState({ showModal: true });
  //   }

  handleChangeSignUpEmail(event) {
    event.preventDefault();
    this.props.signUploginEmail(event.target.value);
  }

  handleChangeSignUpPassword(event) {
    event.preventDefault();
    this.props.signUploginPassword(event.target.value);
  }

  handleChangeSignUpPasswordConfirm(event) {
    event.preventDefault();
    this.props.signUpPasswordConfirm(event.target.value);
  }

  handleSignUpClick(event) {
    event.preventDefault();
    const {
      signup_email,
      signup_password,
      signup_password_confirm
    } = store.getState().sign_up;
    this.props.signUpClick(
      signup_email,
      signup_password,
      signup_password_confirm,
      this.props.getUsers.bind(this)
    );
    this.refs.commentForm.reset();
  }

  render() {
    // const {signup_email, signup_password,signup_password_confirm} = store.getState().loginDetails
    // var message
    //  if(signup_email){
    //   message =  `You Are About To Add "${signup_email}" As A User`
    //  }else{message = 'No User Email has been Entered'}
    // var modalPopUp =
    // <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
    //           <Modal.Header closeButton>
    //             <Modal.Title>Confirm New User: {signup_email}</Modal.Title>
    //           </Modal.Header>
    //           <Modal.Body>
    //             <h2>{message}</h2>
    //             <h3>Are You Sure?.</h3>

    //           </Modal.Body>
    //           <Modal.Footer>
    //             <Button onClick={this.closeModal.bind(this)}>Close</Button>
    //           </Modal.Footer>
    //         </Modal>

    return (
      <div>
        <h3>Please Enter New User Details </h3>
        <form ref="commentForm">
          <input
            type="text"
            className="sign_in_email"
            placeholder="email"
            onChange={this.handleChangeSignUpEmail.bind(this)}
          />
          <input
            type="text"
            className="sign_in_password"
            placeholder="password"
            onChange={this.handleChangeSignUpPassword.bind(this)}
          />
          <input
            type="text"
            className="sign_in_password"
            placeholder="confirm password"
            onChange={this.handleChangeSignUpPasswordConfirm.bind(this)}
          />
          <input
            type="submit"
            className="sign_in_button"
            value="Add User"
            onClick={this.handleSignUpClick.bind(this)}
          />
        </form>
      </div>
    );
  }
}

export default SignUp;

//  <input type = 'submit' className="sign_in_button" value="Add User" onClick = {this.handleSignUpClick.bind(this)} />

// <Button
// bsStyle="primary"
// bsSize="large"
// onClick={this.openModal.bind(this)}
// >
// Add User
// </Button>
// {modalPopUp}
