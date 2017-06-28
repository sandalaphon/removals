import React from 'react'
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap'
import Trip from '../../models/trip'
import {setHiddenStatus, setUnhiddenStatus} from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Filter extends React.Component {

    doSearch(event){

      // this.props.setSearchQuery(event.target.value)
      this.props.all_trips.forEach((job)=>{

        var clientName = (job.client_name||'').toUpperCase()
        var searchString = (event.target.value||'').toUpperCase()
        if(
          clientName.indexOf(searchString)>=0
          ){
          this.props.actions.setHiddenStatus(job)
        }else{
          this.props.actions.setUnhiddenStatus(job)
        }
      })

    }

  render(){


    return(
      <div className='grid-item-filter'>
    
        <input className='search-box' type="text" placeholder="Search" onChange={this.doSearch.bind(this)}/>
     
      </div>
    )

  }

}



const mapDispatchToProps=(dispatch)=>({
  actions: bindActionCreators( {setHiddenStatus, setUnhiddenStatus}, dispatch)
})
const mapStateToProps=(state)=>({ all_trips: state.trips.all_trips, all_trips_reference: state.trips.all_trips_reference, searchString: state.trips.searchString})


export default connect(mapStateToProps, mapDispatchToProps)(Filter)


