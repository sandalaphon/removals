import React from 'react'
import ReactTable from "react-table"
import "react-table/react-table.css"
import {connect} from 'react-redux'
import * as partloadActions from '../../actions/partload_actions'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import Diversion from '../../models/diversion'

class RosCandidateList extends React.Component{

  constructor(props){
    super(props)
    this.state={
      requested_trip_id: null
    }
  }

  handleFindOptimalRoutesClick(e){
    e.preventDefault()
    console.log('e', e.target.value, e.target)
    this.setState({requested_trip_id: e.target.id})
    this.props.actions.partload_actions.removal_from_store_suggestions_request(e.target.id, e.target.value)
  }

create_table_sub_component(){

}

format_data(){
  var data = []
  this.props.ros_candidates.forEach((trip)=>{
    var formatted_date = moment(trip.dateMilli).format('ddd Do MMM YY')
    var today = moment().startOf('day')
    var data_item = {
            dateMilli: trip.dateMilli,
            id: trip.id,
            moveware_code: trip.moveware_code,
            name: trip.client_name,
            branch: trip.branch_code,
            find: (<button id = {trip.id} value = {trip.dateMilli} onClick = {this.handleFindOptimalRoutesClick.bind(this)}>Find</button>),
            volume: trip.volume,
            delivery_postcode: trip.delivery_postcode,
            date: formatted_date,
            days_from_now: moment(trip.dateMilli).from(today)
                                  }
        data.push(data_item)
  })
  return data
}

get_ros_result_data_array(requested_trip_id, requested_trip_dateMilli){
  console.log('requested id then dateMilli', requested_trip_id)
  if(this.props.ros_requested_ids.includes(requested_trip_id)){
    var diversions = Diversion.find_diversions_for_ros_suggestion(requested_trip_id)
    console.log('diversions!!!!!', diversions)
    return []
  }else{
    this.props.actions.partload_actions.removal_from_store_suggestions_request(requested_trip_id, requested_trip_dateMilli)
    return []
  }
  
}

  render() {

    // if(this.props.removal_from_store_suggestion_array.length){
    //   console.log('diversions here!', Diversion.find_diversions_for_ros_suggestion(this.state.requested_trip_id))
    //   this.create_table_sub_component()
    // }
    const { data } = this.state;
    return (
      <div className='new-table'>
        <ReactTable
        columns={[

          {
            Header: "Moveware No.",
            accessor: "moveware_code"
          },
          
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Branch",
                accessor: "branch"
              },
              {
                Header: "Find Optimal",
                accessor: "find"
              },
              {
                Header: "Vol",
                accessor: "volume"
              },
              {
                Header: "delivery",
                accessor: 'delivery_postcode'
              },
              {
                Header: "Date",
                accessor: "date"
              },
              {
                Header: "Days from now",
                accessor: "days_from_now"
              }
        
        
          
        ]}
        filterable
        defaultFilterMethod={
          (filter, row) => {
            var haystack = String(row[filter.id])
            var needle   = filter.value
          return haystack.toUpperCase().indexOf(needle.toUpperCase())>=0
          }
        }
        data={this.format_data.call(this)}
        defaultPageSize={10}
        className="-striped -highlight"
        ////////////////////////////////////////////
        SubComponent={row => {
          console.log('row', row)
          if(this.props.ros_requested_ids.includes(row.original.id)){
            var diversions = Diversion.find_diversions_for_ros_suggestion(row.original.id)
            console.log('diversions in SubComponent', diversions)
          }else{
            this.props.actions.partload_actions.removal_from_store_suggestions_request(row.original.id, row.original.dateMilli)
          }
                   return (
                     <div style={{ padding: "20px" }}>
                       <em>
                         You can put any component you want here, even another React
                         Table!
                       </em>
                       <br />
                       <br />
                       <ReactTable
                         noDataText = 'no results yet'
                         data={[]}//this.get_ros_result_data_array.call(this, row.original.id, row.original.dateMilli)
                         columns={[

          {
            Header: "Moveware No.",
            accessor: "moveware_code"
          }
          ]}
                         defaultPageSize={4}
                         showPagination={false}
                         />
                       </div>
                           );
                         }}
                       
        ////////////////////////////////////////////
         
          
         
        />

      </div>
    );
  }
}


const mapDispatchToProps=(dispatch)=>({
  actions: {
    partload_actions: bindActionCreators(partloadActions, dispatch),
    // common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps=(state)=>({
  ros_candidates: state.common.ros_candidates,
  removal_from_store_suggestion_array: state.partload.removal_from_store_suggestion_array,
  ros_requested_ids: state.partload.ros_requested_ids


})




export default connect(mapStateToProps, mapDispatchToProps)(RosCandidateList)