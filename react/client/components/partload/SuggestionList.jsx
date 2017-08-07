import React from 'react'
import * as partloadActions from '../../actions/partload_actions'
import * as commonActions from '../../actions/_common_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {mapObjectInstances} from '../../models/mapObject'

class SuggestionList extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.setState({mapObject: mapObjectInstances.partload})
    console.log(this.state.mapObject)
  }

  componentDidUpdate(){
    if(!this.state.mapObject){
       this.setState({mapObject: mapObjectInstances.partload})
    }
  }

  onClickNearestStart(event){
    event.preventDefault()
    this.props.actions.common_actions.clearCurrentTruckFlickerJob('partload')
    this.props.actions.partload_actions.clearPickUpBestJobs()
    // this.state.mapObject.clearRoutes()
    this.state.mapObject.clearMarkers(this.state.mapObject.markers)
    var startMarkerLat = this.props.partload_marker_array[0].lat
    var startMarkerLng = this.props.partload_marker_array[0].lng

    //Note that date range must be added to args
    //send lat lng to rails and get back best pickup routes
    //Will need to ensure space on truck
    this.props.actions.partload_actions.getPickUpBestJobsFromRails(startMarkerLat, startMarkerLng)
  }

  // get5BestPickUpTrucks(arrayOfTripDistances){
  //   var IndexOfBest5 = []
  //   arrayOfTrips.forEach((distance, index)=>{
  //     if(distance<IndexOfBest5[0])
  //   })
  // }

  findClosestToGivenLatLng(){
    var startMarkerLat = this.props.partload_marker_array[0].lat
    var startMarkerLng = this.props.partload_marker_array[0].lng
    var shortest_distances = []

    this.props.all_trips.forEach((trip)=>{
      let path = trip.google_directions.routes[0].overview_path
      var path_length = path.length

     for(let i = 0; i<path_length; i=i+10){
      var shortest_distance
      let pointLat = path[i].lat
      let pointLng = path[i].lng
      //pythagoras on lat lng
      let distance = Math.sqrt((startMarkerLat-pointLat)*(startMarkerLat-pointLat)+(startMarkerLng-pointLng)*(startMarkerLng-pointLng))
      if(!shortest_distance) shortest_distance=distance
        if(distance<shortest_distance) shortest_distance=distance
     }

   shortest_distances.push(shortest_distance)
    })
    console.log('shortest_distances', shortest_distances)
    // return (shortest_distances)
  }


  handleDrawRouteClick(){}

  jobs(){
    // if(this.props.partload_marker_array&&this.props.partload_marker_array.length) {
  // var mapObjects = mapObjectInstances
  // this.state.mapObject=mapObjects.partload

  // if(this.props.best_pick_up_jobs){
  //   if(this.state.mapObject) this.state.mapObject.clearMap()
  //     this.props.best_pick_up_jobs.forEach((job)=>{
  //       if(!job.hidden&&this.state.mapObject){
  //         this.state.mapObject.drawRouteWithGoogleResponse(job)
  //       }
  //     })

  // }

  // if(this.props.partload_marker_array.length&&this.state.mapObject){
  //   this.state.mapObject.displayMarkersFromStore(this.props.partload_marker_array, this.state.mapObject.postcodeMarkers)
  // }


  // if(this.state.mapObject&&!this.props.current_partload_truckflicker_job){
  //   console.log('shouldnt get here', this.props.current_partload_truckflicker_job )
  //   this.props.best_pick_up_jobs.forEach((job)=>{
  //     this.state.mapObject.drawRouteWithGoogleResponse(job)
  //   })}

  return this.props.best_pick_up_jobs.map((job, index)=>{
    var collapseStyle = job.hidden ? {display: 'none'} : {}

    return(
      <tr key={job.id} style={collapseStyle}>
        <td >
          <button  onClick={this.handleDrawRouteClick.bind(this)}>
            View Route
          </button></td>
        <td> {job.moveware_code}</td>
        <td >{job.client_name}</td>
        <td >Colour</td>
        <td >Spare Capacity</td>
        <td >{job.men_requested}</td>
        <td >{job.branch_id}</td>
        <td >view notes click here?</td>
        <td >Truck Type</td>
      </tr>)
  })

// }
}

render(){
  return(
    <div className='grid-item-suggestion-list'>
      <button onClick = {this.onClickNearestStart.bind(this)} >
        nearest start
        </button>
      <button>
        nearest end
      </button>
      <table >
        <tbody>
          <tr>
            <th>View Route    </th>
            <th>Moveware Code </th>
            <th>Client Name.  </th>
            <th>Colour        </th>
            <th>Spare Capacity</th>
            <th>Men Requested </th>
            <th>Branch        </th>
            <th>Notes</th> 
            <th>Truck Type</th>
          </tr>
          {this.jobs()}
        </tbody>
      </table>
    </div>
    )
}
}

const mapDispatchToProps=(dispatch)=>({
  actions:{
    partload_actions: bindActionCreators(partloadActions, dispatch),
    common_actions: bindActionCreators(commonActions, dispatch)

  }
})

const mapStateToProps=(state)=>({
 // suggestedTrips:                     state.trips.suggested_trips, 
  all_trips:                          state.common.all_trips, 
  partload_marker_array:              state.partload.partload_marker_array,
  partload_collection_postcode:       state.partload.partload_collection_postcode, 
  best_pick_up_jobs:                  state.partload.best_pick_up_jobs, 
  current_partload_truckflicker_job:  state.common.current_partload_truckflicker_job
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionList)