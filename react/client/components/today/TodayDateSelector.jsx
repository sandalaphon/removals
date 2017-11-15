import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as todayActions from "../../actions/today_actions"
import * as commonActions from "../../actions/_common_actions"
import { mapObjectInstances } from "../../models/mapObject"
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
import moment from "moment"
// import 'react-dates/lib/css/_datepicker.css';
// import { defaultRanges, Calendar, DateRange } from 'react-date-range';
import { Calendar, DateRange } from "react-date-range"
import onClickOutside from 'react-onclickoutside'
import FilterToday from './FilterToday'



class TodayDateSelector extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      rangePicker: {},
      datePicker: null,
      datePickerOpen:false
    }
    this.handleDateClick = this.handleDateClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    // this.handleDateClick() = this.handleDateClick.bind(this)
  }


  handleChange(payload) {
    mapObjectInstances.today.clearMap()
    this.setState({
      rangePicker: payload
    })
    this.props.actions.common_actions.setCurrentTruckFlickerJob("", "today")
    var start = payload.startDate.toDate()
    start.setHours(0, 0, 0, 0)
    var end = payload.endDate.toDate()
    end.setHours(0, 0, 0, 0)
    this.props.actions.today_actions.setTodayDateRange({
      start_date: +start,
      end_date: +end
    })
    this.props.actions.today_actions.setTodayTrips()
  }

  handleDateClick(e) {
    e.preventDefault()


    if(this.state.datePickerOpen){
      var el = document.getElementById("date_range")
      el.classList.toggle('hide-date')
      document.removeEventListener('click',this.handleClickOutside)
      this.setState({datePickerOpen: false})
    }else{
      var el = document.getElementById("date_range")
      el.classList.toggle('hide-date')
      document.addEventListener('click',this.handleClickOutside)

      this.setState({datePickerOpen: true})
    }
    

    
  }

  handleClickOutside(e) {
      console.log('click outside')



     //this.props.actions.today_actions.toggleDateOpen()
      var el = document.getElementById("date_range")
    if(e.target == el){
      document.removeEventListener('click', this.handleClickOutside)
    }else if(!el.contains(e.target)){
      el.classList.toggle('hide-date')
      document.removeEventListener('click', this.handleClickOutside)
      this.setState({datePickerOpen: false})
    }




  }




  // handleNextDayClick(event){
  //   event.preventDefault()
  //   this.date.setDate(this.date.getDate()+1)
  //   this.props.actions.today_actions.setTodayDateSelector(+this.date)
  //   mapObjectInstances.today.clearMap()
  //   this.props.actions.common_actions.setCurrentTruckFlickerJob('', 'today')
  //   this.props.actions.today_actions.setTodayTrips()
  // }

  // handlePreviousDayClick(event){
  //   event.preventDefault()
  //   mapObjectInstances.today.clearMap()
  //   this.date.setDate(this.date.getDate()-1)
  //   this.props.actions.today_actions.setTodayDateSelector(+this.date)
  //   this.props.actions.common_actions.setCurrentTruckFlickerJob('', 'today')
  //   this.props.actions.today_actions.setTodayTrips()
  // }

  // handleSelect(e){
  //   console.log(e)
  // }

  render() {
    var now = moment()
    var defined_ranges = {
      Today: {
        startDate: now => {
          return now
        },
        endDate: now => {
          return now
        }
      },
      Tomorrow: {
        startDate: now => {
          return now.add(1, "days")
        },
        endDate: now => {
          return now.add(1, "days")
        }
      },
      "Next 7 Days": {
        startDate: now => {
          return now
        },
        endDate: now => {
          return now.add(7, "days")
        }
      },
      "Next 14 Days": {
        startDate: now => {
          return now
        },
        endDate: now => {
          return now.add(14, "days")
        }
      }
    }

    const { rangePicker, linked, datePicker } = this.state
    const format = "dddd, D MMMM YYYY"
    this.date = new Date(this.props.today_date_selector)
    var date_display = this.date.toLocaleDateString()
    var border_style = this.props.date_open ? {border: '1px solid black'}:{border: ''}
    return (
      <div>
        <input
          onClick={this.handleDateClick}
          size={"28"}
          type="text"
          ref = 'start_date'
          readOnly
          value={
            rangePicker["startDate"] &&
            rangePicker["startDate"].format(format).toString()
          }
        />
        <i class="fa fa-long-arrow-right" aria-hidden="true" />
        <input
          onClick={this.handleDateClick}
          size={"28"}
          type="text"
          ref = 'end_date'
          readOnly
          value={
            rangePicker["endDate"] &&
            rangePicker["endDate"].format(format).toString()
          }
        />
       
        <div id="date_range" className="date-range-new hide-date">
          <DateRange

            
            linkedCalendars={true}
            onInit={this.handleChange.bind(this)}
            onChange={this.handleChange.bind(this)}
            ranges={defined_ranges}
            theme={{
              Calendar: { width: 300 },
              PredefinedRanges: { marginLeft: 10, marginTop: 10 }
            }}
          />
        </div>
        </div>

      
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    today_actions: bindActionCreators(todayActions, dispatch),
    common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps = state => ({
  today_date_selector: state.today.today_date_selector,
  date_open: state.today.date_open
})

export default connect(mapStateToProps, mapDispatchToProps)(TodayDateSelector)

// <button onClick = {this.handlePreviousDayClick.bind(this)}>Previous Day</button>
//  <div>{date_display}</div>
//  <button onClick = {this.handleNextDayClick.bind(this)}>Next Day</button>
