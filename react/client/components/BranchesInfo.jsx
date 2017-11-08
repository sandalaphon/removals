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
      rowStatus: {}
    }
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






  render() {
    var data = []
    if(this.props.all_branches){
      data  = this.props.all_branches;
    }
    console.log(this.props.all_branches)
    
    const  columns = [{Header: 'Branches', accessor: 'name'}];
    
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
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          showPagination={false}
          expanded={this.state.rowStatus}

          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                          
                <ReactTable
                  isExpanded = {true}
                  data={data}
                  columns={columns}
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
