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
  conmponentDidUpdate(){
    //handleBranchClick()
  }

  getEmployeeTable(branchId){
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
      if (employee.branch_id==branchId){
        pictureOrButton = employee.photoUrl ? <img style={pictureSize} src={employee.photoUrl}></img> : <button id={employee.id} onClick={this.handleImageClick.bind(this)}>Upload Picture</button>
        
        return(
         
          <tr key={employee.id}>
            
            <td>{pictureOrButton}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.telephone}</td>
          </tr>)
      }  
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

  branchlist() {
    if(!this.props.all_branches) return
    console.log("all the branches",this.props.all_branches)
      return this.props.all_branches.map((branch)=>{
        return (
          <div>
            <button onClick={this.handleBranchClick} className="branch-accordion" id={branch.id}>{branch.name}</button>
            <div className="employee-panel">
              {this.getEmployeeTable(branch.id)}
            </div>
          </div>

        )
      })
      
    
  }
  handleBranchClick(){
    console.log("branch clicked")
    var acc = document.getElementsByClassName("branch-accordion");
    var i;
    console.log(acc)
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }
    }
  }
  // {this.getEmployeeTable.call(this)}

  render(){
    






    return(
      <div className= 'branch-info-table' >
        <table >
        <tbody>
          <tr>
         
          <td>Photo</td>
          <td>Name</td>
          <td>email</td>
          <td>Phone No.</td>
          </tr>
           {this.branchlist.call(this)}
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