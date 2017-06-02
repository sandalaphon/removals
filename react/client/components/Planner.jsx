import React from 'react'
import Gmap from './Gmap'
import Filter from './Filter'
import TruckDayView from './TruckDayView'
import {Grid, Row, Col, Clearfix} from 'react-bootstrap'

class Planner extends React.Component {
  render(){
    return(
      <div className = 'planner-grid'>
            <Filter/>
            <TruckDayView/>
            <Gmap />
      </div>
      )
  }
}

export default Planner


// return(
  // <div className = 'container-fluid'>
    // <Grid className='gridClass'>
      // <Row>
      // <Col xs={1} smHidden md={1}>
      //     <Filter/>
      // </Col>
      // <Col className='truckTable' xs={5} sm={6} md={5} lg={5}>
      //   <TruckDayView/>
      // </Col>
      //   <Col xs={6} md={6}>
      //       <Gmap />
      //   </Col>
  //     </Row>
  //   </Grid>
  // </div>
  // )



// <p>We are Planner</p>
