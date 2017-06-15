import React from 'react'
import ReactDOM from 'react-dom'
import TruckFlicker from './TruckFlicker'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {drawRoute} from '../../models/mapFunctions'

class GMap extends React.Component {

  constructor(props){
    super(props)
    this.state = { 
      zoom: 11,
      center: { lng: -3.1883 , lat: 55.9533 }
    };
  }

  componentDidMount() {
    this.map = this.createMap()
    drawRoute.call(this, {lng: -3.1883, lat: 55.9533}, {lng: -2.1883, lat: 54.9533}, this.map )
  }

  
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.state.center.lat,
      this.state.center.lng
    )
  }

  render() {
    var routeToRender = this.props.trips.newRouteToRender
    if(routeToRender&&routeToRender!==this.state.routeToRender){
      drawRoute.call(this, routeToRender.startlatlng, routeToRender.endlatlng, this.map)
    }
    // this.props.trips.renderedRoutes.forEach((job)=>{
    //   drawRoute.call(this, job.startlatlng, job.endlatlng, this.map)
    // })
    return (
      <div className='grid-item-map' ref="mapCanvas">
        this.map
      </div>
    )
  }


}

const mapDispatchToProps=(dispatch)=>({
actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({trips: state.trips})
export default connect(mapStateToProps, mapDispatchToProps)(GMap)
