import Trip from './trip'

var diversions = []


class Diversion{
  constructor(undiverted_job, delivery_lat_lng, waypoint_diversion_directions, out_of_store_job = null, single_branch_solution= true, closest_branch_to_storage_delivery = null){
    console.log('waypoint diversion directions', waypoint_diversion_directions)
    this.undiverted_job                     = undiverted_job
    this.delivery_lat_lng                   = delivery_lat_lng
    this.waypoint_diversion_directions      = waypoint_diversion_directions
    this.out_of_store_job                   = out_of_store_job
    this.closest_branch_to_storage_delivery = closest_branch_to_storage_delivery

    this.get_nearest_branch_to_storage_delivery()
    .then((g_directions)=>{
      console.log('g-directions', g_directions)
      this.g_directions_from_nearest_branch_to_storage_delivery = g_directions
      this.distance_saved = single_branch_solution ? this.get_single_branch_saving() : this.get_multiple_branch_saving()
    })
    .catch((error)=>{
      console.log('error', error)
    })
    
    

    diversions.push(this)

  }

  get_nearest_branch_to_storage_delivery(){
    return new Promise((resolve, reject)=>{
      var branch_to_storage_delivery_g_directions 
      var branch_lat_lng
      var undiverted_trip = Trip.getTripById(this.undiverted_job.id)
      console.log('undiverted trip', undiverted_trip)
      var distance
      if(this.closest_branch_to_storage_delivery){
        branch_lat_lng = this.closest_branch_to_storage_delivery.latlng
      }else{
       branch_lat_lng = undiverted_trip.google_waypoints_directions.routes[0].legs[0].start_location
      }
      console.log('lat lngs', this.delivery_lat_lng, branch_lat_lng)
      var waypointArray = [{location: this.delivery_lat_lng}]
      var directionInput = {
        origin: branch_lat_lng,
        destination: branch_lat_lng,
        waypoints: waypointArray,
        travelMode: 'DRIVING',
        avoidTolls: true
      }

      var directionsService = new google.maps.DirectionsService()
      directionsService.route(directionInput, function(response, status){
        if(status==='OK'){
          console.log('response', response)
            resolve(branch_to_storage_delivery_g_directions)
         
        }else{
          console.log('in promise error', status)
          reject(status)
        }
      })
    })
   

    // return branch_to_storage_delivery_g_directions
  }

  get_single_branch_saving(){
    var out_of_store_trip                  = Trip.getTripById(this.out_of_store_job.id)
    var out_of_store_total_distance_meters = this.get_trip_distance_in_meters(out_of_store_trip)
    var undiverted_trip                    = Trip.getTripById(this.undiverted_job.id)
    var undiverted_trip_meters             = this.get_trip_distance_in_meters(undiverted_trip)
    var diverted_trip_meters               = this.waypoint_diversion_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    var dist_meters_delivery_from_branch   = this.get_trip_distance_in_meters(this.g_directions_from_nearest_branch_to_storage_delivery, false)
    var saving_meters                      = out_of_store_total_distance_meters - ((diverted_trip_meters - undiverted_trip_meters) + dist_meters_delivery_from_branch)
  }

  get_multiple_branch_saving(){

  }

  

  

  get_trip_distance_in_meters(trip_or_g_directions, trip = true){
    console.log('trip_or_g_directions', trip_or_g_directions)
    if(trip){
      return trip_or_g_directions.google_waypoints_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    }else{
      return trip_or_g_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    }
   
  }

}

export default Diversion







