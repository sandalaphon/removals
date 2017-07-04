import React from 'react'
import ReactDOM from 'react-dom'
import TruckFlicker from './TruckFlicker'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {drawRoute, drawRouteWithGoogleResponse, clearMap} from '../../models/mapFunctions'
import MapObject from '../../models/MapObject'
import {withRouter} from 'react-router'


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
    this.mapObject = new MapObject(this.map)

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

   console.log(this.props)

        //if in partload start with empty array

        switch (this.props.location.pathname){

          case '/planner':

          if(this.props.all_trips){
            if(this.mapObject) this.mapObject.clearMap()
              this.props.all_trips.forEach((job)=>{
                if(!job.hidden&&this.mapObject){
                  this.mapObject.drawRouteWithGoogleResponse(job.google_directions)
                }
                      //if job.attribute hidden then...

                    })
          }
          break;

          case '/today':
          console.log('today')
          break;

          case '/partload':
          console.log('in partload')
          if(this.props.partload_routes){
            if(this.mapObject) this.mapObject.clearMap()
            this.props.partload_routes.forEach((job)=>{
              if(!job.hidden&&this.mapObject){
                this.mapObject.drawRouteWithGoogleResponse(job.google_directions)
              }
            })

          }
          console.log(this.props.partload_marker_array)
          if(this.props.partload_marker_array.length){
            console.log('in the if')
            this.mapObject.displayMarkers(this.props.partload_marker_array)
          }
          break;



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
    const mapStateToProps=(state)=>({all_trips: state.trips.all_trips, partload_marker_array: state.trips.partload_marker_array })
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMap))

   
