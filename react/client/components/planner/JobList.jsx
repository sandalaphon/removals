import React from 'react'
import { setCurrentDragJob, deleteDroppedCells, setHighlightedCells,  renderNewRoute, includeInVisibleJobList, excludeFromVisibleJobList, sortByColumn} from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class JobList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      order: {clientName: true, estimatedHours: true}
      // order: true
    }
    this.eventTarget = null,
    this.currentDropTargetId = null
  }


  drag(event){

  this.eventTarget = event.target
  let index2 = 0
  this.props.all_trips.forEach((trip, index)=>{
    if(trip.colour==event.target.id){

      index2 = index}
  })

    event.dataTransfer.setData('text', event.target.id)
    event.dataTransfer.dropEffect = "copy";
    this.props.actions.setCurrentDragJob({colour: event.target.id, estimated_hours: this.props.all_trips[index2].estimated_hours})


  }

  handleOnDragJobList(event){
    event.preventDefault()
  }


  handleDragEnd(event){
    event.preventDefault()
    this.props.actions.setHighlightedCells([])
  }

  handleDragOver(event){
    event.preventDefault() 
    this.currentDropTargetId = event.target.id
  }

  handleClientNameSort(){
    if(this.state.order.clientName){
      this.props.actions.sortByColumn('client_name','asc')
      this.setState({order:{clientName:false}})
    }else{
      this.props.actions.sortByColumn('client_name', 'dec')
      this.setState({order:{clientName:true}})
    }
  }
/////////////////////////////////////////
  handleEstHoursSort(){
    if(this.state.order.estimatedHours){
      this.props.actions.sortByColumn('estimated_hours','asc')
      this.setState({order:{estimatedHours:false}})
    }else{
      this.props.actions.sortByColumn('estimated_hours','dec')
      this.setState({order: {estimatedHours:true}})
    }
  }

  getTripById(tripId){
    return this.props.all_trips.find((job)=>{
      return job.id=== +tripId
    })
  }

  renderTripById(tripId){
    var trip = this.getTripById(tripId)
    let startLatLng = JSON.parse(trip.collection_latlng)
    let endLatLng = JSON.parse(trip.delivery_latlng)
    this.props.actions.renderNewRoute(startLatLng, endLatLng, tripId)
  }

  handleDrawRouteClick(event){
    this.renderTripById(event.target.id)
  }

  handleJobListDrop(event){
    var tripId
    this.props.all_trips.forEach((trip)=>{
      if(trip.colour==this.eventTarget.id){
        tripId=trip.id
      }
    })

    var tableDataElement = document.getElementById(`${tripId}${this.eventTarget.id}`)

    if(this.eventTarget.id === this.currentDropTargetId) return
 
    tableDataElement.appendChild(this.eventTarget)
    this.props.actions.deleteDroppedCells(this.eventTarget.id)

  }

 
  jobs(){

    return this.props.all_trips.map((job,index)=>{
      var inlineStyleColor = {color: job.colour}
      var iconHome = `${job.id}${job.colour}`

      var arrival_time = job.arrival_time
      var hoverHandStyle = {cursor: 'pointer'}
      var collapseStyle = job.hidden ? {display: 'none'} : {}
     

      var image = <i 
          draggable='true' 
          onDragEnd={this.handleDragEnd.bind(this)} 
          onDragStart={this.drag.bind(this)}  
          className="material-icons md-18 truckimage" 
          style={inlineStyleColor} 
          id={job.colour}>local_shipping</i>
          
     
  return(<tr key={job.id} style={collapseStyle}>
        <td ><button  onClick={this.handleDrawRouteClick.bind(this)}>View Route</button></td>
        <td >{job.client_name}</td>
        <td id={iconHome} style={hoverHandStyle}>{image}</td>
        <td >{job.collection_postcode}</td>
        <td >{job.volume}</td>
        <td >{job.men_requested}</td>
        <td >{job.arrival_time}</td>
        <td >{job.id}</td>
        <td> {job.estimated_hours}</td>

        <td >'programatic registation numberSSSS</td>
        </tr>)

    })
  }

  render(){ 
    var hoverHandStyle = {cursor: 'pointer'}
    if(this.props.all_trips){
      return(
        <table 
        className='grid-item-joblist' 
        onDrag={this.handleOnDragJobList.bind(this)}
        onDrop={this.handleJobListDrop.bind(this)} 
        onDragOver={this.handleDragOver.bind(this)}>
        <tbody>
        <tr>
        <th>View Route</th>
        <th onClick={this.handleClientNameSort.bind(this)} style={hoverHandStyle}>Client Name</th>
        <th>Drag Icon</th>
        <th>Colour</th>
        <th>Volume</th>
        <th>Men Requested</th>
        <th>Start</th>
        <th>Notes</th>
        <th onClick={this.handleEstHoursSort.bind(this)}>Estimated Hours</th> 
        <th>Allocated Trucks</th>
        </tr>

        {this.jobs()}
        </tbody>
        </table>
        )
    }else{
      return(
        <div className='grid-item-joblist'>
        No Jobs Yet
        </div>
        )
    }
  }
}

const mapDispatchToProps=(dispatch)=>({
  actions: bindActionCreators( {setCurrentDragJob, deleteDroppedCells, setHighlightedCells, sortByColumn, renderNewRoute, excludeFromVisibleJobList, includeInVisibleJobList}, dispatch)
})
const mapStateToProps=(state)=>({ all_trips: state.trips.all_trips, searchString: state.trips.searchString})


export default connect(mapStateToProps, mapDispatchToProps)(JobList)