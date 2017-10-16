import React from "react";
import * as plannerActions from "../../actions/planner_actions";
import * as commonActions from "../../actions/_common_actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { mapObjectInstances } from "../../models/mapObject";
import BranchesInfo from "../BranchesInfo";

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: { clientName: true, estimatedHours: true }
    };
    (this.eventTarget = null), (this.currentDropTargetId = null);
  }

  componentDidMount() {
    this.setState({ mapObject: mapObjectInstances.planner });
  }

  componentDidUpdate() {
    if (!this.state.mapObject) {
      this.setState({
        mapObject: mapObjectInstances.planner
      });
    }
  }

  drag(event) {
    this.eventTarget = event.target;
    let index2 = 0;
    this.props.all_trips.forEach((trip, index) => {
      if (trip.colour == event.target.id) {
        index2 = index;
      }
    });

    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.dropEffect = "copy";
    this.props.actions.planner_actions.setCurrentDragJob({
      colour: event.target.id,
      estimated_hours: this.props.all_trips[index2].estimated_hours
    });
  }

  handleOnDragJobList(event) {
    event.preventDefault();
  }

  handleDragEnd(event) {
    event.preventDefault();
    this.props.actions.planner_actions.setHighlightedCells([]);
  }

  handleDragOver(event) {
    event.preventDefault();
    this.currentDropTargetId = event.target.id;
  }

  handleClientNameSort() {
    if (this.state.order.clientName) {
      this.props.actions.planner_actions.sortByColumn("client_name", "asc");
      this.setState({ order: { clientName: false } });
    } else {
      this.props.actions.planner_actions.sortByColumn("client_name", "dec");
      this.setState({ order: { clientName: true } });
    }
  }
  /////////////////////////////////////////
  handleEstHoursSort() {
    if (this.state.order.estimatedHours) {
      this.props.actions.planner_actions.sortByColumn("estimated_hours", "asc");
      this.setState({ order: { estimatedHours: false } });
    } else {
      this.props.actions.planner_actions.sortByColumn("estimated_hours", "dec");
      this.setState({ order: { estimatedHours: true } });
    }
  }

  getTripById(tripId) {
    return this.props.all_trips.find(job => {
      return job.id === +tripId;
    });
  }

  renderTripById(tripId) {
    var trip = this.getTripById(tripId);
    let startLatLng = JSON.parse(trip.collection_latlng);
    let endLatLng = JSON.parse(trip.delivery_latlng);
    this.props.actions.planner_actions.renderNewRoute(
      startLatLng,
      endLatLng,
      tripId
    );
  }

  // handleDrawRouteClick(event){
  //     // this.renderTripById(event.target.id)
  //   }

  handleHideRouteClick(event) {
    var job = this.getTripById(event.target.id);
    this.props.actions.common_actions.setUnhiddenStatus(job);
    if (job.id === this.props.current_planner_truckflicker_job.id) {
      // this.props.actions.common_actions.clearCurrentTruckFlickerJob('planner')
      mapObjectInstances.planner.clearMap();
    }
  }

  handleJobListDrop(event) {
    var tripId;
    this.props.all_trips.forEach(trip => {
      if (trip.colour == this.eventTarget.id) {
        tripId = trip.id;
      }
    });

    var tableDataElement = document.getElementById(
      `${tripId}${this.eventTarget.id}`
    );

    if (this.eventTarget.id === this.currentDropTargetId) return;

    tableDataElement.appendChild(this.eventTarget);
    this.props.actions.planner_actions.deleteDroppedCells(this.eventTarget.id);
  }

  jobs() {
    if (this.state.mapObject) var toDisplay = this.getTable();
    return toDisplay;
  }

  getTable() {
    return this.props.all_trips.map((job, index) => {
      if (!mapObjectInstances.planner.initialRoutesRendered) {
        mapObjectInstances.planner.drawRouteWithGoogleResponse(job);
        if (index == this.props.all_trips.length - 1)
          mapObjectInstances.planner.initialRoutesRendered = true;
      }
      var inlineStyleColor = { color: job.colour };
      var iconHome = `${job.id}${job.colour}`;
      var truckFlickerJob = "";
      var arrival_time = job.arrival_time;
      var hoverHandStyle = { cursor: "pointer" };
      var collapseStyle = job.hidden ? { display: "none" } : {};

      if (job.id === this.props.current_planner_truckflicker_job.id) {
        truckFlickerJob = "truckFlickerJob";
      }

      var image = (
        <i
          draggable="true"
          onDragEnd={this.handleDragEnd.bind(this)}
          onDragStart={this.drag.bind(this)}
          className="material-icons md-18 truckimage"
          style={inlineStyleColor}
          id={job.colour}
        >
          local_shipping
        </i>
      );

      return (
        <tr key={job.id} style={collapseStyle} className={truckFlickerJob}>
          <td>
            <button id={job.id} onClick={this.handleHideRouteClick.bind(this)}>
              Hide Route
            </button>
          </td>
          <td>{job.client_name}</td>
          <td id={iconHome} style={hoverHandStyle}>
            {image}
          </td>
          <td>{job.collection_postcode}</td>
          <td>{job.volume}</td>
          <td>{job.men_requested}</td>
          <td>{job.arrival_time}</td>
          <td>{job.id}</td>
          <td> {job.estimated_hours}</td>

          <td>'programatic registation numberSSSS</td>
        </tr>
      );
    });
  }

  //onClick={this.openCity(event, 'Paris').bind(this)}

  render() {
    var hoverHandStyle = { cursor: "pointer" };

    return (
      <div className="grid-item-joblist">
        <table
          onDrag={this.handleOnDragJobList.bind(this)}
          onDrop={this.handleJobListDrop.bind(this)}
          onDragOver={this.handleDragOver.bind(this)}
        >
          <tbody>
            <tr>
              <th>View Route</th>
              <th
                onClick={this.handleClientNameSort.bind(this)}
                style={hoverHandStyle}
              >
                Client Name
              </th>
              <th>Drag Icon</th>
              <th>Colour</th>
              <th>Volume</th>
              <th>Men Requested</th>
              <th>Start</th>
              <th>Notes</th>
              <th onClick={this.handleEstHoursSort.bind(this)}>
                Estimated Hours
              </th>
              <th>Allocated Trucks</th>
            </tr>

            {this.jobs()}
          </tbody>
        </table>
      </div>
    );
  }
}

// className={this.props.branch_status_planner==2 ? 'hidden' :'grid-item-joblist'}

const mapDispatchToProps = dispatch => ({
  actions: {
    planner_actions: bindActionCreators(plannerActions, dispatch),
    common_actions: bindActionCreators(commonActions, dispatch)
  }
});

const mapStateToProps = state => ({
  all_trips: state.common.all_trips,
  zoom_and_center_planner: state.common.zoom_and_center_planner,
  show_to_branch: state.common.show_to_branch,
  show_from_branch: state.common.show_from_branch,
  searchString: state.planner.searchString,
  current_planner_truckflicker_job:
    state.common.current_planner_truckflicker_job
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);

// if(this.props.all_trips){
//   return(
//     <table
//     className='grid-item-joblist'
//     onDrag={this.handleOnDragJobList.bind(this)}
//     onDrop={this.handleJobListDrop.bind(this)}
//     onDragOver={this.handleDragOver.bind(this)}>
//     <tbody>
//     <tr>
//     <th>View Route</th>
//     <th onClick={this.handleClientNameSort.bind(this)} style={hoverHandStyle}>Client Name</th>
//     <th>Drag Icon</th>
//     <th>Colour</th>
//     <th>Volume</th>
//     <th>Men Requested</th>
//     <th>Start</th>
//     <th>Notes</th>
//     <th onClick={this.handleEstHoursSort.bind(this)}>Estimated Hours</th>
//     <th>Allocated Trucks</th>
//     </tr>

//     {this.jobs()}
//     </tbody>
//     </table>
//     )
// }else{
//   return(
//     <div className='grid-item-joblist'>
//     No Jobs Yet
//     </div>
//     )
// }
