import React from 'react'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {mapObjectInstances} from '../../models/mapObject'

class ListToday extends React.Component {

  constructor(props){
    super(props)
  }

  // componentDidMount(){
  //   var mapObjects = mapObjectInstances
  //   console.log("mapinstances", mapObjectInstances)
  //   this.mapObject=mapObjects.today
  // }

  jobs2(){
    if(mapObjectInstances.today) {
      this.mapObject = mapObjectInstances.today
      var toDisplay = this.getTable()
       return toDisplay
    }else{
      setTimeout(()=>{this.mapObject = mapObjectInstances.today; var toDisplay = this.getTable();return toDisplay}, 2000)
    }
  }

  getTable(){

    console.log('mapObjectInstances in today', this.mapObject)
    console.log('all_trips', this.props.trips.all_trips)
    this.props.trips.all_trips.forEach((job)=>{
      this.mapObject.drawRouteWithGoogleResponse(job)
    })

    return this.props.trips.all_trips.map((job, index)=>{
      var collapseStyle = job.hidden ? {display: 'none'} : {}
      return(<tr key={job.id} style={collapseStyle}>
        <td> {job.moveware_code}</td>
        <td >{job.client_name}</td>
        <td >Colour</td>
        <td >Spare Capacity</td>
        <td >{job.men_requested}</td>
        <td >view notes click here?</td>
        <td >Truck Type</td>
        </tr>)
    })
  }
  

  render(){

    return (
      <div className='grid-item-list-today'>
      <table >
      <tbody>
      <tr>
      <th>Moveware Code </th>
      <th>Client Name.  </th>
      <th>Colour        </th>
      <th>Spare Capacity</th>
      <th>Men Requested </th>
      <th>Notes</th> 
      <th>Truck Type</th>
      </tr>
      {this.jobs2()}
      </tbody>
      </table>
      </div>
      )
  }

}




const mapDispatchToProps=(dispatch)=>({
  actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({trips: state.trips})
export default connect(mapStateToProps, mapDispatchToProps)(ListToday)