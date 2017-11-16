import React from "react"
import Gmap from "../Gmap"
import Filter from "../planner/Filter"
import ListToday from "./ListToday"
import FilterToday from "./FilterToday"
import SliderToday from "./SliderToday"
// import TodayDateSelector from "./TodayDateSelector"
import TruckFlicker from "../TruckFlicker"
import BranchesInfo from "../BranchesInfo"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

class Today extends React.Component {
  render() {
    var branchStyle = {
      gridArea: "lEF",
      border: "4px solid green",
      height: "95vh",
      width: "50vw"
    }

    return (
      <div className="grid-today">
        <div className="grid-item-today-right width50vw">
          <Gmap />
          <TruckFlicker />
          <SliderToday />
        </div>
        <div div className="grid-item-today-left width50vw">
         
          <ListToday />
          </div>
      </div>
    )
  }
}

        // <div className="grid-item-today-left width50vw">
        //   <TodayDateSelector disableOnClickOutside = {!this.props.date_open}/>
// <FilterToday />

const mapDispatchToProps = dispatch => ({
  actions: {
  }
})

const mapStateToProps = state => ({
  date_open: state.today.date_open
})

export default connect(mapStateToProps, mapDispatchToProps)(Today)


