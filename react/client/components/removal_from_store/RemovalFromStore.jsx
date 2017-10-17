import React from 'react'
import Gmap from '../Gmap'
import TruckFlicker from '../TruckFlicker'
import SliderROS from './SliderROS'
import RosCandidateList from './RosCandidateList'

class RemovalFromStore extends React.Component {
  render() {
    return (
      <div className="grid-ros">
        <div className="grid-item-ros-right width50vw">
          <Gmap />
          <TruckFlicker />
          <SliderROS />
        </div>

        <div className="grid-item-ros-left width50vw">
          <RosCandidateList />
        </div>
      </div>
    )
  }
}

export default RemovalFromStore
