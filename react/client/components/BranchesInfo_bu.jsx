import React from "react"
import * as commonActions from "../actions/_common_actions"
import BranchSection from "./BranchSection.jsx"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { MapObject, mapObjectInstances } from "../models/mapObject"
import { withRouter } from "react-router"

class BranchesInfo extends React.Component {
  constructor(props) {
    super(props)
  }


  handleImageClick(event) {
    event.preventDefault()
    alert("get photo")
  }




  getEmployeeTable(branchId) {
    if (!this.props.all_employees) return
    if (!this.props.all_branches) return
    ////////////////////////////////////////////
    var pictureOrButton
    var pictureSize = {
      height: "auto",
      width: "auto",
      maxWidth: "70px",
      maxHeight: "70px"
    }

    return this.props.all_employees.map((employee, index) => {
      if (employee.branch_id == branchId) {
        pictureOrButton = employee.photoUrl ? (
          <img style={pictureSize} src={employee.photoUrl} />
        ) : (
          <button id={employee.id} onClick={this.handleImageClick.bind(this)}>
            Upload Picture
          </button>
        )
        return (
          <div className="employee-row" key={employee.id}>
            <div className="employee-cell">{pictureOrButton}</div>
            <div className="employee-cell">{employee.name}</div>
            <div className="employee-cell">{employee.email}</div>
            <div className="employee-cell">{employee.telephone}</div>
          </div>
        )
      }
    })
  }

  // getEmployeeBranch(branch_id){
  //   var branchCode
  //   this.props.all_branches.forEach((branch)=>{
  //       if(branch.id==branch_id) branchCode=branch.branch_code
  //   })
  //   return branchCode
  // }

  branchlist() {
    if (!this.props.all_branches) return
    //////////////////////////////////
    //////order all_branches here, to but main branch to the top
    return this.props.all_branches.map(branch => {
      return (
        <BranchSection title={branch.name} id={branch.id} key={branch.id}>
          {this.getEmployeeTable(branch.id)}
        </BranchSection>
      )
    })
  }

  render() {
    return (
      <div id="branch-list-top" className="branch-info-table">
        <div className="branch-header-row">
          <div className="branch-header-cell">Photo</div>
          <div className="branch-header-cell">Name</div>
          <div className="branch-header-cell">email</div>
          <div className="branch-header-cell">Phone No.</div>
        </div>
        <div className="branch-body">{this.branchlist.call(this)}</div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps = state => ({
  all_employees: state.common.all_employees,
  all_branches: state.common.all_branches
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BranchesInfo)
)
