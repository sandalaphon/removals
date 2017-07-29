import React from 'react'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {mapObjectInstances} from '../../models/mapObject'

class ListToday extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      mapObject: null
    }
  }



  componentDidMount(){
    this.setState ({mapObject:mapObjectInstances.today})
  }

  componentDidUpdate(){
    if(!this.state.mapObject){
      this.setState ({
        mapObject:mapObjectInstances.today
      })
    }
  
  }

  jobs2(){

    if(this.state.mapObject&&this.props.all_trips&&this.props.all_trips.length){
      var toDisplay = this.getTable()
       return toDisplay
    }

  }

  getTable(){

      this.props.all_trips.forEach((job)=>{
        if(!job.hidden) this.state.mapObject.drawRouteWithGoogleResponse(job)
      })

      return this.props.all_trips.map((job, index)=>{
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
const mapStateToProps=(state)=>({all_trips: state.trips.all_trips})
export default connect(mapStateToProps, mapDispatchToProps)(ListToday)