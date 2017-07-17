import React from 'react'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {mapObjectInstances} from '../../models/mapObject'

class SuggestionList extends React.Component{
  constructor(props){
    super(props)
  }

  // getSuggestions(){
  //   // this.findClosestToGivenLatLng()
  //   this.suggestions = this.props.all_trips
  // }

  onClickNearestStart(event){
    event.preventDefault()
    this.mapObject.clearRoutes()
    this.mapObject.clearMarkers()
    var startMarkerLat = this.props.partload_marker_array[0].lat
    var startMarkerLng = this.props.partload_marker_array[0].lng
    // this.findClosestToGivenLatLng()

    //Note that date range must be added to args
    //send lat lng to rails and get back best pickup routes
    //Will need to ensure space on truck
    this.props.actions.getPickUpBestJobsFromRails(startMarkerLat, startMarkerLng)
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
    if(this.props.partload_marker_array&&this.props.partload_marker_array.length) {
  // this.getSuggestions()
  var mapObjects = mapObjectInstances
  this.mapObject=mapObjects.partload
  console.log('mapObjectInstances in suggestions', this.mapObject)
  this.props.best_pick_up_jobs.forEach((job)=>{
    this.mapObject.drawRouteWithGoogleResponse(job)
  })
  return this.props.best_pick_up_jobs.map((job, index)=>{
    var collapseStyle = job.hidden ? {display: 'none'} : {}

    return(<tr key={job.id} style={collapseStyle}>
      <td ><button  onClick={this.handleDrawRouteClick.bind(this)}>View Route</button></td>
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

}
}



render(){
  return(
    <div className='grid-item-suggestion-list'>
    <button onClick = {this.onClickNearestStart.bind(this)} >nearest start</button>
    <button>nearest end</button>
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
  actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({suggestedTrips: state.trips.suggested_trips, all_trips:state.trips.all_trips, partload_marker_array: state.trips.partload_marker_array , partload_collection_postcode: state.trips.partload_collection_postcode,
best_pick_up_jobs: state.trips.best_pick_up_jobs})
export default connect(mapStateToProps, mapDispatchToProps)(SuggestionList)