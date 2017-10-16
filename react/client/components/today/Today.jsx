import React from "react"
import Gmap from "../Gmap"
import Filter from "../planner/Filter"
import ListToday from "./ListToday"
import FilterToday from "./FilterToday"
import SliderToday from "./SliderToday"
import TodayDateSelector from "./TodayDateSelector"
import TruckFlicker from "../TruckFlicker"
import BranchesInfo from "../BranchesInfo"

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

        <div className="grid-item-today-left width50vw">
          <TodayDateSelector />
          <FilterToday />
          <ListToday />
          <div className="branch-info-table-today hidden" style={branchStyle}>
            <BranchesInfo />
          </div>
        </div>
      </div>
    )
  }
}

export default Today
