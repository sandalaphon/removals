var trips = []

class Trip{

constructor(
  date,
  branch_id,
  moveware_code,
  client_name,
  client_address,
  client_postcode,
  collection_address,
  delivery_address,
  delivery_postcode,
  allocated,
  hourly,
  arrival_time,
  men_requested,
  volume,
  notes,
  created_at,
  updated_at,
  kind,
  delivery_latlng,
  collection_latlng,
  estimated_hours,
  google_directions,
  branch_code,
  google_directions_to_branch,
  google_directions_from_branch
  ){
  this.date = date,
  this.branch_id = branch_id,
  this.moveware_code = moveware_code,
  this.client_name = client_name,
  this.client_address = client_address,
  this.client_postcode = client_postcode,
  this.collection_address = collection_address,
  this.delivery_address = delivery_address,
  this.delivery_postcode = delivery_postcode,
  this.allocated = allocated,
  this.hourly = hourly,
  this.arrival_time = arrival_time,
  this.men_requested = men_requested,
  this.volume = volume,
  this.notes = notes,
  this.kind = kind,
  this.delivery_latlng = delivery_latlng,
  this.collection_latlng = collection_latlng,
  this.estimated_hours = estimated_hours,
  this.google_directions = google_directions,
  this.branch_code = branch_code,
  this.google_directions_to_branch = google_directions_to_branch,
  this.google_directions_from_branch = google_directions_from_branch

}

static getTripsByBranchAndDate(branch_code, date){

}

}
export default Trip
export {trips}

