import React from 'react'
import Gmap from '../Gmap'
import Filter from '../planner/Filter'
import ListToday from './ListToday'


class Today extends React.Component {
  render(){
    return(
      <div className = 'grid-today'>
      <Gmap/>
      <ListToday />
      </div>
      )
  }
}

export default Today

// <p>We are Today</p>
