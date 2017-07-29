import React from 'react'
import ReactDOM from 'react-dom'
import TruckFlicker from './TruckFlicker'
import * as actionCreators from '../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import {drawRoute, drawRouteWithGoogleResponse, clearMap} from '../models/mapFunctions'
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
    console.log('Gmap mounted')

 
     // map in state allow auto render when 
    // navigated back
    // drawRoute.call(this, "Castlebury Farmhouse, wareside, hertfordshire SG12 7SH", "81 East Claremont Street, Edinburgh EH7 4HU", this.map )
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
      center: this.mapCenter()
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

  

        //if in partload start with empty array

        switch (this.props.location.pathname){

          case '/planner':

          if(this.props.all_trips){
            if(this.state.mapObject) {
              this.state.mapObject.clearMap()
              if(!this.state.branchesButtonExists) {
                this.state.mapObject.addBranchButtonToMap()
               
              }

            }
              this.props.all_trips.forEach((job)=>{
                if(!job.hidden&&this.state.mapObject){
                  this.state.mapObject.drawRouteWithGoogleResponse(job)
                }
                      //if job.attribute hidden then...

                    })
          }
          break;

          case '/today':
          if(this.state.mapObject&&!this.state.branchesButtonExists){
              this.state.mapObject.addBranchButtonToMap()
          
          } 
            
          // if(this.props.all_trips){//change to today's routes
          //   if(this.state.mapObject) this.state.mapObject.clearMap()
          //     this.props.all_trips.forEach((job)=>{
          //       if(!job.hidden&&this.state.mapObject){
          //         this.state.mapObject.drawRouteWithGoogleResponse(job)
          //       }

          //           })
          // }

          break;

          case '/partload':

          if(this.state.mapObject&&!this.state.branchesButtonExists) {
            this.state.mapObject.addBranchButtonToMap()
           
          }

          if(this.props.best_pick_up_jobs){
            if(this.state.mapObject) this.state.mapObject.clearMap()
              this.props.best_pick_up_jobs.forEach((job)=>{
                if(!job.hidden&&this.state.mapObject){
                  this.state.mapObject.drawRouteWithGoogleResponse(job)
                }
              })

          }

          if(this.props.partload_marker_array.length&&this.state.mapObject){
            this.state.mapObject.displayMarkersFromStore(this.props.partload_marker_array, this.state.mapObject.postcodeMarkers)
          }
          break;
        };


        return (
          <div className='grid-item-map' ref="mapCanvas">

          </div>
          )

      }
    };



    const mapDispatchToProps=(dispatch)=>({
      actions: bindActionCreators(actionCreators, dispatch)
    })
    const mapStateToProps=(state)=>({all_trips: state.trips.all_trips, partload_marker_array: state.trips.partload_marker_array, best_pick_up_jobs: state.trips.best_pick_up_jobs })
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMap))


