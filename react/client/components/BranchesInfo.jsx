import React from 'react'
import * as commonActions from '../actions/_common_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {MapObject, mapObjectInstances} from '../models/mapObject'
import {withRouter} from 'react-router'

class BranchesInfo extends React.Component{
  constructor(props){
    super(props)
  }

  handleImageClick(event){
    event.preventDefault()
    alert('get photo')
  }

  getEmployeeTable(){
    if(!this.props.all_employees) return
    if(!this.props.all_branches) return
      var pictureOrButton
    var pictureSize = {
    height: 'auto', 
    width: 'auto', 
    maxWidth: '70px', 
    maxHeight: '70px',
}
    return this.props.all_employees.map((employee, index)=>{
      
     pictureOrButton = employee.photoUrl ? <img style={pictureSize} src={employee.photoUrl}></img> : <button id={employee.id} onClick={this.handleImageClick.bind(this)}>Upload Picture</button>
      return(
       
        <tr key={employee.id}>
        <td>{this.getEmployeeBranch(employee.branch_id)}</td>
        <td>{pictureOrButton}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.telephone}</td>
        </tr>)
    })
  }

  getEmployeeBranch(branch_id){
    var branchCode 
    this.props.all_branches.forEach((branch)=>{
        if(branch.id==branch_id) branchCode=branch.branch_code
    })
    return branchCode
  }

  setMapObject(){
    var mapObjects = {
      planner: mapObjectInstances.planner,
      partload: mapObjectInstances.partload,
      today: mapObjectInstances.today
    }
    this.mapObject = mapObjects[this.props.location.pathname.slice(1)]
  }

  render(){
   
    return(
      <div className= 'branch-info-table' >
      <table >
      <tbody>
      <tr>
      <td>Branch</td>
      <td>Photo</td>
      <td>Name</td>
      <td>email</td>
      <td>Phone No.</td>
      </tr>
    {this.getEmployeeTable.call(this)}
    </tbody>
    </table>
      </div>
      )
  }
}

const mapDispatchToProps=(dispatch)=>({
  actions:{
    common_actions: bindActionCreators(commonActions, dispatch)
  } 
})

const mapStateToProps=(state)=>({
  all_employees: state.common.all_employees, 
  all_branches: state.common.all_branches
  // all_branches: state.common.all_branches, 
 })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BranchesInfo))