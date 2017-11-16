import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'
import * as partloadActions from '../../actions/partload_actions'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Diversion from '../../models/diversion'
import Trip from '../../models/trip'
import loadingGIF from '../../build/images/loading.svg'
import { mapObjectInstances } from '../../models/mapObject'

class RosCandidateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      requested_trip_id: null
    }
  }

  componentDidMount() {
    if (!this.mapObject) {
      this.mapObject = mapObjectInstances.removal_from_store
    }
  }

  handleRosSolutionClick(e) {
    e.preventDefault()
    // console.log('diversion id', e.target.id)
    // alert(diversion_id)
  }

  

  handleUndivertedClick(diversion) {
    this.mapObject.drawRouteWithGoogleResponse(diversion.undiverted_job)
  }

  handleDivertedClick(diversion) {
    this.mapObject.drawDivertedRoute(
      diversion.reRouted_g_directions,
      diversion.undiverted_job
    )
  }

  handleDeliveryClick(diversion) {
    console.log(
      'g_dir_from_new_branch_to_storage_delivery',
      diversion.g_dir_from_new_branch_to_storage_delivery
    )
  }

  get_rt_columns() {
    return [
      {
        Header: 'Moveware No.',
        accessor: 'moveware_code'
      },
      {
        Header: 'Map it',
        accessor: 'map_checkbox',
        filterable: false
      },
      {
        Header: 'Max Saving',
        accessor: 'max_saving'
      },

      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Branch',
        accessor: 'branch',
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}
          >
            <option value="ALL BRANCHES">Show All</option>
            <option value="ALT">ALT</option>
            <option value="AVI">AVI</option>
            <option value="EDI">EDI</option>
            <option value="GLA">GLA</option>
            <option value="LNW">LNW</option>
            <option value="LSW">LSW</option>
            <option value="PER">PER</option>
            <option value="SHE">SHE</option>
          </select>
        )
      },

      {
        Header: 'Vol',
        accessor: 'volume'
      },
      {
        Header: 'delivery',
        accessor: 'delivery_postcode'
      },
      {
        Header: 'Date',
        accessor: 'date'
      },
      {
        Header: 'Days from now',
        accessor: 'days_from_now'
      }
    ]
  }

  get_rt_subcomponent_columns() {
    return [
      {
        Header: 'View Undiverted Job',
        accessor: 'undiverted'
      },
      {
        Header: 'View Diverted Job',
        accessor: 'xfer'
      },
      {
        Header: 'View Delivery',
        accessor: 'delivery'
      },
      {
        Header: 'Total Saving',
        accessor: 'total_saving'
      },
      {
        Header: 'Branches Involved',
        accessor: 'branches_involved'
      },
      {
        Header: 'Moveware No.',
        accessor: 'moveware_code'
      },
      {
        Header: 'Date of uplift',
        accessor: 'uplift_date'
      },
      {
        Header: 'Distance Saved',
        accessor: 'distance_saved'
      }
    ]
  }

  // <button onClick={this.handleUndivertedClick.bind(this, diversion)}>
  //   Undiverted
  // </button>

  format_sub_component_data(diversions) {
    var formatted_data = []
    diversions = diversions.sort((a, b) => {
      return b.distance_saved - a.distance_saved
    })
    diversions.forEach(diversion => {
      var date = moment(diversion.undiverted_job.dateMilli)
      var formatted_uplift_date = date.format('ddd Do MMM YY')
      var branches_involved_string = diversion.single_trip_solution
        ? `${diversion.undiverted_job.branch_code}`
        : `${diversion.undiverted_job.branch_code}, ${diversion.optimal_branch
            .branch_code}`
      formatted_data.push({
        id: diversion.id,
        undiverted: this.getCheckbox(diversion.undiverted_job, this.handleMapCheckBoxChecked),
        
        xfer: this.getCheckbox(diversion, this.handleDivertedRouteChecked),
        delivery: (
          <button onClick={this.handleDeliveryClick.bind(this, diversion)}>
            Delivery
          </button>
        ),
        total_saving: `£${diversion.total_saving}`,
        branches_involved: branches_involved_string,
        moveware_code: diversion.undiverted_job.moveware_code,
        uplift_date: formatted_uplift_date,
        distance_saved: `${Math.ceil(
          diversion.distance_saved * 0.000621371
        )} Miles`,
        multi_branch: !diversion.single_trip_solution,
        view_solution_button: (
          <button
            id={diversion.id}
            onClick={this.handleRosSolutionClick.bind(this)}
          >
            View Solution
          </button>
        )
      })
    })
    console.log('formatted data', formatted_data)
    return formatted_data
  }

  // handleUndivertedCheckBoxChecked(diversion) {
  //   var isChecked = document.getElementById(diversion).checked
  // }

  handleMapCheckBoxChecked(trip) {
    console.log('e', trip.id)
    var isChecked = document.getElementById(trip.id).checked
    console.log('ISCHECKED', isChecked)
    var haveRouteAlready = this.mapObject.isRouteDisplaySaved(trip.id)

    if (this.props.ids_of_trips.includes(+trip.id)) {
      if (!isChecked) {
        this.mapObject.hideRouteById(trip.id)
      } else {
        if (haveRouteAlready) {
          this.mapObject.showRouteById(trip.id)
        } else {
          var trip = Trip.getTripById(trip.id)
          this.mapObject.drawRouteWithGoogleResponse(trip)
        }
      }
    } else {
      this.props.actions.partload_actions.getTripByIdFromRails(trip.id)
    }
  }

  handleDivertedRouteChecked(diversion){
    var isChecked = document.getElementById(diversion.id).checked
    var haveRouteAlready = this.mapObject.isRouteDisplaySaved(diversion.id)

    if(!isChecked){
      this.mapObject.hideRouteById(diversion.id)
    }else{
      if(haveRouteAlready){
        this.mapObject.showRouteById(diversion.id)
      }else{
        this.mapObject.drawDiversionRoute(diversion.reRouted_g_directions, diversion)
      }
     
    }
  }

  getCheckbox(params, onChangeFunction) {
    return (
      <input
        type="checkbox"
        id={params.id}
        onChange={onChangeFunction.bind(this, params)}
      />
    )
  }

  format_data() {
    var data = []

    this.props.ros_candidates.forEach(trip => {
      var formatted_date = moment(trip.dateMilli).format('ddd Do MMM YY')
      var today = moment().startOf('day')
      var max_saving
      if (this.props.ros_requested_ids.includes(trip.id)) {
        var max_saving_meters = Math.max.apply(
          Math,
          Diversion.find_diversions_for_ros_suggestion(
            trip.id
          ).map(diversion => {
            return diversion.distance_saved
          })
        )
        max_saving = `${Math.ceil(max_saving_meters * 0.000621371)} Miles`
      } else {
        max_saving = 'Not Calculated'
      }

      var data_item = {
        map_checkbox: this.getCheckbox(trip, this.handleMapCheckBoxChecked),
        dateMilli: trip.dateMilli,
        max_saving,
        id: trip.id,
        moveware_code: trip.moveware_code,
        name: trip.client_name,
        branch: trip.branch_code,
        volume: trip.volume,
        delivery_postcode: trip.delivery_postcode,
        date: formatted_date,
        days_from_now: moment(trip.dateMilli).from(today)
      }
      data.push(data_item)
    })
    return data
  }

  compose_move_explanation(diversion_id) {
    var diversion = Diversion.get_diversion_by_id(diversion_id)
    var undiverted_trip_departure_date = moment(
      diversion.undiverted_job.dateMilli
    ).format('ddd Do MMM YY')
    var delivery_date = moment(diversion.out_of_store_job.dateMilli).format(
      'ddd Do MMM YY'
    )
    var move_explanation
    //////////////
    if (diversion.single_trip_solution) {
      move_explanation = (
        <ol>
          <li>{`Moveware Job Number ${diversion.undiverted_job
            .moveware_code} departs ${diversion.undiverted_job
            .branch_code} ${undiverted_trip_departure_date}. `}</li>
          <li>{`After delivering goods to ${diversion.undiverted_job
            .client_name} at ${diversion.undiverted_job
            .delivery_postcode} this truck now continues to ${diversion
            .out_of_store_job.branch_code} Branch`}</li>
          <li>{`${diversion.out_of_store_job.volume} cuft of ${diversion
            .out_of_store_job
            .client_name}'s stored goods are collected in crates.`}</li>
          <li>{`The truck now returns home to ${diversion.undiverted_job
            .branch_code}.`}</li>
          <li
          >{`On ${delivery_date} the goods are delivered to the client at ${diversion
            .out_of_store_job.delivery_postcode}`}</li>
        </ol>
      )
    } else {
      move_explanation = (
        <ol>
          <li>{`Moveware Job Number ${diversion.undiverted_job
            .moveware_code} departs ${diversion.undiverted_job
            .branch_code} ${undiverted_trip_departure_date}. `}</li>
          <li>{`After delivering goods to ${diversion.undiverted_job
            .client_name} at ${diversion.undiverted_job
            .delivery_postcode} this truck now continues to ${diversion
            .out_of_store_job.branch_code} Branch`}</li>
          <li>{`${diversion.out_of_store_job.volume} cuft of ${diversion
            .out_of_store_job
            .client_name}'s stored goods are collected in crates.`}</li>
          <li>{`The truck now delivers these crates to ${diversion
            .optimal_branch
            .branch_code} Branch where the goods are now stored awaiting delivery. `}</li>
          <li>{`On ${delivery_date} ${diversion.optimal_branch
            .branch_code} delivers the goods to the client at ${diversion
            .out_of_store_job.delivery_postcode}.`}</li>
        </ol>
      )
    }

    return move_explanation
  }

  filterMethod(filter, row) {
    var haystack = String(row[filter.id])
    var needle = filter.value
    if (needle == 'ALL BRANCHES') return true
    return haystack.toUpperCase().indexOf(needle.toUpperCase()) >= 0
  }

  getSubComponent1(row) {
    var subComponent1
    var sub_component_data
    console.log('row', row)
    if (this.props.ros_requested_ids.includes(row.original.id)) {
      var diversions = Diversion.find_diversions_for_ros_suggestion(
        row.original.id
      )
      console.log('diversions', diversions)

      // this.mapObject.clearMap()
      // this.mapObject.drawRouteWithGoogleResponse(diversions[0].out_of_store_job)
      sub_component_data = this.format_sub_component_data.call(this, diversions)
      console.log('sub_component_data', sub_component_data)
      subComponent1 = (
        <ReactTable
          noDataText="No Suggestions Found"
          data={sub_component_data}
          defaultPageSize={4}
          showPagination={false}
          columns={this.get_rt_subcomponent_columns.call(this)}
          SubComponent={row => {
            var explanation_list = this.compose_move_explanation.call(
              this,
              row.original.id
            )
            // var sub_sub_table = this.get_sub_sub_table(row.original.id)
            console.log('row in explanation', row)
            return <div>{explanation_list}</div>
          }}
        />
      )
    } else {
      this.props.actions.partload_actions.getTripByIdFromRails(row.original.id)
      this.props.actions.partload_actions.removal_from_store_suggestions_request(
        row.original.id,
        row.original.dateMilli
      )
      subComponent1 = (
        <div>
          <em>Please Wait while we crunch some numbers</em>
          <img src={loadingGIF} />
          <br />
          <br />
        </div>
      )
    }
    return subComponent1
  }

  render() {
    const { data } = this.state
    return (
      <div className="new-table">
        <ReactTable
          filterable
          style={{ height: '90vh' }}
          collapseOnDataChange={false}
          data={this.format_data.call(this)}
          defaultPageSize={10}
          columns={this.get_rt_columns()}
          className="-striped -highlight"
          defaultFilterMethod={this.filterMethod.bind(this)}
          SubComponent={row => {
            var subComponent1 = this.getSubComponent1.call(this, row)
            return <div style={{ padding: '20px' }}>{subComponent1}</div>
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    partload_actions: bindActionCreators(partloadActions, dispatch)
    // common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps = state => ({
  ids_of_trips: state.common.ids_of_trips,
  ros_candidates: state.common.ros_candidates,
  removal_from_store_suggestion_array:
    state.partload.removal_from_store_suggestion_array,
  ros_requested_ids: state.partload.ros_requested_ids
})

export default connect(mapStateToProps, mapDispatchToProps)(RosCandidateList)
