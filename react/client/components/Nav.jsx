import React from 'react'
import {Link} from 'react-router'

class Nav extends React.Component {
 render(){
  return(
    <div>
    <h1>I am so Nav</h1>
    <Link to = "home">Home</Link>
    <Link to = "planner">Planner</Link>
    <Link to = "surveyors_diary">Surveyors Diary</Link>
    <Link to = "update_data">Drop CSV File in Box</Link>
    </div>
    )
 }
}

export default Nav