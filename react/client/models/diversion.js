import Trip from './trip'
import uuidv4 from 'uuid/v4'

var diversions = []

class Diversion{

  // constructor(trip, removal_from_store_suggestion_response_array, single_trip_solution = true){
  constructor(
    undiverted_job, 
    optimal_branch_lat_lng, 
    storage_delivery_lat_lng, 
    out_of_store_job, 
    closest_branch_to_storage_delivery, 
    reRouted_g_directions, 
    g_dir_from_new_branch_to_storage_delivery, 
    distance_saved, 
    single_trip_solution,
    optimal_branch
    ){
    this.id = uuidv4()
    this.undiverted_job = undiverted_job, 
    this.optimal_branch_lat_lng = optimal_branch_lat_lng, 
    this.storage_delivery_lat_lng =storage_delivery_lat_lng, 
    this.out_of_store_job = out_of_store_job, 
    this.closest_branch_to_storage_delivery = closest_branch_to_storage_delivery, 
    this.reRouted_g_directions = reRouted_g_directions, 
    this.g_dir_from_new_branch_to_storage_delivery = g_dir_from_new_branch_to_storage_delivery, 
    this.distance_saved = distance_saved, 
    this.single_trip_solution = single_trip_solution,
    this.optimal_branch = optimal_branch
    diversions.push(this)
 
 }

 static diversion_factory(trip, removal_from_store_suggestion_response_array, single_trip_solution = true){
  var a = removal_from_store_suggestion_response_array
  var undiverted_job   = trip
  var optimal_branch_lat_lng = a[0].latlng
  var optimal_branch = a[0]
  var storage_delivery_lat_lng = a[1]
  var out_of_store_job = a[4]
  var closest_branch_to_storage_delivery = a[0]
  var reRouted_g_directions
  var g_dir_from_new_branch_to_storage_delivery
  var distance_saved
  var new_diversion
  var reRoutedPromise = Diversion.calc_reRoute(single_trip_solution, undiverted_job, out_of_store_job, optimal_branch_lat_lng)
  var newBranchDeliveryPromise = Diversion.get_new_delivery_branch_to_storage_delivery_g_directions(single_trip_solution, undiverted_job, storage_delivery_lat_lng, closest_branch_to_storage_delivery)

return new Promise((resolve, reject)=>{

  Promise.all([reRoutedPromise, newBranchDeliveryPromise])
  .then((values)=>{
    reRouted_g_directions = values[0]
    g_dir_from_new_branch_to_storage_delivery = values[1]
    distance_saved = single_trip_solution ? 
    Diversion.get_single_branch_saving(out_of_store_job, undiverted_job, g_dir_from_new_branch_to_storage_delivery, reRouted_g_directions) 
    : Diversion.get_multiple_branch_saving(reRouted_g_directions, out_of_store_job, undiverted_job, g_dir_from_new_branch_to_storage_delivery)
  
      new_diversion = new Diversion(undiverted_job, optimal_branch_lat_lng, storage_delivery_lat_lng, out_of_store_job, closest_branch_to_storage_delivery, reRouted_g_directions, g_dir_from_new_branch_to_storage_delivery, distance_saved, single_trip_solution, optimal_branch)
    
     return new_diversion
    
  })
  .then((new_diversion)=>{
    resolve(new_diversion) 
  })
  .catch((error)=>{
    reject(error)
  })
})
}


static get_ros_result_data_array(moveware_code){
  return diversions.filter((d)=>{
    return d.out_of_store_job.moveware_code == moveware_code
  })
}

static find_diversions_for_ros_suggestion(trip_id){
  return diversions.filter((d)=>{
    return d.out_of_store_job.id == trip_id
  })
}

static all_diversions(){
  return diversions
}

static get_diversion_by_id(id){
  return diversions.find((d)=>{
    return d.id == id
  })
}



static calc_reRoute(single_trip_solution, undiverted_job, out_of_store_job, optimal_branch_lat_lng){
  if(single_trip_solution){
    return Diversion.calc_single_trip_reRoute(undiverted_job, out_of_store_job)
  }else{
    return Diversion.calc_multi_trip_reRoute(undiverted_job, out_of_store_job, optimal_branch_lat_lng)
  }
}

static calc_single_trip_reRoute(undiverted_job, out_of_store_job){
  // start branch lat lng
  //  initial job collection
  // inital job delivery
  // storage branch lat lng
  // var g_dir
  // var undiverted_job_home_branch_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[0].start_location
  var undiverted_job_home_branch_lat_lng = undiverted_job.google_waypoints_directions.routes[0].legs[0].start_location
  // var storage_branch_lat_lng = this.out_of_store_job.google_waypoints_directions.routes[0].legs[0].start_location
  var storage_branch_lat_lng = out_of_store_job.google_waypoints_directions.routes[0].legs[0].start_location
  // var undiverted_job_collection_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[1].start_location
  var undiverted_job_collection_lat_lng = undiverted_job.google_waypoints_directions.routes[0].legs[1].start_location
  // var undiverted_job_delivery_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[1].end_location
  var undiverted_job_delivery_lat_lng = undiverted_job.google_waypoints_directions.routes[0].legs[1].end_location

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

static calc_multi_trip_reRoute(undiverted_job, out_of_store_job, optimal_branch_lat_lng){
  // start branch lat lng
  //  initial job collection
  // inital job delivery
  // storage branch lat lng
  // optimal branch lat lng

  // var g_dir
  // var undiverted_job_home_branch_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[0].start_location
  var undiverted_job_home_branch_lat_lng = undiverted_job.google_waypoints_directions.routes[0].legs[0].start_location
  // var storage_branch_lat_lng = this.out_of_store_job.google_waypoints_directions.routes[0].legs[0].start_location
  var storage_branch_lat_lng = out_of_store_job.google_waypoints_directions.routes[0].legs[0].start_location
  // var undiverted_job_collection_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[1].start_location
  var undiverted_job_collection_lat_lng = undiverted_job.google_waypoints_directions.routes[0].legs[1].start_location
  // var undiverted_job_delivery_lat_lng = this.undiverted_job.google_waypoints_directions.routes[0].legs[1].end_location
  var undiverted_job_delivery_lat_lng = undiverted_job.google_waypoints_directions.routes[0].legs[1].end_location

  var waypts = [
  {location: undiverted_job_collection_lat_lng}, 
  {location: undiverted_job_delivery_lat_lng}, 
  {location: storage_branch_lat_lng},
  // {location: this.optimal_branch_lat_lng}
  {location: optimal_branch_lat_lng}
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








static get_new_delivery_branch_to_storage_delivery_g_directions(single_trip_solution, undiverted_job, storage_delivery_lat_lng, closest_branch_to_storage_delivery){
  return new Promise((resolve, reject)=>{
    var branch_to_storage_delivery_g_directions 
    var branch_lat_lng
    // var undiverted_trip = Trip.getTripById(this.undiverted_job.id)
    var undiverted_trip = Trip.getTripById(undiverted_job.id)

    var distance
    if(single_trip_solution){
      branch_lat_lng = undiverted_trip.google_waypoints_directions.routes[0].legs[0].start_location
      
    }else{
     // branch_lat_lng = this.closest_branch_to_storage_delivery.latlng
     branch_lat_lng = closest_branch_to_storage_delivery.latlng
   }
   // var waypointArray = [{location: this.storage_delivery_lat_lng}]
   var waypointArray = [{location: storage_delivery_lat_lng}]
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

  static get_single_branch_saving(out_of_store_job, undiverted_job, g_dir_from_new_branch_to_storage_delivery, reRouted_g_directions){
    
    // var out_of_store_total_distance_meters = this.get_trip_distance_in_meters(this.out_of_store_job)
    var out_of_store_total_distance_meters = Diversion.get_trip_distance_in_meters(out_of_store_job)
    // var undiverted_trip_meters             = this.get_trip_distance_in_meters(this.undiverted_job)
    var undiverted_trip_meters             = Diversion.get_trip_distance_in_meters(undiverted_job)

    // var diverted_trip_meters               = this.reRouted_g_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    var diverted_trip_meters               = reRouted_g_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    // var dist_new_branch_to_storage_delivery_meters   = this.get_trip_distance_in_meters(this.g_dir_from_new_branch_to_storage_delivery, false)
    var dist_new_branch_to_storage_delivery_meters   = Diversion.get_trip_distance_in_meters(g_dir_from_new_branch_to_storage_delivery, false)

    var a = out_of_store_total_distance_meters
    var b = undiverted_trip_meters
    var c = diverted_trip_meters 
    var d = dist_new_branch_to_storage_delivery_meters

    var saving_meters = (a+b) - (c+d)
    // var saving_meters                      = out_of_store_total_distance_meters - ((diverted_trip_meters - undiverted_trip_meters) + dist_new_branch_to_storage_delivery_meters)
    console.log('client name', undiverted_job.client_name)
    console.log('saving_meters', saving_meters)
    console.log('a,b,c,d', a, b, c, d)
    return saving_meters
  }

  static get_multiple_branch_saving(reRouted_g_directions, out_of_store_job, undiverted_job, g_dir_from_new_branch_to_storage_delivery){

    // var out_of_store_total_distance_meters = this.get_trip_distance_in_meters(this.out_of_store_job)
    var out_of_store_total_distance_meters = Diversion.get_trip_distance_in_meters(out_of_store_job)

    // var undiverted_trip_meters             = this.get_trip_distance_in_meters(this.undiverted_job)
    var undiverted_trip_meters             = Diversion.get_trip_distance_in_meters(undiverted_job)
    var diverted_trip_meters               = reRouted_g_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    // var dist_new_branch_to_storage_delivery_meters   = this.get_trip_distance_in_meters(this.g_dir_from_new_branch_to_storage_delivery, false)
    var dist_new_branch_to_storage_delivery_meters   = Diversion.get_trip_distance_in_meters(g_dir_from_new_branch_to_storage_delivery, false)

    var a = out_of_store_total_distance_meters
    var b = undiverted_trip_meters
    var c = diverted_trip_meters 
    var d = dist_new_branch_to_storage_delivery_meters

    var saving_meters = (a+b) - (c+d)

    console.log('client name', undiverted_job.client_name)
    console.log('multi branch saving_meters', saving_meters)
    console.log('a,b,c,d', a, b, c, d)
    return saving_meters
  }

  

  

  static get_trip_distance_in_meters(trip_or_g_directions, trip = true){

    if(trip){
      return trip_or_g_directions.google_waypoints_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    }else{
      return trip_or_g_directions.routes[0].legs.reduce((acc, leg)=>{return acc + leg.distance.value},0)
    }

  }











}

export default Diversion







