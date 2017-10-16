import React from "react"
import Gmap from "../Gmap"
import TruckFlicker from "../TruckFlicker"
import SliderSurveyor from "./SliderSurveyor"
import BranchesInfo from "../BranchesInfo"
import SurveyList from "./SurveyList"
import DateFlicker from "./DateFlicker"
import FilterSurveyor from "./FilterSurveyor"

class Surveyor extends React.Component {
  render() {
    var branchStyle = {
      gridArea: "lEF",
      border: "4px solid green",
      height: "95vh",
      width: "50vw"
    }
    return (
      <div className="grid-surveyor">
        <div className="grid-item-surveyor-left width50vw">
          <DateFlicker />
          <SurveyList />
          <FilterSurveyor />
          <div
            className="branch-info-table-surveyor hidden"
            style={branchStyle}
          >
            <BranchesInfo />
          </div>
        </div>

        <div className="grid-item-surveyor-right width50vw">
          <Gmap />
          <TruckFlicker />
          <SliderSurveyor />
        </div>
      </div>
    )
  }
}

export default Surveyor
