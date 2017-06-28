import React from 'react'
import ReactDOM from 'react-dom'
import TruckFlicker from './TruckFlicker'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {drawRoute, drawRouteWithGoogleResponse, clearMap} from '../../models/mapFunctions'

class GMap extends React.Component {

  constructor(props){
    super(props)
    this.state = { 
      zoom: 11,
      center: { lng: -3.1883 , lat: 55.9533 },
    };

  }

  componentDidMount() {
    this.map = this.createMap()
    // drawRoute.call(this, "Castlebury Farmhouse, wareside, hertfordshire SG12 7SH", "81 East Claremont Street, Edinburgh EH7 4HU", this.map )
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

  deleteRenderRoute(){
    this.props.actions.deleteRouteToRender()
  }

//   componentDidMount(){
//     if(this.props.jobList){
//         this.props.jobList.forEach((job)=>{
//           drawRouteWithGoogleResponse.call(this, job.google_directions, this.map)
//         })
//   }
// }

render() {


    // var routeToRender = this.props.trips.newRouteToRender
    // if(routeToRender&&routeToRender!==this.props.trips.routeToRender){
    //   drawRoute.call(this, routeToRender.startlatlng, routeToRender.endlatlng, this.map)
    //   // this.deleteRenderRoute()
    //   // this.props.actions.deleteRouteToRender()

    // }
    // if(this.props.jobList){
    //     this.props.jobList.forEach((job)=>{
    //       drawRoute.call(this, JSON.parse(job.collection_latlng), JSON.parse(job.delivery_latlng), this.map)
    //     })
    //   }

      // if(this.props.jobList){
      //     this.props.jobList.forEach((job)=>{
      //       drawRouteWithGoogleResponse.call(this, job.google_directions, this.map)
      //     })
        // }

        if(this.props.all_trips){
          console.log('of course we are here Joseph')
          clearMap.call(this, this.map)
          this.props.all_trips.forEach((job)=>{
            if(job.hidden_status){
              drawRouteWithGoogleResponse.call(this, job.google_directions, this.map)
            }
                    //if job.attribute hidden then...
                   
                  })
        }
        



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
    const mapStateToProps=(state)=>({all_trips: state.trips.all_trips})
    export default connect(mapStateToProps, mapDispatchToProps)(GMap)
