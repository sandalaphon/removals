import Trip from './trip'

var diversions = []


class Diversion{


  constructor(trip, removal_from_store_suggestion_response_array, single_trip_solution = true){

    var a = removal_from_store_suggestion_response_array
    this.undiverted_job   = trip
    this.optimal_branch_lat_lng = a[0].latlng
    this.storage_delivery_lat_lng = a[1]
    this.out_of_store_job = a[4]
    this.closest_branch_to_storage_delivery = a[0]
    // this.reRouted_g_directions = this.calc_reRoute(single_trip_solution) //now a promise
    this.reRouted_g_directions
    this.g_dir_from_new_branch_to_storage_delivery
    this.distance_saved
    this.set_instance_variables(single_trip_solution)
    diversions.push(this)
 
 }



 set_instance_variables(single_trip_solution){
  var reRoutedPromise = this.calc_reRoute(single_trip_solution)
  var newBranchDeliveryPromise = this.get_new_delivery_branch_to_storage_delivery_g_directions(single_trip_solution)
  Promise.all([reRoutedPromise, newBranchDeliveryPromise])
  .then((values)=>{
    this.reRouted_g_directions = values[0]
    this.g_dir_from_new_branch_to_storage_delivery = values[1]
    this.distance_saved = single_trip_solution ? this.get_single_branch_saving() : this.get_multiple_branch_saving()
  })
  .catch((error)=>{
    console.log(error)
  })
 //  this.get_new_delivery_branch_to_storage_delivery_g_directions(single_trip_solution)
 //  .then((g_directions)=>{
 //   this.g_dir_from_new_branch_to_storage_delivery = g_directions
 //   this.distance_saved = single_trip_solution ? this.get_single_branch_saving() : this.get_multiple_branch_saving()
 // })
 //  .catch((error)=>{
 //   console.log('error', error)
 // })
}



calc_reRoute(single_trip_solution){
  if(single_trip_solution){
    return this.calc_single_trip_reRoute()
  }else{
    return this.calc_multi_trip_reRoute()
  }
}

calc_single_trip_reRoute(){
  // start branch lat lng
  //  initial job collection
  // inital job delivery
  // storage branch lat lng
  // var g_dir
  var undiverted_job_home_branch_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[0].start_location
  var storage_branch_lat_lng = this.out_of_store_job.google_waypoints_directions.routes[0].legs[0].start_location
  var undiverted_job_collection_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[1].start_location
  var undiverted_job_delivery_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[1].end_location

  var waypts = [
  {location: undiverted_job_collection_lat_lng}, 
  {location: undiverted_job_delivery_lat_lng}, 
  {location: storage_branch_lat_lng}
  ]

  return new Promise((resolve, reject)=>{
    var directionInput = {
      origin: undiverted_job_home_branch_lat_lng,
      destination: undiverted_job_home_branch_lat_lng,
      waypoints: waypts,
      travelMode: 'DRIVING',
      avoidTolls: true,
      optimizeWaypoints: false
    }

    var directionsService = new google.maps.DirectionsService()
    directionsService.route(directionInput, function(response, status){
        if(status==='OK'){
     console.log('res ', response)
       // g_dir = response
            resolve(response)
         
        }else{
          reject(status)
          // console.log('error calc_single_trip', status)
        }
      })
  })


  // return g_dir
}

calc_multi_trip_reRoute(){
  // start branch lat lng
  //  initial job collection
  // inital job delivery
  // storage branch lat lng
  // optimal branch lat lng

  // var g_dir
  var undiverted_job_home_branch_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[0].start_location
  var storage_branch_lat_lng = this.out_of_store_job.google_waypoints_directions.routes[0].legs[0].start_location
  var undiverted_job_collection_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[1].start_location
  var undiverted_job_delivery_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[1].end_location

  var waypts = [
  {location: undiverted_job_collection_lat_lng}, 
  {location: undiverted_job_delivery_lat_lng}, 
  {location: storage_branch_lat_lng},
  {location: this.optimal_branch_lat_lng}
  ]
  
  return new Promise((resolve, reject)=>{
    var directionInput = {
      origin: undiverted_job_home_branch_lat_lng,
      destination: undiverted_job_home_branch_lat_lng,
      waypoints: waypts,
      travelMode: 'DRIVING',
      avoidTolls: true,
      optimizeWaypoints: false
    }

    var directionsService = new google.maps.DirectionsService()
    directionsService.route(directionInput, function(response, status){
        if(status==='OK'){
     console.log('res ', response)
      resolve(response)
            
         
        }else{
          console.log('error calc_single_trip', status)
          reject(status)
        }
      })
  })

  
  // return g_dir
}








get_new_delivery_branch_to_storage_delivery_g_directions(single_trip_solution){
  return new Promise((resolve, reject)=>{
    var branch_to_storage_delivery_g_directions 
    var branch_lat_lng
    var undiverted_trip = Trip.getTripById(this.undiverted_job.id)

    var distance
    if(single_trip_solution){
      branch_lat_lng = undiverted_trip.google_waypoints_directions.routes[0].legs[0].start_location
      
    }else{
     branch_lat_lng = this.closest_branch_to_storage_delivery.latlng
   }
   var waypointArray = [{location: this.storage_delivery_lat_lng}]
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
      resolve(response)

    }else{
      console.log('in promise error', status)
      reject(status)
    }
  })
})


    // return branch_to_storage_delivery_g_directions
  }

  get_single_branch_saving(){
    // var out_of_store_trip                  = Trip.getTripById(this.out_of_store_job.id)
    var out_of_store_total_distance_meters = this.get_trip_distance_in_meters(this.out_of_store_job)
    // var undiverted_trip                    = Trip.getTripById(this.undiverted_job.id)
    var undiverted_trip_meters             = this.get_trip_distance_in_meters(this.undiverted_job)

    var diverted_trip_meters               = this.reRouted_g_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    var dist_new_branch_to_storage_delivery_meters   = this.get_trip_distance_in_meters(this.g_dir_from_new_branch_to_storage_delivery, false)

    var a = out_of_store_total_distance_meters
    var b = undiverted_trip_meters
    var c = diverted_trip_meters 
    var d = dist_new_branch_to_storage_delivery_meters

    var saving_meters = (a+b) - (c+d)
    // var saving_meters                      = out_of_store_total_distance_meters - ((diverted_trip_meters - undiverted_trip_meters) + dist_new_branch_to_storage_delivery_meters)
    console.log('client name', this.undiverted_job.client_name)
    console.log('saving_meters', saving_meters)
    console.log('a,b,c,d', a, b, c, d)
    return saving_meters
  }

  get_multiple_branch_saving(){

    var out_of_store_total_distance_meters = this.get_trip_distance_in_meters(this.out_of_store_job)
    // var undiverted_trip                    = Trip.getTripById(this.undiverted_job.id)
    var undiverted_trip_meters             = this.get_trip_distance_in_meters(this.undiverted_job)

    var diverted_trip_meters               = this.reRouted_g_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    var dist_new_branch_to_storage_delivery_meters   = this.get_trip_distance_in_meters(this.g_dir_from_new_branch_to_storage_delivery, false)

    var a = out_of_store_total_distance_meters
    var b = undiverted_trip_meters
    var c = diverted_trip_meters 
    var d = dist_new_branch_to_storage_delivery_meters

    var saving_meters = (a+b) - (c+d)

    console.log('client name', this.undiverted_job.client_name)
    console.log('multi branch saving_meters', saving_meters)
    console.log('a,b,c,d', a, b, c, d)
    return saving_meters
  }

  

  

  get_trip_distance_in_meters(trip_or_g_directions, trip = true){

    if(trip){
      return trip_or_g_directions.google_waypoints_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    }else{
      return trip_or_g_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    }

  }











}

export default Diversion







