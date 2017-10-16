import React from "react";
// import Gmap from '../Gmap'
import GmapPartLoad from "./GmapPartLoad";
import Postcode from "./Postcode";
import SuggestionList from "./SuggestionList";
import SliderPartload from "./SliderPartload";
import { mapObjectInstances } from "../../models/mapObject";
import TruckFlicker from "../TruckFlicker";
import BranchesInfo from "../BranchesInfo";
import RosCandidateList from "./RosCandidateList";

class Partload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapObject: null,
      partload_visible: true,
      ros_visible: false
    };
  }

  // ComponentWillMount(){

  // }

  handleROSClick(e) {
    e.preventDefault();
    this.setState({ ros_visible: !this.state.ros_visible });
    alert("ROS clicked");
  }

  handlePartloadClick(e) {
    e.preventDefault();
    this.setState({ partload_visible: !this.state.partload_visible });
    var partload = document.querySelector(".partload");
    var ros = document.querySelector(".ros");
    console.log("classlist", partload.classList);
    if (this.state.partload_visible) {
      partload.classList.add("hidden");
      ros.classList.remove("hidden");
    } else {
      partload.classList.remove("hidden");
      ros.classList.add("hidden");
    }
    // alert('Partload Clicked')
  }

  componentDidMount() {
    this.setState({ mapObject: mapObjectInstances.partload });
    var partload = document.querySelector(".partload");
    if (this.state.partload_visible) {
      partload.classList.remove("hidden");
    } else {
      partload.classList.add("hidden");
    }
  }

  render() {
    var branchStyle = {
      gridArea: "leF",
      border: "4px solid green",
      height: "95vh",
      width: "50vw"
    };

    return (
      <div className="grid-partload">
        <div className="grid-item-partload-right width50vw">
          <GmapPartLoad />
          <TruckFlicker />
          <SliderPartload />
        </div>

        <div className="grid-item-partload-left width50vw">
          <button onClick={this.handlePartloadClick.bind(this)}>
            PartLoad
          </button>
          <button onClick={this.handleROSClick.bind(this)}>
            Removal Out of Store
          </button>
          <div className="partload">
            <Postcode />
            <SuggestionList />
          </div>
          <div className="ros hidden">
            <RosCandidateList />
          </div>
          <div
            className="branch-info-table-partload hidden"
            style={branchStyle}
          >
            <BranchesInfo />
          </div>
        </div>
      </div>
    );
  }
}

export default Partload;
