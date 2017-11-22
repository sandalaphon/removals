import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as todayActions from "../../actions/today_actions"
import * as commonActions from "../../actions/_common_actions"
import { mapObjectInstances } from "../../models/mapObject"
import moment from "moment"
import { Calendar, DateRange } from "react-date-range"
import onClickOutside from 'react-onclickoutside'
// import FilterToday from './FilterToday'

class DateSelector extends React.Component{
  constructor(props, context){
    super(props, context)
    this.state = {
      rangePicker: {},
      datePicker: null
    }
  }

  componentWillMount(){
    this.setState({
      rangePicker: {
        startDate: moment(this.props.today_date_range['start_date']),
        endDate: moment(this.props.today_date_range['end_date'])
      }
    })
  }

  handleClickOutside() {
      console.log('click outside')
     this.props.actions.today_actions.toggleDateOpen()
     // if(this.props.date_open)
      var el = document.getElementById("date_range")
      el.classList.toggle('hidden')
      // el.classList.toggle('zIndexMinus1')
      // el.classList.toggle('zIndex10')
      var list = document.getElementById("today_list")
      list.classList.toggle('hidden')
  }

  handleChange(payload) {
    console.log('payload', payload)
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

  handleInit(payload){
    console.log('payload', payload)
   
  }

  render(){
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
    return(
      <div className="date-range hidden" id="date_range">
      <i class="fa fa-window-close fa-3x" aria-hidden="true" onClick = {this.handleClickOutside.bind(this)}></i>
        <DateRange
          startDate={moment(this.props.today_date_range.start_date)}
          endDate={moment(this.props.today_date_range.end_date)}
          linkedCalendars={true}
          onInit={this.handleChange.bind(this)}
          onChange={this.handleChange.bind(this)}
          ranges={defined_ranges}
          theme={{
            Calendar: { width: 275, height: 500 },
            PredefinedRanges: { marginLeft: 10, marginTop: 10 }
          }}
        />
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
  today_date_range: state.today.today_date_range,
  date_open: state.today.date_open
})

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(DateSelector))




