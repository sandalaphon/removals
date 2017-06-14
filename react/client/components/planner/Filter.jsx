import React from 'react'
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap'
import Trip from '../../models/trip'

class Filter extends React.Component {

    doSearch(event){
      this.props.setSearchQuery(event.target.value)
    }

  render(){


    return(
      <div className='grid-item-filter'>
    
        <input className='search-box' type="text" placeholder="Search" onChange={this.doSearch.bind(this)}/>
     
      </div>
    )

  }

}

export default Filter


