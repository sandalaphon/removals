import React from "react";
import * as partloadActions from "../../actions/partload_actions";
import * as commonActions from "../../actions/_common_actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { mapObjectInstances } from "../../models/mapObject";
import moment from "moment";
import Trip from "../../models/trip";
import Diversion from "../../models/diversion";

class SuggestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.mapObject) this.mapObject = mapObjectInstances.partload;
  }

  componentDidUpdate() {
    if (!this.mapObject) this.mapObject = mapObjectInstances.partload;
  }

  onClickNearestStart(event) {
    event.preventDefault();
    this.props.actions.common_actions.clearCurrentTruckFlickerJob("partload");
    this.props.actions.partload_actions.clearPickUpBestJobs();
    // this.state.mapObject.clearRoutes()
    this.mapObject.clearMarkers(this.mapObject.markers);
    var startMarkerLat = this.props.partload_marker_array[0].lat;
    var startMarkerLng = this.props.partload_marker_array[0].lng;

    //Note that date range must be added to args
    //send lat lng to rails and get back best pickup routes
    //Will need to ensure space on truck
    this.props.actions.partload_actions.getPickUpBestJobsFromRails(
      startMarkerLat,
      startMarkerLng
    );
  }

  handleRemovalFromStoreDisplay() {
    var diversions = Diversion.all_diversions();
    console.log("diversions", diversions);
    return <div />;
  }

  getBranchbyBranchCode(branch_code) {
    return this.props.all_branches.find(branch => {
      return branch.branch_code == branch_code;
    });
  }

  jobs() {
    return this.props.best_pick_up_jobs.map((job, index) => {
      let format = "ddd, D MMM";
      let date_string = moment(job.dateMilli)
        .format(format)
        .toString();
      var collapseStyle = job.hidden ? { display: "none" } : {};

      return (
        <tr key={job.id} style={collapseStyle}>
          <td>
            <button onClick={this.handleDrawRouteClick.bind(this)}>
              View Route
            </button>
          </td>
          <td> {job.moveware_code}</td>
          <td>{job.client_name}</td>
          <td>{date_string}</td>
          <td>Spare Capacity</td>
          <td>{job.men_requested}</td>
          <td>{job.branch_code}</td>
          <td>view notes click here?</td>
          <td>Truck Type</td>
        </tr>
      );
    });
  }

  render() {
    // var table_to_display
    // if (this.props.removal_from_store_suggestion_array.length){
    //    table_to_display = this.handleRemovalFromStoreDisplay()
    // }else{
    var table_to_display = (
      <table>
        <tbody>
          <tr>
            <th>View Route </th>
            <th>Moveware Code </th>
            <th>Client Name. </th>
            <th>Date </th>
            <th>Spare Capacity</th>
            <th>Men Requested </th>
            <th>Branch </th>
            <th>Notes</th>
            <th>Truck Type</th>
          </tr>
          {this.jobs()}
        </tbody>
      </table>
    );

    // }
    return (
      <div className="grid-item-suggestion-list">
        <div className="nearest-start-button-div">
          <button onClick={this.onClickNearestStart.bind(this)}>
            nearest start
          </button>
          <button>nearest end</button>
        </div>
        {table_to_display}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    partload_actions: bindActionCreators(partloadActions, dispatch),
    common_actions: bindActionCreators(commonActions, dispatch)
  }
});

const mapStateToProps = state => ({
  // suggestedTrips:                     state.trips.suggested_trips,
  removal_from_store_suggestion_array:
    state.partload.removal_from_store_suggestion_array,
  all_trips: state.common.all_trips,
  all_branches: state.common.all_branches,
  partload_marker_array: state.partload.partload_marker_array,
  partload_collection_postcode: state.partload.partload_collection_postcode,
  best_pick_up_jobs: state.partload.best_pick_up_jobs,
  current_partload_truckflicker_job:
    state.common.current_partload_truckflicker_job
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionList);
