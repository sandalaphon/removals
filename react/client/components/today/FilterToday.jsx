// import React from "react"
// import { connect } from "react-redux"
// import * as commonActions from "../../actions/_common_actions"
// import * as todayActions from "../../actions/today_actions"
// import { bindActionCreators } from "redux"
// import { mapObjectInstances } from "../../models/mapObject"
// import Geocoder from "../../models/geocoder.js"

// class FilterToday extends React.Component {

//   handlePostCodeChange(event){
//     event.preventDefault()
//     this.props.actions.today_actions.setTodayPostCode(event.target.value)
//   }

//   handlePostCodeSubmit(e){
//     e.preventDefault()
//     if(!this.props.today_post_code){
//       alert('Please Enter a Collection Postcode')
//       return
//     }
//     this.props.actions.common_actions.clearCurrentTruckFlickerJob('today')
//     mapObjectInstances.today.clearMap()
//     this.props.actions.today_actions.togglePostcodeLoading()

//     console.log('mapobject', mapObjectInstances.today)
//     console.log('branch_selected', this.props.branch_selected)
//     var geocoder = new Geocoder()
//     var branch = this.props.branch_selected
//     var f = this.props.actions.today_actions.getClosestTripsToPostCodeInGivenDateRange
//     geocoder.getLatLngPromise(this.props.today_post_code)
//     .then((lat_lng)=>{
//       mapObjectInstances.today.placeTodayPostCodeMarker.call(mapObjectInstances.today, lat_lng, this.props.today_post_code)
//       f.call(this, this.props.today_date_range, lat_lng, branch)
//     })
//   }

//   logger(arg1, arg2){
//     console.log(arg1, arg2)
//     alert(`arg1 ${arg1}, and arg2 ${arg2}`)
//   }

//   render() {
//     return (
//       <div>
      

//         <form onSubmit={this.handlePostCodeSubmit.bind(this)}>
         
       
//           <input
//             value={this.props.today_post_code}
//             type="text"
//             onChange={this.handlePostCodeChange.bind(this)}
//             ref="collection_postcode"
//             id="collection_postcode"
//             placeholder="Closest to Postcode"
//           />
  
//           <input type="submit" />
//         </form>

//       </div>
//     )
//   }
// }


// const mapDispatchToProps = dispatch => ({
//   actions: {
//     common_actions: bindActionCreators(commonActions, dispatch),
//     today_actions: bindActionCreators(todayActions, dispatch)
//   }
// })

// const mapStateToProps = state => ({
//   branch_selected: state.today.today_branch_selected,
//   all_branches: state.common.all_branches,
//   today_post_code: state.today.today_post_code,
//   today_date_range: state.today.today_date_range
// })

// export default connect(mapStateToProps, mapDispatchToProps)(FilterToday)

// // <br />
// // <label htmlFor="collection_postcode">
// //   Find Closest:
// // </label>

// // <form>
// //   Select Branch:
// //   <select
// //     id="today_branch_selector"
// //     value={this.props.branch_selected}
// //     onChange={this.handleBranchSelectorChange.bind(this)}
// //   >
// //     {this.getBranchesAsOptions.call(this)}
// //   </select>
// // </form>
