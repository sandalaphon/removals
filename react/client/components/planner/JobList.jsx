import React from 'react'
import { setCurrentDragJob, deleteDroppedCells, setHighlightedCells, sortByClientName} from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class JobList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      colours: ['Black', 'Blue', 'DarkGreen', 'DarkMagenta',  'DimGrey', 'GoldenRod', 'Tomato', 'YellowGreen', 'SlateBlue', 'Sienna', 'Plum', 'HotPink'],
      order: true
    }
  }

  drag(event){

    event.dataTransfer.setData('text', JSON.stringify([event.target.id, this.props.trips.all_trips_reference[event.target.id], this.state.colours[event.target.id]]))
    
   
    this.props.actions.setCurrentDragJob({colour: this.state.colours[event.target.id], estimated_hours: this.props.trips.all_trips_reference[event.target.id].estimated_hours})

    this.props.actions.deleteDroppedCells(this.state.colours[event.target.id])
    console.log('target.id', event.target.id)

  }


  handleDragEnd(event){
    event.preventDefault()
    if(event.dataTransfer.dropEffect==='none'){
      this.props.actions.setHighlightedCells([])
      var tableDataElement =document.getElementById(`${event.target.id}${this.state.colours[event.target.id]}`)
      tableDataElement.appendChild(event.target)
    }
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


  jobs(){
    var tripIdOrder = this.props.trips.all_trips_reference.map((ajob)=>{return ajob.id})
    return this.props.trips.all_trips.map((job,index)=>{
      var arrival_time = job.arrival_time
      var indexInAllTrips =  tripIdOrder.indexOf(job.id)
      var inlineStyleColor = {color: this.state.colours[indexInAllTrips]}
      var collapseStyle={display: 'none'}
      var iconHome = `${indexInAllTrips}${this.state.colours[indexInAllTrips]}`
     
      var image = <i 
          draggable='true' 
          onDragEnd={this.handleDragEnd.bind(this)} 
          onDragStart={this.drag.bind(this)}  
          className="material-icons md-48 truckimage" 
          style={inlineStyleColor} 
          id={indexInAllTrips}>local_shipping</i>
          if((job.client_name||'').toUpperCase().indexOf((this.props.trips.searchString||'').toUpperCase())>=0){
      return (<tr key={indexInAllTrips}>
        <td ><button id={job.id}>View Route</button></td>
        <td >{job.client_name}</td>
        <td id={iconHome}>{image}</td>
        <td >'colour code here'</td>
        <td >{job.volume}</td>
        <td >{job.men_requested}</td>
        <td >{job.arrival_time}</td>
        <td >{job.id}</td>
        <td> {job.estimated_hours}</td>

        <td >'programatic registation numberSSSS</td>
        </tr>)
}else{
  return(<tr key={indexInAllTrips} style={collapseStyle}>
        <td ><button id={job.id}>View Route</button></td>
        <td >{job.client_name}</td>
        <td id={iconHome}>{image}</td>
        <td >'colour code here'</td>
        <td >{job.volume}</td>
        <td >{job.men_requested}</td>
        <td >{job.arrival_time}</td>
        <td >{job.id}</td>
        <td> {job.estimated_hours}</td>

        <td >'programatic registation numberSSSS</td>
        </tr>)
}
    })
  }

  render(){ 

    if(this.props.trips.all_trips){
      return(
        <table className='grid-item-joblist'>
        <tbody>
        <tr>
        <th>View Route</th>
        <th onClick={this.handleClientNameSort.bind(this)} >Client Name</th>
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
  actions: bindActionCreators( {setCurrentDragJob, deleteDroppedCells, setHighlightedCells, sortByClientName}, dispatch)
})
const mapStateToProps=(state)=>({trips: state.trips})


export default connect(mapStateToProps, mapDispatchToProps)(JobList)