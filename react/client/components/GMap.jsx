import React from "react"
import ReactDOM from "react-dom"
import TruckFlicker from "./TruckFlicker"
import * as commonActions from "../actions/_common_actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { MapObject, mapObjectInstances } from "../models/mapObject"
import { withRouter } from "react-router"

class GMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 12,
      center: { lng: -3.1883, lat: 55.9533 },
      map: null
    }
  }

  componentDidMount() {
    this.setState({ map: this.createMap() })
  }

  createMap() {
    let pathname = this.props.location.pathname
    pathname = pathname.slice(1)
    if (mapObjectInstances[pathname]) {
      var map = mapObjectInstances[pathname].map
      var el = document.querySelector(".gmap-map-outer")
      var innerEl = document.querySelector(".grid-item-map")
      innerEl.parentNode.removeChild(innerEl)
      el.appendChild(map.getDiv())
      this.setState({ mapObject: mapObjectInstances[pathname] })
      return map
    } else {
      let mapOptions = {
        zoom: this.state.zoom,
        center: this.mapCenter(),
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: ["roadmap", "terrain"]
        }
      }

      var map = new google.maps.Map(this.refs.mapCanvas, mapOptions)
      var mapObject = new MapObject(map, pathname)
      mapObject.createAMapButton(
        mapObject.handleBranchesClick.bind(mapObject),
        "TOP_RIGHT",
        "Branches"
      )
      mapObject.createAMapButton(
        mapObject.handleFullScreenMapClick.bind(mapObject),
        "TOP_RIGHT",
        "Full Screen"
      )

      this.setState({ mapObject: mapObjectInstances[pathname] })
      return map
    }
  }

  mapCenter() {
    return new google.maps.LatLng(this.state.center.lat, this.state.center.lng)
  }

  render() {
    return (
      <div className="gmap-map-outer">
        <div id="map" className="grid-item-map" ref="mapCanvas" />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps = state => ({
  all_trips: state.common.all_trips,
  partload_marker_array: state.partload.partload_marker_array,
  best_pick_up_jobs: state.partload.best_pick_up_jobs
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMap))
