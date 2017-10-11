class DiversionFactory(){

   constructor(trip, removal_from_store_suggestion_response_array, single_trip_solution = true){

     var a = removal_from_store_suggestion_response_array
     this.undiverted_job   = trip
     this.optimal_branch_lat_lng = a[0].latlng
     this.storage_delivery_lat_lng = a[1]
     this.out_of_store_job = a[4]
     this.closest_branch_to_storage_delivery = a[0]
     this.reRouted_g_directions
     this.g_dir_from_new_branch_to_storage_delivery
     this.distance_saved == undefined
     this.id = +Date.now()
     this.single_trip_solution = single_trip_solution
     this.set_instance_variables(single_trip_solution)

  
  }



}