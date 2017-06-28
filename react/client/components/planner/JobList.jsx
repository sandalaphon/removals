import React from 'react'
import { setCurrentDragJob, deleteDroppedCells, setHighlightedCells, sortByClientName, renderNewRoute, includeInVisibleJobList, excludeFromVisibleJobList} from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class JobList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      colours: ['Black', 'Blue', 'DarkGreen', 'DarkMagenta',  'DimGrey', 'GoldenRod', 'Tomato', 'YellowGreen', 'SlateBlue', 'Sienna', 'Plum', 'HotPink'],
      order: true
    }
    this.eventTarget = null,
    this.currentDropTargetId = null
  }


  drag(event){
  this.eventTarget = event.target
    event.dataTransfer.setData('text', JSON.stringify([event.target.id, this.props.all_trips_reference[event.target.id], this.state.colours[event.target.id]]))
    event.dataTransfer.dropEffect = "copy";

    this.props.actions.setCurrentDragJob({colour: this.state.colours[event.target.id], estimated_hours: this.props.all_trips_reference[event.target.id].estimated_hours})

  }

  handleOnDragJobList(event){
    event.preventDefault()
  }

  handleDragEnterJobList(event){
    event.preventDefault()
    }
  

  handleDragLeaveJobList(event){
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
    if(this.state.order){
      this.props.actions.sortByClientName('asc')
      this.setState({order:false})
    }else{
      this.props.actions.sortByClientName('dec')
      this.setState({order:true})
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
    var tableDataElement =document.getElementById(`${this.eventTarget.id}${this.state.colours[this.eventTarget.id]}`)
    if(this.eventTarget.id === this.currentDropTargetId) return
 
    tableDataElement.appendChild(this.eventTarget)
    this.props.actions.deleteDroppedCells(this.state.colours[this.eventTarget.id])

  }

 
  jobs(){
    var tripIdOrder = this.props.all_trips_reference.map((ajob)=>{return ajob.id})

    return this.props.all_trips.map((job,index)=>{
      var arrival_time = job.arrival_time
      var indexInAllTrips =  tripIdOrder.indexOf(job.id)
      var inlineStyleColor = {color: this.state.colours[indexInAllTrips]}
      var iconHome = `${indexInAllTrips}${this.state.colours[indexInAllTrips]}`
      var hoverHandStyle = {cursor: 'pointer'}

      var collapseStyle = job.hidden ? {display: 'none'} : {}
     

      var image = <i 
          draggable='true' 
          onDragEnd={this.handleDragEnd.bind(this)} 
          onDragStart={this.drag.bind(this)}  
          className="material-icons md-18 truckimage" 
          style={inlineStyleColor} 
          id={indexInAllTrips}>local_shipping</i>
          
     
  return(<tr key={indexInAllTrips} style={collapseStyle}>
        <td ><button id={job.id} onClick={this.handleDrawRouteClick.bind(this)}>View Route</button></td>
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
        onDragEnter={this.handleDragEnterJobList.bind(this)} 
        onDragLeave={this.handleDragLeaveJobList.bind(this)} 
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
        <th>Estimated Hours</th> 
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
  actions: bindActionCreators( {setCurrentDragJob, deleteDroppedCells, setHighlightedCells, sortByClientName, renderNewRoute, excludeFromVisibleJobList, includeInVisibleJobList}, dispatch)
})
const mapStateToProps=(state)=>({ all_trips: state.trips.all_trips, all_trips_reference: state.trips.all_trips_reference, searchString: state.trips.searchString})


export default connect(mapStateToProps, mapDispatchToProps)(JobList)