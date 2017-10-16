import React from "react";
import { Link } from "react-router";
import SignUp from "../account_management/SignUp";

class LoginBox extends React.Component {
  handleChangeEmail(event) {
    event.preventDefault();
    this.props.loginEmail(event.target.value);
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.loginPassword(event.target.value);
  }

  handleSignInClick(event) {
    event.preventDefault();
    this.props.signInClick(this.props.user_email, this.props.user_password);
  }

  render() {
    return (
      <div>
        <h1>We are LoginBox</h1>
        <input
          type="text"
          className="sign_in_email"
          placeholder="email"
          onChange={this.handleChangeEmail.bind(this)}
        />
        <input
          type="text"
          className="sign_in_password"
          placeholder="password"
          onChange={this.handleChangePassword.bind(this)}
        />
        <input
          type="submit"
          className="sign_in_button"
          value="Sign In"
          onClick={this.handleSignInClick.bind(this)}
        />
        <SignUp
          signUpClick={this.props.signUpClick}
          signUploginEmail={this.props.signUploginEmail}
          signUpPasswordConfirm={this.props.signUpPasswordConfirm}
          signUploginPassword={this.props.signUploginPassword}
          getUsers={this.props.getUsers}
        />
      </div>
    );
  }
}

export default LoginBox;
