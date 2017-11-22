import React from "react"
import * as todayActions from "../../actions/today_actions"
import * as commonActions from "../../actions/_common_actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { mapObjectInstances } from "../../models/mapObject"
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'
import loadingGIF from '../../build/images/loading.svg'
import Trip from '../../models/trip'
import Geocoder from '../../models/geocoder'

import { Calendar, DateRange } from "react-date-range"



class ListToday extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapObject: null,
      relevant_array: [],
      rangePicker: {
        startDate: moment(this.props.today_date_range['start_date']),
        endDate: moment(this.props.today_date_range['end_date'])
      },
      datePicker: null
    }
    this.relevant_array = []
  }

  componentDidMount() {
    this.setState({ mapObject: mapObjectInstances.today })
    // this.setState( {rangePicker: {
           
    //       }})
  }

  componentDidUpdate() {
    if (!this.state.mapObject) {
      this.setState({
        mapObject: mapObjectInstances.today
      })
    }

  }

  handlePostCodeChange(event){
    event.preventDefault()

    this.props.actions.today_actions.setTodayPostCode(event.target.value)
    console.log('postcode change', this.props.today_postcode)
  }


  handleDateClick(e) {
    e.preventDefault()
    this.props.actions.today_actions.toggleDateOpen()
    var el = document.getElementById("date_range")
    el.classList.toggle('hidden')
    // console.log('element found', el)
    // el.classList.toggle('zIndexMinus1')
    // el.classList.toggle('zIndex10')
    var list = document.getElementById("today_list")
    list.classList.toggle('hidden')
  }

  // makePlaceholderFilter(placeholder) {
  //   return ({filter, onFilterChange}) => (
  //       <input type='text'
  //         placeholder={placeholder}
  //         style={{
  //           width: '100%'
  //         }}
  //         value={filter ? filter.value : ''}
  //         onChange={(event) => onFilterChange(event.target.value)}
  //       />
  //     )
  // }

  getInitialTableColumns(){

    var branches
    if (this.props.all_branches){
      branches = this.getBranchesAsOptions.call(this)
    }else{
      branches = []
    }
    return [
   
    {
      Header: 'Date Range',
      headerStyle: {overflow: 'visible'},
      accessor: 'date_range',
      maxWidth: 175,
      Filter: ({filter, onChange}) =>{
              const { rangePicker, datePicker } = this.state
              return(
              <div>  
              <input 
              onClick={this.handleDateClick.bind(this)}
              readOnly
              value = {moment(this.props.today_date_range['start_date']).format('DD/MM/YY') + " to " + 
            moment(this.props.today_date_range["end_date"]).format('DD/MM/YY')}
              >
              </input>
              </div>
              )}

    },

    {
      Header: 'Mware No.',
      accessor: 'moveware_code',
      maxWidth: 75
    },
    {
      Header: 'Branch',
      accessor: 'branch',
      maxWidth: 75,
      Filter: ({filter, onChange}) => (
        <select
        onChange={event => onChange(event.target.value)}
        style={{ width: '100%' }}
        // value={filter ? filter.value : 'all'}
        value={this.props.selected_branch}
        >
       
        {branches}
        </select>
        )
    },
    {
      Header: 'Client',
      accessor: 'client_name',
      maxWidth: 150
    },
    {
      Header: 'Find Closest',
      accessor: 'postcode',
      maxWidth: 150,
      // filterRender: this.makePlaceholderFilter("Custom Text"),
      Filter: ({filter, onChange}) =>{
              
              return(
         
              <input 
              style={{maxWidth: 130}}
              type="text"
              value={this.props.today_postcode}
              onChange={this.handlePostCodeChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              ref="collection_postcode"
              id="collection_postcode"
              placeholder = 'Enter PostCode'
              >
              </input>
            
              )}
     

    },
    {
      Header: 'Colour',
      filterable: false,
      maxWidth: 60,
      Cell: row => {
       
            return    (<div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: row.original.colour,
                          borderRadius: '2px'
                        }}
                      >
                                   
                     </div>)
                }
    }
    ]
  }

  displayRoutes(trip){
    if (!this.props.current_today_truckflicker_job) {
    this.state.mapObject.drawRouteWithGoogleResponse(trip)
  }else{
    console.log('truck flicker...')
  }
  }

  handleKeyPress(e){
      if (e.key === 'Enter') {
       console.log('Enter', e)
       if(!this.props.today_postcode){
         alert('Please Enter a Collection Postcode')
         return
       }
       this.props.actions.common_actions.clearCurrentTruckFlickerJob('today')
       mapObjectInstances.today.clearMap()
       this.props.actions.today_actions.togglePostcodeLoading()

       console.log('mapobject', mapObjectInstances.today)
       console.log('branch_selected', this.props.branch_selected)
       var geocoder = new Geocoder()
       var branch = this.props.selected_branch
       var f = this.props.actions.today_actions.getClosestTripsToPostCodeInGivenDateRange
       geocoder.getLatLngPromise(this.props.today_postcode)
       .then((lat_lng)=>{
         mapObjectInstances.today.placeTodayPostCodeMarker.call(mapObjectInstances.today, lat_lng, this.props.today_postcode)
         f.call(this, this.props.today_date_range, lat_lng, branch)
       })
      }
    }

  getInitialTableData(){
    if(this.props.today_closest.length){
      this.relevant_array = this.props.today_closest
    }else{
      this.relevant_array = this.props.today_trips
    }

    var data = []
    this.relevant_array.forEach((trip)=>{
      data.push({
        moveware_code: trip.moveware_code,
        branch: trip.branch_code,
        id: trip.id,
        client_name: trip.client_name,
        colour: trip.complementary_color,
        date_range: moment(trip.dateMilli).format('DD/MM/YY')
      })
    })
    return data
  }

  filterMethod(filter, row) {
    console.log('row in filter', row)
    var haystack = String(row[filter.id])
    var needle = filter.value
    var bool 
    console.log('haystack', haystack)
    if (needle == 'All_Branches'){
      bool = true
    }else{
      bool = haystack.toUpperCase().indexOf(needle.toUpperCase()) >= 0
    } 
    Trip.hideOrShowById(row._original.id, 'today', !bool)
    return bool 
  }

 getBranchesAsOptions() {
   
     var options = []
     options.push(
       <option value={"All_Branches"} key={"today_all_branches"}>
         All_Branches
       </option>
     )
     this.props.all_branches.forEach((branch, i) => {
       options.push(
         <option value={branch.branch_code} key={branch.id}>
           {branch.branch_code}
         </option>
       )
     })

     return options

 }

 getStartEndDateStrings(){
  var start_string
  var end_string
  var format = "ddd, D MMM YY"
  var now = moment()
  var tomorrow = moment()
  tomorrow = tomorrow.add(1, "days")
  now = now.toDate()
  tomorrow = tomorrow.toDate()
  now.setHours(0, 0, 0, 0)
  tomorrow.setHours(0,0,0,0)
  var {start_date, end_date} = this.props.today_date_range
  if(+now == start_date){
    console.log('Today!')
    start_string = 'Today'
    end_string =  +tomorrow == end_date ? 'Tomorrow' : moment(end_date).format(format).toString()
    
   
  }else if(+tomorrow==start_date){
    console.log('TOMORROW')
    start_string = 'Tomorrow'
   end_string =  +tomorrow == end_date ? 'Tomorrow' : moment(end_date).format(format).toString()
  }else{
    console.log('now, start_date', now, +now, start_date)
    console.log('neither today or tomorrow')
    start_string = moment(start_date).format(format).toString()
    end_string = moment(end_date).format(format).toString()

  }
return {start_string, end_string}
 }

 getTitleString(){
  var date_string
  var {start_date, end_date} = this.props.today_date_range
  var {start_string, end_string} = this.getStartEndDateStrings()
 
  if(start_date == end_date){
    date_string = ` ${start_string}`
  }else{
    date_string = `from ${start_string}    to    ${end_string}`
  }
  const title_string = `Routes of ${this.props.selected_branch} ${date_string}`
  return <p><b>
        <em> {title_string} </em>
      </b></p>
 }

 getClosestToPostcodeString(){
  var date_string
  var {start_date, end_date} = this.props.today_date_range
  var {start_string, end_string} = this.getStartEndDateStrings()
  
  if(start_date == end_date){
    date_string = ` ${start_string}`
  }else{
    date_string = `from ${start_string}    to    ${end_string}`
  }

  const title_string = `${this.props.selected_branch} Routes closest to ${this.props.today_postcode} ${date_string}`
  return <p><b>
        <em> {title_string} </em>
      </b></p>

 }

 getTable(title){
  if(this.props.postcode_loading){
    return(
            <div>
               <p><b>
                <em> {`Finding Closest Routes to ${this.props.today_postcode}`}</em>
               </b></p>
               <img src={loadingGIF} />
             </div>
      )
  }else{
    return(
      <div>
        {title}
        <ReactTable
        getTrProps={(state, rowInfo, column) => {
         if(!rowInfo) return {}
           var trip = Trip.getTripById(rowInfo.original.id)
         this.displayRoutes(trip)
            return {
              style: {
                color: rowInfo.original.id == this.props.current_today_truckflicker_job.id ? 'red' : null,
                border: rowInfo.original.colour
              },
              onClick: (e, handleOriginal) => {
            var trip = Trip.getTripById(rowInfo.original.id)
            this.props.actions.common_actions.setCurrentTruckFlickerJob(trip, 'today')
            this.state.mapObject.clearMap()
            this.state.mapObject.drawRouteWithGoogleResponse(trip)
            }
            }
          }}
      
        filterable
        style={{ height: '90vh' }}
        collapseOnDataChange={false}
        data={this.getInitialTableData.call(this)}
        defaultPageSize={10}
        columns={this.getInitialTableColumns.call(this)}
        className="-striped -highlight"
        defaultFilterMethod={this.filterMethod.bind(this)}
        onFilteredChange={(column, value) => {
         console.log('filter change', column, value)
         if(column[0].id=='branch'){
          console.log('branch............', column[0].value)
          this.props.actions.today_actions.setTodayBranchSelected(column[0].value)
         }
         this.props.actions.common_actions.clearCurrentTruckFlickerJob('today')
          this.state.mapObject.displayArrayOfJobRoutes(this.relevant_array)
      }}
        />
     </div>
      )
  }
  
 }

  render() {
    console.log('state.rangePicker["stateDate"]', this.state.rangePicker["startDate"] )
    if(!this.state.mapObject) return <div></div>
      var title, tableOrLoading
      if(!this.props.today_closest.length){
        title = this.getTitleString()
      }else{
        title = this.getClosestToPostcodeString()
      }

    return (
      <div className = "grid-item-list-today" id = 'today_list'>
      
      {this.getTable.call(this, title)}

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
  today_date_range: state.today.today_date_range,
  postcode_loading: state.today.postcode_loading,
  today_postcode: state.today.today_post_code,
  // date_range_obj: state.today.today_date_range,
  selected_branch: state.today.today_branch_selected,
  all_branches: state.common.all_branches,
  today_closest: state.today.today_closest,
  all_trips: state.common.all_trips,
  today_trips: state.today.today_trips,
  current_today_truckflicker_job: state.common.current_today_truckflicker_job
})

export default connect(mapStateToProps, mapDispatchToProps)(ListToday)
