var trips = []

class Trip{

constructor(
  trip_object
  ){
this.date                          = trip_object.date,
this.branch_id                     = trip_object.branch_id,
this.moveware_code                 = trip_object.moveware_code,
this.client_name                   = trip_object.client_name,
this.client_address                = trip_object.client_address,
this.client_postcode               = trip_object.client_postcode,
this.collection_address            = trip_object.collection_address,
this.delivery_address              = trip_object.delivery_address,
this.delivery_postcode             = trip_object.delivery_postcode,
this.allocated                     = trip_object.allocated,
this.hourly                        = trip_object.hourly,
this.arrival_time                  = trip_object.arrival_time,
this.men_requested                 = trip_object.men_requested,
this.volume                        = trip_object.volume,
this.notes                         = trip_object.notes,
this.kind                          = trip_object.kind,
this.delivery_latlng               = trip_object.delivery_latlng,
this.collection_latlng             = trip_object.collection_latlng,
this.estimated_hours               = trip_object.estimated_hours,

this.branch_code                   = trip_object.branch_code,
this.google_waypoints_directions   = JSON.parse(trip_object.google_waypoints_directions),
this.seconds_to_load               = trip_object.seconds_to_load,
this.seconds_to_unload             = trip_object.seconds_to_unload,
this.dateMilli                     = trip_object.dateMilli,

  trips.push(this)
}



static getTripsByDayMilliAndBranch(dayMilli, branch_code){
  if(branch_code=='All_Branches'){
    console.log('All_Branches', branch_code)
    console.log('trips', trips)
    var t 
    t = trips.filter((trip)=>{
      return (trip.dateMilli === dayMilli)
    })
    console.log('t', t)
    return t
  }else{
    console.log('else', branch_code)
    return trips.filter((trip)=>{
      return (trip.branch_code===branch_code && trip.dateMilli==dayMilli)
    })
  }
}

}
export default Trip
export {trips}

