import React from "react";
import SignUp from "./SignUp";
import UserList from "./UserList";
import EnterCosts from "./EnterCosts";
import AddEmployee from "./AddEmployee";
import { Button, Collapse, Well } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as accountManagementActions from "../../actions/account_management_actions.js";
import * as signUpActions from "../../actions/sign_up_actions.js";

class AccountManagement extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.accountActions.getUsers();
  }

  render() {
    var {
      getUsers,
      deleteUser,
      updateAdmin,
      setFuelPerMile18t,
      setFuelPerMile9t,
      setFuelPerMileLuton,
      setDriverPerHour18t,
      setDriverPerHour9t,
      setDriverPerHourLuton,
      setPorterPerHour,
      updateCost,
      getCostsFromRails
    } = this.props.actions.accountActions;
    var {
      signUpClick,
      signUploginEmail,
      signUploginPassword,
      signUpPasswordConfirm
    } = this.props.actions.signUpActions;

    return (
      <div>
        <Button
          bsSize="small"
          bsStyle="success"
          onClick={() => this.setState({ open0: !this.state.open0 })}
        >
          Click To Add/Edit Employee
        </Button>
        <Collapse in={this.state.open0}>
          <div>
            <Well>
              <AddEmployee
                signUpClick={signUpClick}
                signUploginEmail={signUploginEmail}
                signUploginPassword={signUploginPassword}
                signUpPasswordConfirm={signUpPasswordConfirm}
                getUsers={getUsers}
              />
            </Well>
          </div>
        </Collapse>

        <Button
          bsSize="small"
          bsStyle="success"
          onClick={() => this.setState({ open: !this.state.open })}
        >
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
                getUsers={getUsers}
              />
            </Well>
          </div>
        </Collapse>

        <Button
          bsSize="small"
          bsStyle="success"
          onClick={() => this.setState({ open1: !this.state.open1 })}
        >
          View Users
        </Button>
        <Collapse in={this.state.open1}>
          <div>
            <Well>
              <UserList
                updateAdmin={updateAdmin}
                users={this.props.accountManagement.users}
                currentUser={this.props.login.currentUser}
                deleteUser={deleteUser}
              />
            </Well>
          </div>
        </Collapse>

        <Button
          bsSize="small"
          bsStyle="success"
          onClick={() => this.setState({ open2: !this.state.open2 })}
        >
          Enter Costs
        </Button>

        <Collapse in={this.state.open2}>
          <div>
            <Well>
              <EnterCosts
                costs={this.props.accountManagement.costs}
                updateCost={updateCost}
                setFuelPerMile18t={setFuelPerMile18t}
                setFuelPerMile9t={setFuelPerMile9t}
                setFuelPerMileLuton={setFuelPerMileLuton}
                setDriverPerHour18t={setDriverPerHour18t}
                setDriverPerHour9t={setDriverPerHour9t}
                setDriverPerHourLuton={setDriverPerHourLuton}
                setPorterPerHour={setPorterPerHour}
                getCostsFromRails={getCostsFromRails}
                fuel_per_mile_18t={
                  this.props.accountManagement.fuel_per_mile_18t
                }
                fuel_per_mile_9t={this.props.accountManagement.fuel_per_mile_9t}
                fuel_per_mile_luton={
                  this.props.accountManagement.fuel_per_mile_luton
                }
                driver_per_hour_18t={
                  this.props.accountManagement.driver_per_hour_18t
                }
                driver_per_hour_9t={
                  this.props.accountManagement.driver_per_hour_9t
                }
                driver_per_hour_luton={
                  this.props.accountManagement.driver_per_hour_luton
                }
                porter_per_hour={this.props.accountManagement.porter_per_hour}
              />
            </Well>
          </div>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountManagement: state.account_management,
  signUp: state.signUp,
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  actions: {
    accountActions: bindActionCreators(accountManagementActions, dispatch),
    signUpActions: bindActionCreators(signUpActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);
