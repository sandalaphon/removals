import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import * as partloadActions from "../../actions/partload_actions";
import { bindActionCreators } from "redux";
import moment from "moment";
import Diversion from "../../models/diversion";

class RosCandidateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested_trip_id: null
    };
  }

  handleRosSolutionClick(e) {
    e.preventDefault();
    // console.log('diversion id', e.target.id)
    // alert(diversion_id)
  }

  get_rt_columns() {
    return [
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
        accessor: "branch",
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
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
        Header: "Vol",
        accessor: "volume"
      },
      {
        Header: "delivery",
        accessor: "delivery_postcode"
      },
      {
        Header: "Date",
        accessor: "date"
      },
      {
        Header: "Days from now",
        accessor: "days_from_now"
      }
    ];
  }

  get_rt_subcomponent_columns() {
    return [
      {
        Header: "Click to View",
        accessor: "view_solution_button"
      },
      {
        Header: "Branches Involved",
        accessor: "branches_involved"
      },
      {
        Header: "Moveware No.",
        accessor: "moveware_code"
      },
      {
        Header: "Date of uplift",
        accessor: "uplift_date"
      },
      {
        Header: "Distance Saved",
        accessor: "distance_saved"
      }
    ];
  }

  format_sub_component_data(diversions) {
    var formatted_data = [];
    diversions.forEach(diversion => {
      var date = moment(diversion.undiverted_job.dateMilli);
      var formatted_uplift_date = date.format("ddd Do MMM YY");
      var branches_involved_string = diversion.single_trip_solution
        ? `${diversion.undiverted_job.branch_code}`
        : `${diversion.undiverted_job.branch_code}, ${diversion.optimal_branch
            .branch_code}`;
      formatted_data.push({
        id: diversion.id,
        branches_involved: branches_involved_string,
        moveware_code: diversion.undiverted_job.moveware_code,
        uplift_date: formatted_uplift_date,
        distance_saved: diversion.distance_saved,
        multi_branch: !diversion.single_trip_solution,
        view_solution_button: (
          <button
            id={diversion.id}
            onClick={this.handleRosSolutionClick.bind(this)}
          >
            View Solution
          </button>
        )
      });
    });
    return formatted_data;
  }

  format_data() {
    var data = [];
    this.props.ros_candidates.forEach(trip => {
      var formatted_date = moment(trip.dateMilli).format("ddd Do MMM YY");
      var today = moment().startOf("day");
      var data_item = {
        dateMilli: trip.dateMilli,
        id: trip.id,
        moveware_code: trip.moveware_code,
        name: trip.client_name,
        branch: trip.branch_code,
        volume: trip.volume,
        delivery_postcode: trip.delivery_postcode,
        date: formatted_date,
        days_from_now: moment(trip.dateMilli).from(today)
      };
      data.push(data_item);
    });
    return data;
  }

  compose_move_explanation(diversion_id) {
    var diversion = Diversion.get_diversion_by_id(diversion_id);
    var undiverted_trip_departure_date = moment(
      diversion.undiverted_job.dateMilli
    ).format("ddd Do MMM YY");
    var delivery_date = moment(diversion.out_of_store_job.dateMilli).format(
      "ddd Do MMM YY"
    );
    var move_explanation;
    if (diversion.single_trip_solution) {
      move_explanation = `Moveware Job Number ${diversion.undiverted_job
        .moveware_code} departs ${diversion.undiverted_job
        .branch_code} ${undiverted_trip_departure_date}. 
  After delivering goods to ${diversion.undiverted_job
    .client_name} at ${diversion.undiverted_job
        .delivery_postcode} this truck now continues to ${diversion
        .out_of_store_job.branch_code} Branch where ${diversion.out_of_store_job
        .volume} cuft of ${diversion.out_of_store_job
        .client_name}'s stored goods are collected in crates.
   The truck now returns home to ${diversion.undiverted_job.branch_code}. 
   On ${delivery_date} the goods are delivered to the client at ${diversion
        .out_of_store_job.delivery_postcode}`;
    } else {
      move_explanation = `Moveware Job Number ${diversion.undiverted_job
        .moveware_code} departs ${diversion.undiverted_job
        .branch_code} ${undiverted_trip_departure_date}. 
  After delivering goods to ${diversion.undiverted_job
    .client_name} at ${diversion.undiverted_job
        .delivery_postcode} this truck now diverts to ${diversion
        .out_of_store_job.branch_code} Branch where ${diversion.out_of_store_job
        .volume} cuft of ${diversion.out_of_store_job
        .client_name}'s stored goods are collected in crates. 
  The truck now delivers these crates to ${diversion.optimal_branch
    .branch_code} Branch where the goods are now stored awaiting delivery. 
  On ${delivery_date} ${diversion.optimal_branch
        .branch_code} delivers the goods to the client at ${diversion
        .out_of_store_job.delivery_postcode}.`;
    }
    return move_explanation;
  }

  filterMethod(filter, row) {
    var haystack = String(row[filter.id]);
    var needle = filter.value;
    if (needle == "ALL BRANCHES") return true;
    return haystack.toUpperCase().indexOf(needle.toUpperCase()) >= 0;
  }

  render() {
    const { data } = this.state;
    return (
      <div className="new-table">
        <ReactTable
          filterable
          style={{ height: "90vh" }}
          collapseOnDataChange={false}
          data={this.format_data.call(this)}
          defaultPageSize={10}
          columns={this.get_rt_columns()}
          className="-striped -highlight"
          defaultFilterMethod={this.filterMethod.bind(this)}
          SubComponent={row => {
            var sub_component_data;
            var subComponent1;
            if (this.props.ros_requested_ids.includes(row.original.id)) {
              var diversions = Diversion.find_diversions_for_ros_suggestion(
                row.original.id
              );
              sub_component_data = this.format_sub_component_data.call(
                this,
                diversions
              );
              subComponent1 = (
                <ReactTable
                  noDataText="No Suggestions Found"
                  data={sub_component_data}
                  defaultPageSize={4}
                  showPagination={false}
                  columns={this.get_rt_subcomponent_columns()}
                  SubComponent={row => {
                    var explanation_string = this.compose_move_explanation.call(
                      this,
                      row.original.id
                    );
                    console.log("row in explanation", row);
                    return (
                      <div>
                        <p>{explanation_string}</p>
                      </div>
                    );
                  }}
                />
              );
            } else {
              subComponent1 = (
                <div>
                  <em>Please Wait while we crunch some numbers</em>
                  <br />
                  <br />
                </div>
              );

              this.props.actions.partload_actions.removal_from_store_suggestions_request(
                row.original.id,
                row.original.dateMilli
              );
              sub_component_data = [];
            }
            return <div style={{ padding: "20px" }}>{subComponent1}</div>;
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    partload_actions: bindActionCreators(partloadActions, dispatch)
    // common_actions: bindActionCreators(commonActions, dispatch)
  }
});

const mapStateToProps = state => ({
  ros_candidates: state.common.ros_candidates,
  removal_from_store_suggestion_array:
    state.partload.removal_from_store_suggestion_array,
  ros_requested_ids: state.partload.ros_requested_ids
});

export default connect(mapStateToProps, mapDispatchToProps)(RosCandidateList);
