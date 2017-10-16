import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddEmployee extends React.Component {
  handleAddEmployeeClick(event) {
    event.preventDefault();
    console.log(event.value);
  }

  render() {
    return (
      <div>
        <h3>Please Enter New Employee Details </h3>
        <form ref="commentForm">
          <input
            type="text"
            className="new_employee_email"
            placeholder="email"
            // onChange    = {this.handleEmployeeSignUpEmail.bind(this)}
          />
          <input
            type="text"
            className="new_employee_name"
            placeholder="Employee Name"
            // onChange    = {this.handleChangeEmployeeName.bind(this)}
          />
          <input
            type="text"
            className="new_employee_job_title"
            placeholder="Job Title"
            // onChange    = {this.handleChangeJobTitle.bind(this)}
          />
          <br />
          <input
            type="radio"
            className="branch_radio"
            name="branch"
            value="Inverness"
          />Inverness Branch<br />
          <input
            type="radio"
            className="branch_radio"
            name="branch"
            value="Edinburgh"
          />Edinburgh Branch<br />
          <input
            type="radio"
            className="branch_checkbox"
            name="branch"
            value="Glasgow"
          />Glasgow Branch<br />
          <input
            type="submit"
            className="add_employee_button"
            value="Add Employee"
            onClick={this.handleAddEmployeeClick.bind(this)}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // accountManagement: state.account_management,
  // signUp: state.signUp,
  // login: state.login
});

const mapDispatchToProps = dispatch => ({
  actions: {
    // accountActions: bindActionCreators(accountManagementActions, dispatch),
    // signUpActions: bindActionCreators(signUpActions,dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);
