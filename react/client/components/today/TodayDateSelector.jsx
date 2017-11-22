// import React from "react"
// import { bindActionCreators } from "redux"
// import { connect } from "react-redux"
// import * as todayActions from "../../actions/today_actions"
// import * as commonActions from "../../actions/_common_actions"
// import { mapObjectInstances } from "../../models/mapObject"
// import moment from "moment"
// import { Calendar, DateRange } from "react-date-range"
// import onClickOutside from 'react-onclickoutside'
// import FilterToday from './FilterToday'



// class TodayDateSelector extends React.Component {
//   constructor(props, context) {
//     super(props, context)
//     this.state = {
//       rangePicker: {},
//       datePicker: null
//     }
//   }


//   handleChange(payload) {
//     mapObjectInstances.today.clearMap()
//     this.setState({
//       rangePicker: payload
//     })
//     this.props.actions.common_actions.setCurrentTruckFlickerJob("", "today")
//     var start = payload.startDate.toDate()
//     start.setHours(0, 0, 0, 0)
//     var end = payload.endDate.toDate()
//     end.setHours(0, 0, 0, 0)
//     this.props.actions.today_actions.setTodayDateRange({
//       start_date: +start,
//       end_date: +end
//     })
//     this.props.actions.today_actions.setTodayTrips()
//   }

//   handleDateClick(e) {
//     e.preventDefault()
//     this.props.actions.today_actions.toggleDateOpen()
//     var el = document.getElementById("date_range")
//     el.classList.toggle('hidden')
//     el.classList.toggle('zIndexMinus1')
//     el.classList.toggle('zIndex10')
//   }

//   handleClickOutside() {
//       console.log('click outside')
//      this.props.actions.today_actions.toggleDateOpen()
//       var el = document.getElementById("date_range")
//       el.classList.toggle('hidden')
//       el.classList.toggle('zIndexMinus1')
//       el.classList.toggle('zIndex10')
//   }


//   render() {
//     var now = moment()
//     var defined_ranges = {
//       Today: {
//         startDate: now => {
//           return now
//         },
//         endDate: now => {
//           return now
//         }
//       },
//       Tomorrow: {
//         startDate: now => {
//           return now.add(1, "days")
//         },
//         endDate: now => {
//           return now.add(1, "days")
//         }
//       },
//       "Next 7 Days": {
//         startDate: now => {
//           return now
//         },
//         endDate: now => {
//           return now.add(7, "days")
//         }
//       },
//       "Next 14 Days": {
//         startDate: now => {
//           return now
//         },
//         endDate: now => {
//           return now.add(14, "days")
//         }
//       }
//     }

//     const { rangePicker, linked, datePicker } = this.state
//     const format = "dddd, D MMMM YYYY"
//     this.date = new Date(this.props.today_date_selector)
//     var date_display = this.date.toLocaleDateString()
//     var border_style = this.props.date_open ? {border: '1px solid black'}:{border: ''}

//     return (
//       <div style = {border_style} className = 'today_date_outer'>
//       <div className = 'filter_today'><FilterToday/></div>
//       <div className = 'today_date_selector'>
//         <input
//           onClick={this.handleDateClick.bind(this)}
//           size={"28"}
//           type="text"
//           ref = 'start_date'
//           readOnly
//           value={
//             rangePicker["startDate"] &&
//             rangePicker["startDate"].format(format).toString()
//           }
//         />
//         <i class="fa fa-long-arrow-right" aria-hidden="true" />
//         <input
//           onClick={this.handleDateClick.bind(this)}
//           size={"28"}
//           type="text"
//           ref = 'end_date'
//           readOnly
//           value={
//             rangePicker["endDate"] &&
//             rangePicker["endDate"].format(format).toString()
//           }
//         />
//         <div className="hidden" id="date_range" >
       
//           <DateRange

//             className="hidden"
//             linkedCalendars={true}
//             onInit={this.handleChange.bind(this)}
//             onChange={this.handleChange.bind(this)}
//             ranges={defined_ranges}
//             theme={{
//               Calendar: { width: 275, height: 500 },
//               PredefinedRanges: { marginLeft: 10, marginTop: 10 }
//             }}
//           />
//         </div>
//         </div>

//       </div>
//     )
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   actions: {
//     today_actions: bindActionCreators(todayActions, dispatch),
//     common_actions: bindActionCreators(commonActions, dispatch)
//   }
// })

// const mapStateToProps = state => ({
//   today_date_selector: state.today.today_date_selector,
//   date_open: state.today.date_open
// })

// // export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(TodayDateSelector))
