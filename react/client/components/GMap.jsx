import React from 'react'
import ReactDOM from 'react-dom'
import TruckFlicker from './TruckFlicker'

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

    return (
    <div className="gmap-grid-item">  
    <TruckFlicker/>
      <div className='GMap-canvas' ref="mapCanvas">
      
     {this.map}

      </div>
      </div>
    )
  }


}
export default GMap