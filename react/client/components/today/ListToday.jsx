import React from "react"
import * as todayActions from "../../actions/today_actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { mapObjectInstances } from "../../models/mapObject"
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'
import loadingGIF from '../../build/images/loading.svg'
import Trip from '../../models/trip'

class ListToday extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapObject: null
    }
  }

  componentDidMount() {
    this.setState({ mapObject: mapObjectInstances.today })
  }

  componentDidUpdate() {
    if (!this.state.mapObject) {
      this.setState({
        mapObject: mapObjectInstances.today
      })
    }
  }

  // jobs2() {
  //   if (this.state.mapObject) {
  //     var toDisplay = this.getTable()
  //     return toDisplay
  //   }
  // }

  // getTable() {
  //   var relevant_array
  //   if(this.props.today_closest.length){
  //     relevant_array = this.props.today_closest
  //   }else{
  //     relevant_array = this.props.today_trips
  //   }
    
  //   if (!this.props.current_today_truckflicker_job) {
  //     mapObjectInstances.today.displayArrayOfJobRoutes(relevant_array)
  //   }

  //   return relevant_array.map((job, index) => {
  //     if (index == this.props.all_trips.length - 1)
  //       mapObjectInstances.today.initialRoutesRendered = true

  //     var truckFlickerJob = ""
  //     var collapseStyle = job.hidden ? { display: "none" } : {}
  //     if (job.id === this.props.current_today_truckflicker_job.id) {
  //       truckFlickerJob = "truckFlickerJob"
  //     }
  //     return (
  //       <tr key={job.id} style={collapseStyle} className={truckFlickerJob}>
  //         <td> {job.moveware_code}</td>
  //         <td>{job.client_name}</td>
  //         <td>Colour</td>
  //         <td>Spare Capacity</td>
  //         <td>{job.men_requested}</td>
  //         <td>view notes click here?</td>
  //         <td>Truck Type</td>
  //       </tr>
  //     )
  //   })
  // }

  // getInitalTable(){
  //   var relevant_array
  //   if(this.props.today_closest.length){
  //     relevant_array = this.props.today_closest
  //   }else{
  //     relevant_array = this.props.today_trips
  //   }
    
  //   if (!this.props.current_today_truckflicker_job) {
  //     mapObjectInstances.today.displayArrayOfJobRoutes(relevant_array)
  //   }

  //   this.getInitialTableColumns()
  // }

  getInitialTableColumns(){
    var branches
    if (this.props.all_branches){
      branches = this.getBranchesAsOptions.call(this)
    }else{
      branches = []
    }
    return [
    {
      Header: 'Moveware No.',
      accessor: 'moveware_code'
    },
    {
      Header: 'Branch',
      accessor: 'branch',
      Filter: ({filter, onChange}) => (
        <select
        onChange={event => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
        >
       
        {branches}
        </select>
        )
    }
    ]
  }

  getInitialTableData(){
    // if(!this.state.mapObject) return

    var relevant_array
    if(this.props.today_closest.length){
      relevant_array = this.props.today_closest
    }else{
      relevant_array = this.props.today_trips
    }
    // if (!this.props.current_today_truckflicker_job) {
    //   mapObjectInstances.today.displayArrayOfJobRoutes(relevant_array)
    // }
    var data = []
    relevant_array.forEach((trip)=>{
      data.push({
        moveware_code: trip.moveware_code,
        branch: trip.branch_code,
        id: trip.id
      })
    })
    return data
  }

  filterMethod(filter, row) {
    this.state.mapObject.clearMap()
    var haystack = String(row[filter.id])
    var needle = filter.value
    if (needle == 'All_Branches'){
      return true
    }else{
      return haystack.toUpperCase().indexOf(needle.toUpperCase()) >= 0
    }  
  }

 getBranchesAsOptions() {
   
     var options = []
     options.push(
       <option value={"All_Branches"} key={"today_all_branches"}>
         All_Branches
       </option>
     )
     this.props.all_branches.forEach((branch, i) => {
       options.push(
         <option value={branch.branch_code} key={branch.id}>
           {branch.branch_code}
         </option>
       )
     })

     return options

 }

 

  render() {
    if(!this.state.mapObject) return <div></div>

    console.log('called how many times?')
    return (
      <div className="grid-item-list-today">
       <ReactTable

       getTrProps={(state, rowInfo, column) => {
        console.log('rowInfo',rowInfo)
        if(!rowInfo) return {}
          if(!this.props.current_today_truckflicker_job){
            this.state.mapObject.drawRouteWithGoogleResponse(Trip.getTripById(rowInfo.original.id))
          }
            
           return {
             style: {
               color: rowInfo.row.branch == 'AVI' ? 'red' : null
             }
           }
         }}
       filterable
       style={{ height: '90vh' }}
       collapseOnDataChange={false}
       data={this.getInitialTableData.call(this)}
       defaultPageSize={10}
       columns={this.getInitialTableColumns.call(this)}
       className="-striped -highlight"
       defaultFilterMethod={this.filterMethod.bind(this)}
       />

      </div>
    )
  }
}

// <table>
  // <tbody>
    // <tr>
      // <th>Moveware Code </th>
      // <th>Client Name </th>
      // <th>Colour </th>
      // <th>Spare Capacity</th>
      // <th>Men Requested </th>
      // <th>Notes</th>
      // <th>Truck Type</th>
    // </tr>
    // {this.jobs2()}
  // </tbody>
// </table>

const mapDispatchToProps = dispatch => ({
  actions: {
    today_actions: bindActionCreators(todayActions, dispatch)
  }
})

const mapStateToProps = state => ({
  all_branches: state.common.all_branches,
  today_closest: state.today.today_closest,
  all_trips: state.common.all_trips,
  today_trips: state.today.today_trips,
  current_today_truckflicker_job: state.common.current_today_truckflicker_job
})

export default connect(mapStateToProps, mapDispatchToProps)(ListToday)
