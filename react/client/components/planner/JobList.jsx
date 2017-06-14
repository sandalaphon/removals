import React from 'react'
import { setCurrentDragJob, deleteDroppedCells, setHighlightedCells} from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class JobList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      colours: ['Black', 'Blue', 'DarkGreen', 'DarkMagenta',  'DimGrey', 'GoldenRod', 'Tomato', 'YellowGreen', 'SlateBlue', 'Sienna', 'Plum', 'HotPink']
    }
  }

  drag(event){

    event.dataTransfer.setData('text', JSON.stringify([event.target.id, this.props.trips.all_trips[event.target.id], this.state.colours[event.target.id]]))
    
   
    this.props.actions.setCurrentDragJob({colour: this.state.colours[event.target.id], estimated_hours: this.props.trips.all_trips[event.target.id].estimated_hours})

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


  jobs(){
    // var relevantTrips = this.props.trips.all_trips.filter((job)=>{
      // return (job.client_name||'').toUpperCase().indexOf((this.props.trips.searchString||'').toUpperCase())>=0
    // })
    // console.log(relevantTrips)
    return this.props.trips.all_trips.map((job,index)=>{
      var arrival_time = job.arrival_time
     
      var indexInAllTrips =  this.props.trips.all_trips.map((ajob)=>{return ajob.id}).indexOf(job.id)
      var inlineStyleColor = {color: this.state.colours[indexInAllTrips]}
      var collapseStyle={display: 'none'}
      var iconHome = `${indexInAllTrips}${this.state.colours[indexInAllTrips]}`
      // var name = job.client_name
     
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
    // console.log(this.props.trips.searchString)
    if(this.props.trips.all_trips){
      return(
        <table className='grid-item-joblist'>
        <tbody>
        <tr>
        <th>View Route</th>
        <th>Client Name</th>
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
  actions: bindActionCreators( {setCurrentDragJob, deleteDroppedCells, setHighlightedCells}, dispatch)
})
const mapStateToProps=(state)=>({trips: state.trips})


export default connect(mapStateToProps, mapDispatchToProps)(JobList)