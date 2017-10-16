import React from "react"
import { connect } from "react-redux"
import * as commonActions from "../../actions/_common_actions"
import * as todayActions from "../../actions/today_actions"
import { bindActionCreators } from "redux"
import { mapObjectInstances } from "../../models/mapObject"

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
  all_branches: state.common.all_branches
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterToday)
