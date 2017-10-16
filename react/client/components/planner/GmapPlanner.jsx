//////NOT IN USE YET !!!!!!!!!
import React from "react";
import ReactDOM from "react-dom";
import TruckFlicker from "../TruckFlicker";
import * as plannerActions from "../../actions/planner_actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { MapObject, mapObjectInstances } from "../../models/mapObject";
import { withRouter } from "react-router";

class GmapPlanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
      center: { lng: -3.1883, lat: 55.9533 },
      map: null
    };
  }

  componentDidMount() {
    this.setState({ map: this.createMap() });
  }

  componentDidUpdate() {
    if (!this.state.branchesButtonExists) {
      this.state.mapObject.addBranchButtonToMap();
    }
  }

  componentDidUnMount() {
    google.maps.event.clearListeners(this.state.map, "zoom_changed");
    this.state.mapObject.clearMap();
  }

  createMap() {
    let pathname = this.props.location.pathname;
    pathname = pathname.slice(1);
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    };
    var map = new google.maps.Map(this.refs.mapCanvas, mapOptions);
    var mapObject = new MapObject(map, pathname);

    this.setState({ mapObject: mapObjectInstances[pathname] });
    return map;
  }

  mapCenter() {
    return new google.maps.LatLng(this.state.center.lat, this.state.center.lng);
  }

  render() {
    // note placement of slider markers handled in slider
    const { mapObject } = this.state;
    const {
      planner_marker_array,
      current_planner_truckflicker_job,
      best_pick_up_jobs
    } = this.props;

    if (mapObject) {
      // if(planner_marker_array.length){
      //   mapObject.displayMarkersFromStore(planner_marker_array, mapObject.postcodeMarkers)
      // }

      if (current_planner_truckflicker_job) {
        mapObjectInstances.planner.drawRouteWithGoogleResponse(
          current_planner_truckflicker_job
        );
      } else {
        mapObject.displayArrayOfJobRoutes(best_pick_up_jobs);
      }
    }

    return <div className="grid-item-map" ref="mapCanvas" />;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    planner_actions: bindActionCreators(plannerActions, dispatch)
  }
});

const mapStateToProps = state => ({
  all_trips: state.common.all_trips,
  current_planner_truckflicker_job:
    state.planner.current_planner_truckflicker_job
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GmapPlanner)
);
