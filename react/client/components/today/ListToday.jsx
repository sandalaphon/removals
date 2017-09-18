import React from 'react'
import * as todayActions from '../../actions/today_actions'
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
    if(this.state.mapObject){
      var toDisplay = this.getTable()
       return toDisplay
    }
  }

  getTable(){

    if(!this.props.current_today_truckflicker_job){
            mapObjectInstances.today.displayArrayOfJobRoutes(this.props.today_trips)
          }

    


    return this.props.today_trips.map((job, index)=>{
    // return this.props.all_trips.map((job, index)=>{
     // if(!mapObjectInstances.today.initialRoutesRendered){

      // if(!this.props.current_today_truckflicker_job){
      //   mapObjectInstances.today.drawRouteWithGoogleResponse(job)
      // }
            
            if(index==this.props.all_trips.length-1) mapObjectInstances.today.initialRoutesRendered=true
          // }
      var truckFlickerJob = ''
      var collapseStyle = job.hidden ? {display: 'none'} : {}
      if(job.id === this.props.current_today_truckflicker_job.id){
        truckFlickerJob = 'truckFlickerJob'
      }
      return(
        <tr key={job.id} style={collapseStyle} className = {truckFlickerJob}>
          <td> {job.moveware_code}</td>
          <td >{job.client_name}</td>
          <td >Colour</td>
          <td >Spare Capacity</td>
          <td >{job.men_requested}</td>
          <td >view notes click here?</td>
          <td >Truck Type</td>
        </tr>
      )
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
  actions: {
    today_actions:   bindActionCreators(todayActions, dispatch)
  }
})

const mapStateToProps=(state)=>({
  all_trips: state.common.all_trips,
  today_trips: state.today.today_trips,
  current_today_truckflicker_job: state.common.current_today_truckflicker_job
})

export default connect(mapStateToProps, mapDispatchToProps)(ListToday)