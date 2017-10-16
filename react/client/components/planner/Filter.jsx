import React from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import Trip from "../../models/trip";
import * as commonActions from "../../actions/_common_actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { mapObjectInstances } from "../../models/mapObject";

class Filter extends React.Component {
  doSearch(event) {
    mapObjectInstances.planner.clearMap();
    this.props.actions.common_actions.clearCurrentTruckFlickerJob("planner");

    // this.props.setSearchQuery(event.target.value)
    this.props.all_trips.forEach(job => {
      var clientName = (job.client_name || "").toUpperCase();
      var searchString = (event.target.value || "").toUpperCase();
      this.props.actions.common_actions.setFilterSearchString(
        event.target.value
      );
      if (clientName.indexOf(searchString) >= 0) {
        this.props.actions.common_actions.setHiddenStatus(job);
      } else {
        this.props.actions.common_actions.setUnhiddenStatus(job);
      }
    });
    mapObjectInstances.planner.displayArrayOfJobRoutes(this.props.all_trips);
  }

  render() {
    var searchPlaceHolder = this.props.filter_search_string || "Search";
    var searchBoxText = "";
    if (this.props.filter_search_string)
      searchBoxText = this.props.filter_search_string;

    return (
      <div className="grid-item-filter">
        <input
          className="search-box"
          type="text"
          placeholder={searchPlaceHolder}
          value={searchBoxText}
          onChange={this.doSearch.bind(this)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    common_actions: bindActionCreators(commonActions, dispatch)
  }
});

const mapStateToProps = state => ({
  all_trips: state.common.all_trips,
  filter_search_string: state.common.filter_search_string
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
