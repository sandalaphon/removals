import Trip from './trip'
import Branch from './branch'
import uuidv4 from 'uuid/v4'
import Costs from './costs'
import store from '../store.js'
var diversions = []

class Diversion {
  constructor(formation_object) {
    this.id = uuidv4()
    this.undiverted_job = this.makeATrip(formation_object.undiverted_job)
    this.out_of_store_job = this.makeATrip(formation_object.out_of_store_job)
    this.unloading_hours = this.getUnloadingHours()
    this.optimal_branch_lat_lng = formation_object.optimal_branch_lat_lng
    this.storage_delivery_lat_lng = formation_object.storage_delivery_lat_lng
    this.closest_branch_to_storage_delivery =
      formation_object.closest_branch_to_storage_delivery
    this.reRouted_g_directions = formation_object.reRouted_g_directions
    this.g_dir_from_new_branch_to_storage_delivery =
      formation_object.g_dir_from_new_branch_to_storage_delivery
    this.distance_saved = formation_object.distance_saved
    this.single_trip_solution = formation_object.single_trip_solution
    this.optimal_branch = formation_object.optimal_branch
    this.out_of_store_total_distance_meters =
      formation_object.out_of_store_total_distance_meters
    this.undiverted_trip_meters = formation_object.undiverted_trip_meters
    this.diverted_trip_meters = formation_object.diverted_trip_meters
    this.dist_new_branch_to_storage_delivery_meters =
      formation_object.dist_new_branch_to_storage_delivery_meters
    this.out_of_store_branch = Branch.getBranchByBranchCode(
      this.out_of_store_job.branch_code
    )
    this.out_of_store_branch_savings = this.getOutOfStoreBranchSavings()
    this.collecting_branch_extra_costs = this.getCollectingBranchExtraCost()
    this.delivering_branch_costs = this.getDeliveringBranchCosts()

    this.total_saving = Math.ceil(
      (this.out_of_store_branch_savings -
        this.collecting_branch_extra_costs -
        this.delivering_branch_costs) /
        100
    )
    diversions.push(this)
  }
  //prettier-ignore
  getOutOfStoreBranchSavings() {
    var {
      truck_cost_per_mile,
      driver_cost_per_hour,
      porter_per_hour
    } = this.get_costs()
    // let unload_hours = this.getUnloadingHours()
    let miles        = this.out_of_store_total_distance_meters *  0.000621371
    let fuel_cost    = miles * truck_cost_per_mile 
    let saved_hours  = (miles / 50) + this.unloading_hours +.5 //.5 hours load crates
    let wage_cost    = (saved_hours * driver_cost_per_hour) + (saved_hours * porter_per_hour)
    let out_of_store_branch_saved_costs = fuel_cost + wage_cost
    console.log('unloading hours', this.unloading_hours, this.unloading_hours * (driver_cost_per_hour + porter_per_hour))
    return out_of_store_branch_saved_costs
  }
  //prettier-ignore
  getCollectingBranchExtraCost() {
    // Presumptions:  50 miles per hour average, 18t truck + driver + porter
    var {
      truck_cost_per_mile,
      driver_cost_per_hour,
      porter_per_hour
    } = this.get_costs()
    let miles       = (this.diverted_trip_meters - this.undiverted_trip_meters) * 0.000621371
    let fuel_cost   = miles * truck_cost_per_mile
    
    let extra_hours = (miles / 50) + 1  // +1 hour to collect crates
    let wage_cost   = (extra_hours * driver_cost_per_hour) + (extra_hours * porter_per_hour)
    let collecting_branch_extra_costs = fuel_cost + wage_cost
    return collecting_branch_extra_costs
  }

  get_costs() {
    var {
      fuel_per_mile_18t,
      fuel_per_mile_9t,
      fuel_per_mile_luton,
      driver_per_hour_18t,
      driver_per_hour_9t,
      driver_per_hour_luton,
      porter_per_hour
    } = store.getState().account_management.costs
    console.log('from store costs', store.getState().account_management.costs)
    console.log('fuel per mile 18t', fuel_per_mile_18t)
    let truck_type = this.get_truck_type()
    if (truck_type == '18t') {
      return {
        truck_cost_per_mile: +fuel_per_mile_18t,
        driver_cost_per_hour: +driver_per_hour_18t,
        porter_per_hour: +porter_per_hour
      }
    }
  }

  get_truck_type() {
    return '18t'
  }

  getUnloadingHours() {
    // Presumptions: 1 18t driver + 1 porter 200 cuft per hour
    let vol = +this.out_of_store_job.volume
    return Math.ceil(vol / 200)
  }
  //prettier-ignore
  getDeliveringBranchCosts() {
    let miles        = this.dist_new_branch_to_storage_delivery_meters * 0.000621371
    let drive_hours  = miles / 50
    var {
      truck_cost_per_mile,
      driver_cost_per_hour,
      porter_per_hour
    } = this.get_costs()
    let total_hours   = drive_hours + this.unloading_hours + 0.5
    let cost_per_hour = driver_cost_per_hour + porter_per_hour
    let wage_cost     = total_hours * cost_per_hour
    let truck_cost    = miles * truck_cost_per_mile
    let cost          = truck_cost + wage_cost
      
    return cost
  }

  makeATrip(undiverted_job) {
    var trip = Trip.getTripById(undiverted_job.id)
    if (trip) {
      return trip
    } else {
      trip = new Trip(undiverted_job)
    }
    return trip
  }

  static diversion_factory(
    trip,
    removal_from_store_suggestion_response_array,
    single_trip_solution = true
  ) {
    let a = removal_from_store_suggestion_response_array
    let undiverted_job = trip
    let optimal_branch_lat_lng = a[0].latlng
    let optimal_branch = a[0]
    let storage_delivery_lat_lng = a[1]
    let out_of_store_job = a[4]
    let closest_branch_to_storage_delivery = a[0]
    let reRouted_g_directions
    let g_dir_from_new_branch_to_storage_delivery
    let distances_object
    let new_diversion
    let reRoutedPromise = Diversion.calc_reRoute(
      single_trip_solution,
      undiverted_job,
      out_of_store_job,
      optimal_branch_lat_lng
    )
    var newBranchDeliveryPromise = Diversion.get_new_delivery_branch_to_storage_delivery_g_directions(
      single_trip_solution,
      undiverted_job,
      storage_delivery_lat_lng,
      closest_branch_to_storage_delivery
    )

    return new Promise((resolve, reject) => {
      Promise.all([reRoutedPromise, newBranchDeliveryPromise])
        .then(values => {
          reRouted_g_directions = values[0]
          g_dir_from_new_branch_to_storage_delivery = values[1]
          distances_object = single_trip_solution
            ? Diversion.get_single_branch_saving(
                out_of_store_job,
                undiverted_job,
                g_dir_from_new_branch_to_storage_delivery,
                reRouted_g_directions
              )
            : Diversion.get_multiple_branch_saving(
                reRouted_g_directions,
                out_of_store_job,
                undiverted_job,
                g_dir_from_new_branch_to_storage_delivery
              )

          var {
            distance_saved,
            out_of_store_total_distance_meters,
            undiverted_trip_meters,
            diverted_trip_meters,
            dist_new_branch_to_storage_delivery_meters
          } = distances_object
          // console.log('distances object', distances_object)
          var diversion_formation_object = {
            undiverted_job,
            optimal_branch_lat_lng,
            storage_delivery_lat_lng,
            out_of_store_job,
            closest_branch_to_storage_delivery,
            reRouted_g_directions,
            g_dir_from_new_branch_to_storage_delivery,
            distance_saved,
            single_trip_solution,
            optimal_branch,
            out_of_store_total_distance_meters,
            undiverted_trip_meters,
            diverted_trip_meters,
            dist_new_branch_to_storage_delivery_meters
          }

          new_diversion = new Diversion(diversion_formation_object)

          return new_diversion
        })
        .then(new_diversion => {
          resolve(new_diversion)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static get_ros_result_data_array(moveware_code) {
    return diversions.filter(d => {
      return d.out_of_store_job.moveware_code == moveware_code
    })
  }

  static find_diversions_for_ros_suggestion(trip_id) {
    return diversions.filter(d => {
      return d.out_of_store_job.id == trip_id
    })
  }

  static all_diversions() {
    return diversions
  }

  static get_diversion_by_id(id) {
    return diversions.find(d => {
      return d.id == id
    })
  }

  static calc_reRoute(
    single_trip_solution,
    undiverted_job,
    out_of_store_job,
    optimal_branch_lat_lng
  ) {
    if (single_trip_solution) {
      return Diversion.calc_single_trip_reRoute(
        undiverted_job,
        out_of_store_job
      )
    } else {
      return Diversion.calc_multi_trip_reRoute(
        undiverted_job,
        out_of_store_job,
        optimal_branch_lat_lng
      )
    }
  }

  static calc_single_trip_reRoute(undiverted_job, out_of_store_job) {

    var undiverted_job_home_branch_lat_lng =
      undiverted_job.google_waypoints_directions.routes[0].legs[0]
        .start_location

    var storage_branch_lat_lng =
      out_of_store_job.google_waypoints_directions.routes[0].legs[0]
        .start_location

    var undiverted_job_collection_lat_lng =
      undiverted_job.google_waypoints_directions.routes[0].legs[1]
        .start_location

    var undiverted_job_delivery_lat_lng =
      undiverted_job.google_waypoints_directions.routes[0].legs[1].end_location

    var waypts = [
      { location: undiverted_job_collection_lat_lng },
      { location: undiverted_job_delivery_lat_lng },
      { location: storage_branch_lat_lng }
    ]

    return new Promise((resolve, reject) => {
      var directionInput = {
        origin: undiverted_job_home_branch_lat_lng,
        destination: undiverted_job_home_branch_lat_lng,
        waypoints: waypts,
        travelMode: 'DRIVING',
        avoidTolls: true,
        optimizeWaypoints: false
      }

      var directionsService = new google.maps.DirectionsService()
      directionsService.route(directionInput, function(response, status) {
        if (status === 'OK') {
          resolve(response)
        } else {
          reject(status)

        }
      })
    })

  }

  static calc_multi_trip_reRoute(
    undiverted_job,
    out_of_store_job,
    optimal_branch_lat_lng
  ) {

    var undiverted_job_home_branch_lat_lng =
      undiverted_job.google_waypoints_directions.routes[0].legs[0]
        .start_location

    var storage_branch_lat_lng =
      out_of_store_job.google_waypoints_directions.routes[0].legs[0]
        .start_location

    var undiverted_job_collection_lat_lng =
      undiverted_job.google_waypoints_directions.routes[0].legs[1]
        .start_location

    var undiverted_job_delivery_lat_lng =
      undiverted_job.google_waypoints_directions.routes[0].legs[1].end_location

    var waypts = [
      { location: undiverted_job_collection_lat_lng },
      { location: undiverted_job_delivery_lat_lng },
      { location: storage_branch_lat_lng },
      // {location: this.optimal_branch_lat_lng}
      { location: optimal_branch_lat_lng }
    ]

    return new Promise((resolve, reject) => {
      var directionInput = {
        origin: undiverted_job_home_branch_lat_lng,
        destination: undiverted_job_home_branch_lat_lng,
        waypoints: waypts,
        travelMode: 'DRIVING',
        avoidTolls: true,
        optimizeWaypoints: false
      }

      var directionsService = new google.maps.DirectionsService()
      directionsService.route(directionInput, function(response, status) {
        if (status === 'OK') {
          console.log('res ', response)
          resolve(response)
        } else {
          console.log('error calc_single_trip', status)
          reject(status)
        }
      })
    })

  }

  static get_new_delivery_branch_to_storage_delivery_g_directions(
    single_trip_solution,
    undiverted_job,
    storage_delivery_lat_lng,
    closest_branch_to_storage_delivery
  ) {
    return new Promise((resolve, reject) => {
      var branch_to_storage_delivery_g_directions
      var branch_lat_lng
      // var undiverted_trip = Trip.getTripById(this.undiverted_job.id)
      var undiverted_trip = Trip.getTripById(undiverted_job.id)

      var distance
      if (single_trip_solution) {
        branch_lat_lng =
          undiverted_trip.google_waypoints_directions.routes[0].legs[0]
            .start_location
      } else {
        // branch_lat_lng = this.closest_branch_to_storage_delivery.latlng
        branch_lat_lng = closest_branch_to_storage_delivery.latlng
      }
      // var waypointArray = [{location: this.storage_delivery_lat_lng}]
      var waypointArray = [{ location: storage_delivery_lat_lng }]
      var directionInput = {
        origin: branch_lat_lng,
        destination: branch_lat_lng,
        waypoints: waypointArray,
        travelMode: 'DRIVING',
        avoidTolls: true
      }

      var directionsService = new google.maps.DirectionsService()
      directionsService.route(directionInput, function(response, status) {
        if (status === 'OK') {
          console.log('response', response)
          resolve(response)
        } else {
          console.log('in promise error', status)
          reject(status)
        }
      })
    })

    // return branch_to_storage_delivery_g_directions
  }

  static get_single_branch_saving(
    out_of_store_job,
    undiverted_job,
    g_dir_from_new_branch_to_storage_delivery,
    reRouted_g_directions
  ) {
    
    var out_of_store_total_distance_meters = Diversion.get_trip_distance_in_meters(
      out_of_store_job
    )

    var undiverted_trip_meters = Diversion.get_trip_distance_in_meters(
      undiverted_job
    )

    var diverted_trip_meters = reRouted_g_directions.routes[0].legs.reduce(
      (acc, leg) => {
        return acc + leg.distance.value
      },
      0
    )

    var dist_new_branch_to_storage_delivery_meters = Diversion.get_trip_distance_in_meters(
      g_dir_from_new_branch_to_storage_delivery,
      false
    )

    var a = out_of_store_total_distance_meters
    var b = undiverted_trip_meters
    var c = diverted_trip_meters
    var d = dist_new_branch_to_storage_delivery_meters

    var distance_saved = a + b - (c + d)

    return {
      distance_saved,
      out_of_store_total_distance_meters,
      undiverted_trip_meters,
      diverted_trip_meters,
      dist_new_branch_to_storage_delivery_meters
    }
  }

  static get_multiple_branch_saving(
    reRouted_g_directions,
    out_of_store_job,
    undiverted_job,
    g_dir_from_new_branch_to_storage_delivery
  ) {
    // var out_of_store_total_distance_meters = this.get_trip_distance_in_meters(this.out_of_store_job)
    var out_of_store_total_distance_meters = Diversion.get_trip_distance_in_meters(
      out_of_store_job
    )

    // var undiverted_trip_meters             = this.get_trip_distance_in_meters(this.undiverted_job)
    var undiverted_trip_meters = Diversion.get_trip_distance_in_meters(
      undiverted_job
    )
    var diverted_trip_meters = reRouted_g_directions.routes[0].legs.reduce(
      (acc, leg) => {
        return acc + leg.distance.value
      },
      0
    )
    // var dist_new_branch_to_storage_delivery_meters   = this.get_trip_distance_in_meters(this.g_dir_from_new_branch_to_storage_delivery, false)
    var dist_new_branch_to_storage_delivery_meters = Diversion.get_trip_distance_in_meters(
      g_dir_from_new_branch_to_storage_delivery,
      false
    )

    var a = out_of_store_total_distance_meters
    var b = undiverted_trip_meters
    var c = diverted_trip_meters
    var d = dist_new_branch_to_storage_delivery_meters

    var distance_saved = a + b - (c + d)

    console.log('client name', undiverted_job.client_name)
    console.log('multi branch distance_saved', distance_saved)
    console.log('a,b,c,d', a, b, c, d)
    return {
      distance_saved,
      out_of_store_total_distance_meters,
      undiverted_trip_meters,
      diverted_trip_meters,
      dist_new_branch_to_storage_delivery_meters
    }
  }

  static get_trip_distance_in_meters(trip_or_g_directions, trip = true) {
    if (trip) {
      return trip_or_g_directions.google_waypoints_directions.routes[0].legs.reduce(
        (acc, leg) => {
          return acc + leg.distance.value
        },
        0
      )
    } else {
      return trip_or_g_directions.routes[0].legs.reduce((acc, leg) => {
        return acc + leg.distance.value
      }, 0)
    }
  }
}

export default Diversion
