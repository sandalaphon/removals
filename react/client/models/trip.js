import store from '../store.js'
import { dispatch } from 'redux'
import { set_ids_of_trips } from '../actions/_common_actions'

var trips = []

class Trip {
  constructor(trip_object) {
    var ids = trips.map(trip => {
      return trip.id
    })
    if (ids.includes(trip_object.id)) return
    this.id = trip_object.id
    this.date = trip_object.date
    this.branch_id = trip_object.branch_id
    this.moveware_code = trip_object.moveware_code
    this.client_name = trip_object.client_name
    this.client_address = trip_object.client_address
    this.client_postcode = trip_object.client_postcode
    this.collection_address = trip_object.collection_address
    this.delivery_address = trip_object.delivery_address
    this.delivery_postcode = trip_object.delivery_postcode
    this.allocated = trip_object.allocated
    this.hourly = trip_object.hourly
    this.arrival_time = trip_object.arrival_time
    this.men_requested = trip_object.men_requested
    this.volume = trip_object.volume
    this.notes = trip_object.notes
    this.kind = trip_object.kind
    this.delivery_latlng = trip_object.delivery_latlng
    this.collection_latlng = trip_object.collection_latlng
    this.estimated_hours = trip_object.estimated_hours
    this.branch_code = trip_object.branch_code
    this.google_waypoints_directions = JSON.parse(
      trip_object.google_waypoints_directions
    )
    this.seconds_to_load = trip_object.seconds_to_load
    this.seconds_to_unload = trip_object.seconds_to_unload
    this.dateMilli = trip_object.dateMilli
    this.colour = this.getUniqueColor(trips.length)
    this.complementary_color = this.getComplementaryColour(this.colour)
    this.hidden = {} 
    this.possible_diversions = []
    this.add_trip_to_trips()
  }

  add_trip_to_trips() {
    trips.push(this)
    store.dispatch(set_ids_of_trips(this.id))
  }

  static getTripsByDayMilliAndBranch(dayMilli, branch_code) {
    if (branch_code == 'All_Branches') {
      return trips.filter(trip => {
        return trip.dateMilli === dayMilli
      })
    } else {
      return trips.filter(trip => {
        return trip.branch_code === branch_code && trip.dateMilli == dayMilli
      })
    }
  }

  static getOutOfStoreSuggestions() {
    return trips.filter(trip => {
      return this.out_of_store_suggestion == true
    })
  }

  static hideOrShowById(id, pathname, hide = true){
    var trip = Trip.getTripById(id)
    trip.hidden[pathname] = hide
    console.log('Trip hide or show', trip)
  }

  static getTripsByDateRangeAndBranch(dateRange, branch_code) {
    var difference = dateRange.end_date - dateRange.start_date

    var dateMilliArray = []
    if (difference == 0)
      return Trip.getTripsByDayMilliAndBranch(dateRange.start_date, branch_code)
    for (
      var i = dateRange.start_date;
      i < dateRange.end_date;
      i = i + 86400000
    ) {
      dateMilliArray.push(i)
    }

    if (branch_code == 'All_Branches') {
      return trips.filter(trip => {
        return dateMilliArray.includes(trip.dateMilli)
      })
    } else {
      return trips.filter(trip => {
        return (
          trip.branch_code === branch_code &&
          dateMilliArray.includes(trip.dateMilli)
        )
      })
    }
  }

  static getTripById(id) {
    return trips.find(trip => {
      return trip.id == id
    })
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  getUniqueColor(index) {
    var colours = [
      '#0075DC',
      '#993F00',
      '#003380',
      '#990000',
      '#191919',
      '#740AFF',
      '#FFA405',
      '#4C005C',
      '#2BCE48',
      '#808080',
      '#94FFB5',
      '#8F7C00',
      '#9DCC00',
      '#FFA8BB',
      '#426600',
      '#FF0010',
      '#5EF1F2',
      '#00998F',
      '#C20088',
      '#E0FF66',
      '#FFFF80',
      '#FFFF00',
      '#FF5005',
      '#F0A3FF',
      '#005C31',
      '#FFCC99'
    ]
    if (index < 24) {
      return colours[index]
    } else {
      var newColour = this.getRandomColor()
      if (!colours.includes(newColour)) {
        colours.push(newColour)
        return newColour
      }
    }
  }

  getComplementaryColour(hexString) {
    var complementaryColours = {
      '#0075DC': '#dc5100',
      '#993F00': '#949596',
      '#4C005C': '#ccc12b',
      '#005C31': '#d6a298',
      '#2BCE48': '#ce332b',
      '#FFCC99': '#9999ff',
      '#808080': '#ff0303',
      '#94FFB5': '#ab4537',
      '#8F7C00': '#69008f',
      '#9DCC00': '#cc009c',
      '#C20088': '#88c200',
      '#003380': '#e09e6b',
      '#FFA405': '#4805ff',
      '#FFA8BB': '#5e8557',
      '#426600': '#c70c7c',
      '#FF0010': '#11ff00',
      '#5EF1F2': '#cf7855',
      '#00998F': '#992400',
      '#E0FF66': '#c251a6',
      '#740AFF': '#ffba0a',
      '#990000': '#ffba0a',
      '#FFFF80': '#a85ba4',
      '#FFFF00': '#c204b8',
      '#FF5005': '#8c057f',
      '#F0A3FF': '#7a7750',
      '#191919': '#d6b4b4'
    }
    return complementaryColours[hexString]
  }
}
export default Trip
export { trips }
