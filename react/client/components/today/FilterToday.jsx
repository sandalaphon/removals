import React from "react"
import { connect } from "react-redux"
import * as commonActions from "../../actions/_common_actions"
import * as todayActions from "../../actions/today_actions"
import { bindActionCreators } from "redux"
import { mapObjectInstances } from "../../models/mapObject"
import Geocoder from "../../models/geocoder.js";

class FilterToday extends React.Component {
  handleBranchSelectorChange(e) {
    mapObjectInstances.today.clearMap()
    this.props.actions.today_actions.setTodayBranchSelected(e.target.value)
    this.props.actions.today_actions.setTodayTrips()
    this.props.actions.common_actions.setCurrentTruckFlickerJob("", "today")
  }

  getBranchesAsOptions() {
    if (this.props.all_branches) {
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
  }

  handlePostCodeChange(event){
    event.preventDefault()
    this.props.actions.today_actions.setTodayPostCode(event.target.value)

  }

  handlePostCodeSubmit(e){
    e.preventDefault()
    if(!this.props.today_post_code){
      alert('Please Enter a Collection Postcode')
      return
    }
    console.log('mapobject', mapObjectInstances.today)
    console.log('branch_selected', this.props.branch_selected)
    var geocoder = new Geocoder()
    var branch = this.props.branch_selected
    var f = this.props.actions.today_actions.getClosestTripsToPostCodeInGivenDateRange
    geocoder.getLatLngPromise(this.props.today_post_code)
    .then((lat_lng)=>{
      mapObjectInstances.today.placeTodayPostCodeMarker.call(mapObjectInstances.today, lat_lng, this.props.today_post_code)
      f.call(this, this.props.today_date_range, lat_lng, branch)
    })
  }

  logger(arg1, arg2){
    console.log(arg1, arg2)
    alert(`arg1 ${arg1}, and arg2 ${arg2}`)
  }

  render() {
    return (
      <div>
        <form>
          Select Branch:
          <select
            id="today_branch_selector"
            value={this.props.branch_selected}
            onChange={this.handleBranchSelectorChange.bind(this)}
          >
            {this.getBranchesAsOptions.call(this)}
          </select>
        </form>

        <form onSubmit={this.handlePostCodeSubmit.bind(this)}>
          <label htmlFor="collection_postcode">
            Find Closest Routes to Postcode Or Address:
          </label>
          <br />
          <input
            value={this.props.today_post_code}
            type="text"
            onChange={this.handlePostCodeChange.bind(this)}
            ref="collection_postcode"
            id="collection_postcode"
            placeholder="collection postcode or address"
          />
          <br />
          <input type="submit" />
        </form>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    common_actions: bindActionCreators(commonActions, dispatch),
    today_actions: bindActionCreators(todayActions, dispatch)
  }
})

const mapStateToProps = state => ({
  branch_selected: state.today.today_branch_selected,
  all_branches: state.common.all_branches,
  today_post_code: state.today.today_post_code,
  today_date_range: state.today.today_date_range
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterToday)
