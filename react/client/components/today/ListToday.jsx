import React from "react"
import * as todayActions from "../../actions/today_actions"
import * as commonActions from "../../actions/_common_actions"
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
      mapObject: null,
      relevant_array: []
    }
    this.relevant_array = []
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

  // componentWillReceiveProps(nextProps){
  //   if (!this.state.mapObject) {
  //     this.setState({
  //       mapObject: mapObjectInstances.today
  //     })
  //   }
  //   if(this.props != nextProps  && this.state.mapObject){
  //     this.state.mapObject.clearMap()
  //   }
    
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
      Header: 'Mware No.',
      accessor: 'moveware_code',
      maxWidth: 75
    },
    {
      Header: 'Branch',
      accessor: 'branch',
      maxWidth: 75,
      Filter: ({filter, onChange}) => (
        <select
        onChange={event => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
        >
       
        {branches}
        </select>
        )
    },
    {
      Header: 'Client',
      accessor: 'client_name',
      maxWidth: 150
    },
    {
      Header: 'Colour',
      filterable: false,
      maxWidth: 60,
      Cell: row => {
        console.log('row cell...........', row)
            return    (<div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: row.original.colour,
                          borderRadius: '2px'
                        }}
                      >
                                   
                     </div>)
                }
    }
    ]
  }

  // <div
  //   style={{
  //     width: `${row.value}%`,
  //     height: '100%',
  //     backgroundColor: row.value > 66 ? '#85cc00'
  //       : row.value > 33 ? '#ffbf00'
  //       : '#ff2e00',
  //     borderRadius: '2px',
  //     transition: 'all .2s ease-out'
  //   }}
  // />

  displayRoutes(trip){
    if (!this.props.current_today_truckflicker_job) {
    // this.state.mapObject.displayArrayOfJobRoutes(this.relevant_array)
    this.state.mapObject.drawRouteWithGoogleResponse(trip)
  }else{
    console.log('truck flicker...')
  }
  }

  getInitialTableData(){
    // if(!this.state.mapObject) return

    if(this.props.today_closest.length){
      this.relevant_array = this.props.today_closest
    }else{
      this.relevant_array = this.props.today_trips
    }
    // if (!this.props.current_today_truckflicker_job) {
    //   this.state.mapObject.displayArrayOfJobRoutes(this.relevant_array)
    // }
    var data = []
    this.relevant_array.forEach((trip)=>{
      data.push({
        moveware_code: trip.moveware_code,
        branch: trip.branch_code,
        id: trip.id,
        client_name: trip.client_name,
        colour: trip.colour
      })
    })
    return data
  }

  filterMethod(filter, row) {
    // if(row._index%10==0){
    //   this.state.mapObject.clearMap()
    // }
    // if(this.props.current_today_truckflicker_job){
    //   this.props.actions.common_actions.clearCurrentTruckFlickerJob('today')
    // }
    
    console.log('row in filter', row)
    var haystack = String(row[filter.id])
    var needle = filter.value
    var bool 
    if (needle == 'All_Branches'){
      bool = true
    }else{
      bool = haystack.toUpperCase().indexOf(needle.toUpperCase()) >= 0
    } 
    Trip.hideOrShowById(row._original.id, 'today', !bool)
    return bool 
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
        if(!rowInfo) return {}
          var trip = Trip.getTripById(rowInfo.original.id)
        this.displayRoutes(trip)
           return {
             style: {
               color: rowInfo.original.id == this.props.current_today_truckflicker_job.id ? 'red' : null,
               border: rowInfo.original.colour
             },
             onClick: (e, handleOriginal) => {
           var trip = Trip.getTripById(rowInfo.original.id)
           this.props.actions.common_actions.setCurrentTruckFlickerJob(trip, 'today')
           this.state.mapObject.clearMap()
           this.state.mapObject.drawRouteWithGoogleResponse(trip)
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
       onFilteredChange={(column, value) => {this.props.actions.common_actions.clearCurrentTruckFlickerJob('today')
         this.state.mapObject.displayArrayOfJobRoutes(this.relevant_array)
     }}
       />

      </div>
    )
    
  }
}

// getTdProps= {(state, rowInfo, column) => {
//  if(!rowInfo) return {}
//           console.log('state, rowInfo, column', state, rowInfo, column)
//           return { style:{
//             background: rowInfo.original.colour
//           }}
//        }}

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
    today_actions: bindActionCreators(todayActions, dispatch),
    common_actions: bindActionCreators(commonActions, dispatch)
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
