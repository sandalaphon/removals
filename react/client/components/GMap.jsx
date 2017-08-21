import React from 'react'
import ReactDOM from 'react-dom'
import TruckFlicker from './TruckFlicker'
import * as commonActions from '../actions/_common_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {MapObject, mapObjectInstances} from '../models/mapObject'
import {withRouter} from 'react-router'



class GMap extends React.Component {

  constructor(props){
    super(props)
    this.state = { 
      zoom: 12,
      center: { lng: -3.1883 , lat: 55.9533 },
      map: null
      
    };
  }

  componentDidMount() {
    this.setState({map: this.createMap()})

  }

  componentDidUnMount() {
    google.maps.event.clearListeners(this.state.map, 'zoom_changed')
    this.state.mapObject.clearMap()
  }

  componentDidUpdate(){

    if(!this.state.mapObject.branchesButtonExists) {
        // this.state.mapObject.addBranchButtonToMap()
        this.state.mapObject.createAMapButton(this.state.mapObject.handleBranchesClick.bind(this.state.mapObject), 'TOP_RIGHT', 'Branches')
        this.state.mapObject.createAMapButton(this.state.mapObject.handleFullScreenMapClick.bind(this.state.mapObject), 'TOP_RIGHT', 'Full Screen')
      }
  }

  createMap() {
    let pathname=this.props.location.pathname
    pathname = pathname.slice(1)
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter(),
      zoomControl: true,
       mapTypeControl: true,
       mapTypeControlOptions: {
             style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
             mapTypeIds: ['roadmap', 'terrain']
           },
       scaleControl: true,
       streetViewControl: true,
       rotateControl: true,
       fullscreenControl: false
    }
    var map = new google.maps.Map(this.refs.mapCanvas, mapOptions)
    var mapObject = new MapObject(map, pathname)

    this.setState({mapObject: mapObjectInstances[pathname]})
    return map
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.state.center.lat,
      this.state.center.lng
      )
  }

  render() {
        return (              
                <div id='map' className='grid-item-map' ref="mapCanvas">  
                </div>
          )
      }
    };



const mapDispatchToProps=(dispatch)=>({
  actions:{
    common_actions: bindActionCreators(commonActions, dispatch)
  } 
})

const mapStateToProps=(state)=>({
  all_trips: state.common.all_trips, 
  partload_marker_array: state.partload.partload_marker_array, 
  best_pick_up_jobs: state.partload.best_pick_up_jobs })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMap))


