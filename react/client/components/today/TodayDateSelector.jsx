import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as todayActions from '../../actions/today_actions'
import {mapObjectInstances} from '../../models/mapObject'

class TodayDateSelector extends React.Component{

  handleNextDayClick(event){
    event.preventDefault()
    this.date.setDate(this.date.getDate()+1)
    this.props.actions.today_actions.setTodayDateSelector(+this.date)
    mapObjectInstances.today.clearMap()
    this.props.actions.today_actions.setTodayTrips()
  }

  handlePreviousDayClick(event){
    event.preventDefault()
    mapObjectInstances.today.clearMap()
    this.date.setDate(this.date.getDate()-1)
    this.props.actions.today_actions.setTodayDateSelector(+this.date)
    this.props.actions.today_actions.setTodayTrips()
  }

  render(){
    this.date = new Date(this.props.today_date_selector)
    var date_display = this.date.toLocaleDateString()
    return (
      <div>
     <button onClick = {this.handlePreviousDayClick.bind(this)}>Previous Day</button>
      <div>{date_display}</div>
      <button onClick = {this.handleNextDayClick.bind(this)}>Next Day</button>
      </div>
      )
  }

}

const mapDispatchToProps=(dispatch)=>({
  actions: {
   today_actions: bindActionCreators( todayActions, dispatch),
   // common_actions: bindActionCreators( commonActions, dispatch),
 }
})

const mapStateToProps=(state)=>({
  today_date_selector: state.today.today_date_selector,
})


export default connect(mapStateToProps, mapDispatchToProps)(TodayDateSelector)