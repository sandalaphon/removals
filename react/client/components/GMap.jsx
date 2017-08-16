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

  createMap() {
    let pathname=this.props.location.pathname
    pathname = pathname.slice(1)
    console.log('pathname', pathname)
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter(),
      zoomControl: true,
       mapTypeControl: true,
       scaleControl: true,
       streetViewControl: true,
       rotateControl: true,
       fullscreenControl: true
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

  toggleStreetView(){
    // this.props.actions.common.setStreetViewVisiblitiy(false)
  }

  render() {


        switch (this.props.location.pathname){

          case '/planner':

          if(this.state.mapObject&&!this.state.mapObject.branchesButtonExists){
            this.state.mapObject.createAMapButton(this.state.mapObject.handleBranchesClick.bind(this.state.mapObject), 'TOP_RIGHT', 'Branches')
         
          } 

          break;

          case '/today':
          if(this.state.mapObject&&!this.state.mapObject.branchesButtonExists){
             this.state.mapObject.createAMapButton(this.state.mapObject.handleBranchesClick.bind(this.state.mapObject), 'TOP_RIGHT', 'Branches')
             

          
          } 

          break;

        //   case '/partload':

        //   if(this.state.mapObject&&!this.state.branchesButtonExists) {
        //     this.state.mapObject.addBranchButtonToMap()
        //   }

        //   break;
        };


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


