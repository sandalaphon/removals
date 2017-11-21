import React from "react"
import * as commonActions from "../actions/_common_actions"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { MapObject, mapObjectInstances } from "../models/mapObject"
import { withRouter } from "react-router"

import ReactTable from 'react-table'
import 'react-table/react-table.css'

class BranchesInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rowStatus: {},
      picOpen: false,
      currentPicId: null
    }
    this.handleOutsidePicClick = this.handleOutsidePicClick.bind(this)
  }

  openRow(viewIndex){
    var obj = this.state.rowStatus
    if (obj[viewIndex] == true){
      obj[viewIndex] = false
      this.setState({rowStatus:obj})
    }else{
      obj[viewIndex] = true
      this.setState({rowStatus:obj})
    }
  }


  handleImageClick(id){

    var pic = document.getElementById(id)
    var picHolder = document.getElementById(`holder${id}`)
    

    if(this.state.picOpen){
      document.removeEventListener('click',this.handleOutsidePicClick)
      pic.classList.toggle('employee-pic-large');
      picHolder.classList.toggle('employee-pic-holder-large')
     
      this.setState({picOpen : false})

    }else{
      document.addEventListener('click',this.handleOutsidePicClick)
      pic.classList.toggle('employee-pic-large');
      picHolder.classList.toggle('employee-pic-holder-large')
      
      this.setState({currentPicId: id})
      this.setState({picOpen : true})
    }

  }

  handleOutsidePicClick(e){
    var picHolder = document.querySelector(".employee-pic-holder")
    if(e.target != picHolder || !picHolder.contains(e.target)){
      document.removeEventListener('click',this.handleOutsidePicClick)
      var pic = document.getElementById(this.state.currentPicId)
      var picHolder = document.getElementById(`holder${this.state.currentPicId}`)
    
      pic.classList.toggle('employee-pic-large');
      picHolder.classList.toggle('employee-pic-holder-large')
      
      this.setState({picOpen : false})
    }
  }

  render() {
    var branches = []

    if(this.props.all_branches){
      branches  = this.props.all_branches;
    }
    
    const  branchesColumns = [{Header: 'Branches', accessor: 'name'}];

    const  employeesColumns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Photo',
        accessor: 'photo'
        
      },
      {
        Header: 'Code',
        accessor: 'moveware_employee_code'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Phone',
        accessor: 'telephone'
      }
      ];
    
    return (
      <div>
        <ReactTable
          getTrProps={(state, rowInfo, column,instance) => {
            return {
              onClick: (e, handleOriginal) => {
                var viewIndex = rowInfo.viewIndex
                this.openRow(viewIndex)
                }
              }
          }}
          data={branches}
          columns={branchesColumns}
          defaultPageSize={10}
          className="-striped -highlight"
          showPagination={false}
          expanded={this.state.rowStatus}

          SubComponent={row => {
            
            var branchId = row.original.id
            var employeesByBranch = []
            this.props.all_employees.forEach((employee)=>{
              if(employee.branch_id == branchId){
                var uniqueId = `${employee.id + employee.name}`
                

                employee.photo = (
                  <div 
                    className="employee-pic-holder"
                    id={`holder${uniqueId}`}
                    onClick={this.handleImageClick.bind(this, uniqueId)}
                  >
                    
                    <img 
                      className="employee-pic" 
                      id={uniqueId} 
                      src={employee.photoUrl} 
                    />
                  </div>
                  )
                employeesByBranch.push(employee)
              }
            })

            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  isExpanded = {true}
                  data={employeesByBranch}
                  columns={employeesColumns}
                  defaultPageSize={3}
                  showPagination={false}
                            
                />
              </div>
            );
          }}
        />
      </div>
    );
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
