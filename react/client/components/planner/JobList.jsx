import React from 'react'
import * as actionCreators from '../../actions/actionCreators'
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

  event.dataTransfer.setData('text', JSON.stringify([event.target.id, this.props.state.trips.all_trips[event.target.id], this.state.colours[event.target.id]]))

  this.props.actions.setCurrentDragJob({colour: this.state.colours[event.target.id], estimated_hours: this.props.state.trips.all_trips[event.target.id].estimated_hours})

  this.props.actions.deleteDroppedCells(this.state.colours[event.target.id])

    }


jobs(){
  return this.props.state.trips.all_trips.map((job,index)=>{
    var arrival_time = job.arrival_time
    var inlineStyleColor = {color: this.state.colours[index]}
    var image = <i draggable='true' onDragStart={this.drag.bind(this)}  className="material-icons md-48 truckimage" style={inlineStyleColor} id={index}>local_shipping</i>

   return (<tr key={index}>
      <td ><button id={job.id}>Expand</button></td>
      <td >{job.client_name}</td>
      <td >{image}</td>
      <td >'colour code here'</td>
      <td >{job.volume}</td>
      <td >{job.men_requested}</td>
      <td >{job.arrival_time}</td>
      <td >'notes hover'</td>
      <td> {job.estimated_hours}</td>
      
      <td >'programatic registation numberSSSS</td>
      </tr>)
 })
}

render(){ 

  if(this.props.state.trips.all_trips){
    return(
      <table className='grid-item-joblist'>
      <tbody>
      <tr>
      <th>Expand</th>
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

// export default JobList

const mapDispatchToProps=(dispatch)=>({
actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({state})
export default connect(mapStateToProps, mapDispatchToProps)(JobList)