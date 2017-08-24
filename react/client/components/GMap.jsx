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

  componentWillUnmount(){
    // this.state.mapObject.saveCurrentMapState()
    console.log('unmount', this.state.map)
    var zoom = this.mapObject.map.getZoom()
    var getCenter = this.mapObject.map.getCenter()
    var center = {lat: getCenter.lat(), lng: getCenter.lng()}
    console.log(center, 'center')
    this.props.actions.common_actions.setMapZoomAndCenter(this.pathname, zoom, center)
  }

  componentDidMount() {
    var pathname = this.props.location.pathname.slice(1)
    // console.log(pathname)
    // if( mapObjectInstances[pathname]){
    //   console.log('mapObjectInstances1', mapObjectInstances[pathname].map.__gm.R)
    //   console.log('mapObjectInstances2', mapObjectInstances[pathname].map.setOptions)
    //   mapObjectInstances[pathname].map.setMap(mapObjectInstances[pathname].map)
    // }
    // this.setState({map: this.createMap()})
    this.mapObject = new MapObject(pathname)


   


  }

  // componentDidUnMount() {
  //   google.maps.event.clearListeners(this.state.map, 'zoom_changed')
  //   this.state.mapObject.clearMap()
  // }

  componentDidUpdate(){

    if(!this.mapObject.branchesButtonExists) {
        // this.state.mapObject.addBranchButtonToMap()
        this.mapObject.createAMapButton(this.mapObject.handleBranchesClick.bind(this.state.mapObject), 'TOP_RIGHT', 'Branches')
        this.mapObject.createAMapButton(this.mapObject.handleFullScreenMapClick.bind(this.mapObject), 'TOP_RIGHT', 'Full Screen')
      } 
  }

  // createMap() {
  //   let pathname=this.props.location.pathname
  //   this.pathname = pathname.slice(1)

  //   let mapOptions = {
  //     zoom: this.state.zoom,
  //     center: this.state.center,
  //     zoomControl: true,
  //      mapTypeControl: true,
  //      mapTypeControlOptions: {
  //            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
  //            mapTypeIds: ['roadmap', 'terrain']
  //          },
  //      scaleControl: true,
  //      streetViewControl: true,
  //      rotateControl: true,
  //      fullscreenControl: false
  //   }
  //   if(mapObjectInstances[this.pathname]){
  //     console.log('we are here')
  //     var map = mapObjectInstances[this.pathname].map
  //     console.log(map)
      

  //   }else{
  //     var map = new google.maps.Map(this.refs.mapCanvas, mapOptions)
  //     var mapObject = new MapObject(map, this.pathname)
  //   }
   

  //   this.setState({mapObject: mapObjectInstances[this.pathname]})
  //   return map
  // }

  // mapCenter() {
  //   return new google.maps.LatLng(
  //     this.state.center.lat,
  //     this.state.center.lng
  //     )
  // }

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


