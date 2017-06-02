import React from 'react'
import Gmap from './Gmap'
import Filter from './Filter'
import {Grid, Row, Col, Clearfix} from 'react-bootstrap'

class Today extends React.Component {
  render(){
    return(
      <div className = 'container-fluid'>
        <Grid className='gridClass'>
          <Row>
          <Col xs={2} md={2}>
              <Filter/>
          </Col>
          <Col xs={4} md={4}>
            Lists
          </Col>
            <Col xs={6} md={6}>
                <Gmap />
            </Col>
          </Row>
        </Grid>
      </div>
      )
  }
}

export default Today

// <p>We are Today</p>
