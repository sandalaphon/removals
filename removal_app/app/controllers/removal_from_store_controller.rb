class RemovalFromStoreController < ApplicationController
  before_action :authenticate_user!

  def index
  start_date    = params[:start_date]
  end_date      = params[:end_date]
  moveware_code = params[:moveware_code]
  out_of_store_job = Trip.where(moveware_code: moveware_code)
  delivery_parsed_google_directions = JSON.parse(out_of_store_job[0][:google_waypoints_directions])
  storage_branch = Branch.where(:branch_code => out_of_store_job[0]['branch_code'])
  delivery_lat_lng = delivery_parsed_google_directions['routes'][0]['legs'][1]['end_location']
  distance_from_storage_branch_to_storage_delivery = haversine_distance_between_lat_lngs(JSON.parse(storage_branch[0]['latlng']), delivery_lat_lng)

  branch_candidates = []

  Branch.all.each{|branch|
    if branch[:branch_code] != out_of_store_job[0]['branch_code']
      distance_from_candidate_branch = haversine_distance_between_lat_lngs(JSON.parse(branch[:latlng]), delivery_lat_lng)
      if distance_from_candidate_branch < distance_from_storage_branch_to_storage_delivery
        branch_candidates.push(branch)
      end
    end
  }

  trips_of_interest = transfer_to_optimal_branch_suggestions(start_date, end_date, branch_candidates, out_of_store_job, storage_branch, delivery_lat_lng, distance_from_storage_branch_to_storage_delivery)
  trips_of_interest = trips_of_interest.length > 5 ? trips_of_interest.slice(0,5) : trips_of_interest
  # render json: params.to_json()
  render json: trips_of_interest.to_json()
end


def haversine_distance_between_lat_lngs(origin, destination)
    origin = [origin['lat'].to_f, origin['lng'].to_f]
    destination = [destination['lat'].to_f, destination['lng'].to_f]

    rad_per_deg = Math::PI/180  # PI / 180
    rkm = 6371                  # Earth radius in kilometers
    rm = rkm * 1000             # Radius in meters

    dlat_rad = (destination[0]-origin[0]) * rad_per_deg  # Delta, converted to rad
    dlon_rad = (destination[1]-origin[1]) * rad_per_deg

    lat1_rad, lon1_rad = origin.map {|i| i * rad_per_deg }
    lat2_rad, lon2_rad = destination.map {|i| i * rad_per_deg }

    a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

    rm * c # Delta in meters
end

def transfer_to_optimal_branch_suggestions(start_date, end_date, branch_candidates, out_of_store_job, storage_branch, delivery_lat_lng, distance_from_storage_branch_to_storage_delivery)

# trips ... from branch candidates
# trips ... from now to delivery date
# trips where distance from storage branch > distance from alternative branch delivery + distance from alternative branch to storage delivery

# STEP 1 EXCLUDE NON BRANCHES
# STEP 2 EXCLUDE DATES NOT NEEDED
# STEP 3 CALCULATE DISTANCES
# STEP 4 POPULATE ARRAY WHERE DISTANCE INEQUALITY IS CORRECT
# RETURN ARRAY of best 5
p 'storage_branch'
storage_branch_latlng = JSON.parse(storage_branch[0]['latlng'])
p storage_branch_latlng

array_of_accepted_date_millis = get_date_milli_array(end_date)
trips_of_interest = []

a = distance_from_storage_branch_to_storage_delivery
branch_candidates = branch_candidates.map{|branch| branch['branch_code']}
p branch_candidates
p out_of_store_job[0]['branch_code']

Trip.where(branch_candidates.include?(out_of_store_job[0]['branch_code']) && "dateMilli = ?", [array_of_accepted_date_millis]).find_each(batch_size: 200) do |trip|

  delivery_parsed_google_directions = JSON.parse(trip[:google_waypoints_directions])
  # trip_del_latlng = delivery_parsed_google_directions['routes'][0]['legs'][1]['end_location'] replaced by return_trip_closest_lat_lng...as delivery is not necessarily closest point to storage branch
  return_trip_closest_lat_lng = find_closest_point_on_return_path(delivery_parsed_google_directions['routes'][0]['legs'][2], storage_branch_latlng)
  p 'return_trip_closest_lat_lng'
  p return_trip_closest_lat_lng
  trip_home_branch_latlng = delivery_parsed_google_directions['routes'][0]['legs'][0]['start_location']
 b = haversine_distance_between_lat_lngs(return_trip_closest_lat_lng, storage_branch_latlng)
 c = haversine_distance_between_lat_lngs(trip_home_branch_latlng, delivery_lat_lng)
 p trip['branch_code']
 p trip['client_name']
 p "a"
 p a
 p "b"
 p b
 p 'c'
 p c
 p "b+c"
 p b+c
   if a > b + c
    p 'we are here'
    old_distance = a
    new_distance = b+c
    # trips_of_interest.push({trip['id'] => b+c})
    trips_of_interest.push({trip['client_name'] => a-(b+c)})
   end

end
p trips_of_interest.sort!{|a,b| a.values <=> b.values}.reverse
trips_of_interest.sort!{|a,b| a.values <=> b.values}.reverse
end

def get_date_milli_array(end_date)
  now = DateTime.now
  beginning_of_today_milliseconds_since_epoch = DateTime.new(now.year, now.month, now.day,0, 0, 0).strftime('%Q').to_i
  milli = beginning_of_today_milliseconds_since_epoch
  array_of_accepted_date_millis = []
  while milli < end_date.to_i 
    array_of_accepted_date_millis.push(milli)
    milli += 86400000
  end
  p array_of_accepted_date_millis
  array_of_accepted_date_millis  
end

# what if there is a nearer point on the return path ?????????????

def find_closest_point_on_return_path(leg2, storage_branch_latlng)
  counter          = 0
  closest_distance = nil
  best_step        = nil
  while counter < leg2['steps'].length do
      distance = distance_between_latlngs(leg2['steps'][counter]['start_location'], storage_branch_latlng)
    if closest_distance == nil
        closest_distance = distance
        best_step        = counter
    elsif closest_distance > distance
        closest_distance = distance
        best_step        = counter - 1
    end
      counter += counter + 1
  end
  find_closest_point_in_step(leg2['steps'][best_step], storage_branch_latlng)
end


def find_closest_point_in_step(step, storage_branch_latlng)

  counter              = 0
  best_lat_lng         = nil
  closest_distance     = nil
  while counter < step['lat_lngs'].length
    distance =  distance_between_latlngs(step['lat_lngs'][counter], storage_branch_latlng) 

    if closest_distance == nil
      best_lat_lng = step['lat_lngs'][counter]
      closest_distance = distance
    elsif closest_distance > distance
      best_lat_lng = step['lat_lngs'][counter]
      closest_distance = distance
    end 

    counter += counter + 100
  end
  return best_lat_lng
end

def distance_between_latlngs(latlng1, latlng2)
  # not haversine...just plain trig is good enough here
  x = latlng1['lat'].to_f- latlng2['lat'].to_f
  y = latlng1['lng'].to_f-latlng2['lng'].to_f
  Math.sqrt(x**2 + y**2)
end







end