import React from 'react'
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap'
import Trip from '../../models/trip'
import {setHiddenStatus, setUnhiddenStatus, setFilterSearchString, clearCurrentTruckFlickerJob} from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {mapObjectInstances} from '../../models/mapObject'

class Filter extends React.Component {

    doSearch(event){
      mapObjectInstances.planner.clearMap()
      this.props.actions.clearCurrentTruckFlickerJob('planner')

      // this.props.setSearchQuery(event.target.value)
      this.props.all_trips.forEach((job)=>{

        var clientName = (job.client_name||'').toUpperCase()
        var searchString = (event.target.value||'').toUpperCase()
        this.props.actions.setFilterSearchString(event.target.value)
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

    var searchPlaceHolder = this.props.filter_search_string || 'Search'
    var searchBoxText = ''
    if(this.props.filter_search_string) searchBoxText = this.props.filter_search_string

    return(
      <div className='grid-item-filter'>
    
        <input className='search-box' type="text" placeholder={searchPlaceHolder} value = {searchBoxText} onChange={this.doSearch.bind(this)}/>
     
      </div>
    )

  }

}



const mapDispatchToProps=(dispatch)=>({
  actions: bindActionCreators( {setHiddenStatus, setUnhiddenStatus, setFilterSearchString, clearCurrentTruckFlickerJob}, dispatch)
})
const mapStateToProps=(state)=>({ all_trips: state.trips.all_trips, all_trips_reference: state.trips.all_trips_reference, filter_search_string: state.trips.filter_search_string})


export default connect(mapStateToProps, mapDispatchToProps)(Filter)


