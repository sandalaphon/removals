import React from 'react'
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap'
import Trip from '../models/trip'

class Filter extends React.Component {

  constructor(props){
    super(props)
    var trip1 = new Trip('trip1', '8:00', '15:00')
    var trip2 = new Trip('trip2', '8:00', '12:00')
    var trip3 = new Trip('trip3', '8:00', '13:00')
    this.state={trips: [trip1, trip2, trip3]}
  }

  handleSearchClick(event){
    event.preventDefault()
  }

  drag(event){
    event.dataTransfer.setData('text', event.target.id)
  }

render(){
  var trips = this.state.trips.map((trip, index)=>{
    return(
      <li>
        {trip.clientName}
        {trip.startTime}
        {trip.endTime}
        <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo' draggable='true' onDragStart={this.drag.bind(this)}  id={trip.clientName} width="40" height="20"></img>
      </li>
      )
  })
return(
  <div>
  <Form>
  <FormGroup>
  <FormControl type="text" placeholder="Search" />
  <Button bsStyle="warning" type="submit" onClick={this.handleSearchClick.bind(this)}>Submit</Button>
  </FormGroup>
  </Form>
  <ul>
  {trips}
  </ul>
 
  </div>
  )
  }
}

export default Filter
