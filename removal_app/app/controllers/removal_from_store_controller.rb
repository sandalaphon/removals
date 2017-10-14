class RemovalFromStoreController < ApplicationController
  before_action :authenticate_user!

  def index
  @branch_distance_hash         = get_branch_distance_hash()
  p params
  start_date                    = params[:start_date]
  end_date                      = params[:end_date]
  id                 = params[:id]


  out_of_store_job              = Trip.where(id: id)
  p out_of_store_job
  delivery_parsed_google_directions = JSON.parse(out_of_store_job[0][:google_waypoints_directions])
  storage_branch                = Branch.where(:branch_code => out_of_store_job[0]['branch_code'])
  storage_branch_latlng         = JSON.parse(storage_branch[0]['latlng'])
  storage_delivery_lat_lng              = delivery_parsed_google_directions['routes'][0]['legs'][1]['end_location']
  array_of_accepted_date_millis = get_date_milli_array(end_date)
  distance_from_storage_branch_to_storage_delivery = haversine_distance_between_lat_lngs(JSON.parse(storage_branch[0]['latlng']), storage_delivery_lat_lng)
  closest_branch                = find_optimal_branch(storage_delivery_lat_lng)[0]
  p "closest_branch['branch_code']"
  p closest_branch['branch_code']

  branch_candidates = []

  Branch.all.each{|branch|
    if branch[:branch_code]             != out_of_store_job[0]['branch_code']
      distance_from_candidate_branch    = haversine_distance_between_lat_lngs(JSON.parse(branch[:latlng]), storage_delivery_lat_lng)
      if distance_from_candidate_branch < distance_from_storage_branch_to_storage_delivery
        branch_candidates.push(branch['branch_code'])
      end
    end
  }
  

  multi_branch_solutions = get_multi_branch_solutions(out_of_store_job, storage_branch, storage_delivery_lat_lng, distance_from_storage_branch_to_storage_delivery, array_of_accepted_date_millis)

  single_branch_solutions = get_single_branch_solutions(storage_branch_latlng, array_of_accepted_date_millis, branch_candidates, storage_delivery_lat_lng, distance_from_storage_branch_to_storage_delivery)

  # all_solutions = multi_branch_solutions.concat(single_branch_solutions)

  # all_solutions.sort!{|a,b| b.values <=> a.values}.reverse
  single_branch_solutions.sort!{|a,b| b.values <=> a.values}.reverse
  multi_branch_solutions.sort!{|a,b| b.values <=> a.values}.reverse

p 'solutions'
 single_branch_solutions  = single_branch_solutions.length > 4 ? single_branch_solutions[0..3] : single_branch_solutions
 multi_branch_solutions   = multi_branch_solutions.length  > 4 ?  multi_branch_solutions[0..3] : multi_branch_solutions
# we will return the following: [optimal_branch, [single_branch_solutions], [multi_branch_solutions]]
# With 4 best solutions..either single trip solutions, multi trip solutions or both
p "out_of_store_job['id']"
p out_of_store_job[0]['id']
p Trip.where(id: out_of_store_job[0]['id']).select(Trip.column_names - ["google_waypoints_directions"])[0]
# return_array = find_best_solutions_and_format_return_array(closest_branch, storage_delivery_lat_lng, single_branch_solutions, multi_branch_solutions, Trip.where(id: out_of_store_job[0]['id']).select(Trip.column_names - ["google_waypoints_directions"])[0] )
return_array = find_best_solutions_and_format_return_array(closest_branch, storage_delivery_lat_lng, single_branch_solutions, multi_branch_solutions, Trip.where(id: out_of_store_job[0]['id'])[0] )
# return_array = find_best_solutions_and_format_return_array(closest_branch, storage_delivery_lat_lng, single_branch_solutions, multi_branch_solutions, Trip.where(id: out_of_store_job[0]['id'])[0] )

# Trip.where(id: trip['id']).select(Trip.column_names - ["google_waypoints_directions"])

p 'return_array'
p return_array
  render json: return_array.to_json()
end

def get_trip_by_id
  
  trip_sought = Trip.find(params[:trip_id])

  render json: trip_sought.to_json()

end

def find_best_solutions_and_format_return_array(closest_branch, storage_delivery_lat_lng, single_branch_solutions, multi_branch_solutions, out_of_store_job)

  single_branch_distances = single_branch_solutions.map{|h| h.values[0]}
  multi_branch_distances  = multi_branch_solutions.map{|h| h.values[0]}

  while single_branch_solutions.length + multi_branch_solutions.length > 4
    if single_branch_distances.min <= multi_branch_distances.min
      single_branch_solutions.pop
      single_branch_distances.pop
    else
      multi_branch_solutions.pop
      multi_branch_distances.pop
    end
  end
  p [closest_branch, storage_delivery_lat_lng, single_branch_solutions, multi_branch_solutions,  out_of_store_job]
  [closest_branch, storage_delivery_lat_lng, single_branch_solutions.map{|h| h.keys[0]}, multi_branch_solutions.map{|h| h.keys[0]},  out_of_store_job]
end



def get_single_branch_solutions(storage_branch_latlng, array_of_accepted_date_millis, branch_candidates,  delivery_lat_lng, distance_from_storage_branch_to_storage_delivery)

# trips ... from branch candidates
# trips ... from now to delivery date
# trips where distance from storage branch > distance from alternative branch delivery + distance from alternative branch to storage delivery

# STEP 1 EXCLUDE NON BRANCHES
# STEP 2 EXCLUDE DATES NOT NEEDED
# STEP 3 CALCULATE DISTANCES
# STEP 4 POPULATE ARRAY WHERE DISTANCE INEQUALITY IS CORRECT
# RETURN ARRAY of best 5

trips_of_interest             = []

Trip.where(branch_code: branch_candidates, dateMilli: array_of_accepted_date_millis).all.find_each(batch_size: 200) do |trip|

  delivery_parsed_google_directions = JSON.parse(trip[:google_waypoints_directions])
  trip_home_branch_latlng           = delivery_parsed_google_directions['routes'][0]['legs'][0]['start_location']
  return_trip_closest_lat_lng       = find_closest_point_on_return_path(delivery_parsed_google_directions['routes'][0]['legs'][2], storage_branch_latlng)
  
  a = distance_from_storage_branch_to_storage_delivery
  b = haversine_distance_between_lat_lngs(return_trip_closest_lat_lng, storage_branch_latlng)
  c = haversine_distance_between_lat_lngs(trip_home_branch_latlng, delivery_lat_lng)


      if a > b + c

       # trips_of_interest.push({Trip.where(id: trip['id']).select(Trip.column_names - ["google_waypoints_directions"])[0] => a-(b+c)})
       trips_of_interest.push({Trip.where(id: trip['id'])[0] => a-(b+c)})
      end

end

trips_of_interest.sort!{|a,b| a.values <=> b.values}.reverse

end



def get_multi_branch_solutions(out_of_store_job, storage_branch, delivery_lat_lng, distance_from_storage_branch_to_storage_delivery, array_of_accepted_date_millis)


   opt_branch_info                         = find_optimal_branch(delivery_lat_lng)
   closest_branch                          = opt_branch_info[0]
   dist_closest_branch_to_storage_delivery = opt_branch_info[1]
   return [] if closest_branch['id'] == storage_branch[0]['id']

  storage_branch_latlng                    = JSON.parse(storage_branch[0]['latlng'])
  storage_delivery_latlng                  = JSON.parse(out_of_store_job[0]['google_waypoints_directions'])['routes'][0]['legs'][1]['end_location']
  dist_sb_sd_non_haver                     = distance_between_latlngs(storage_branch_latlng, storage_delivery_latlng)
  trips_of_interest                        = []

  Trip.where(dateMilli: array_of_accepted_date_millis).where.not(branch_code: closest_branch['branch_code']).find_each(batch_size: 200) do |trip|

   g_directions                               = JSON.parse(trip['google_waypoints_directions'])
   job_branch_lat_lng                         = g_directions['routes'][0]['legs'][2]['end_location']
   bearing_from_storage_branch_to_trip_branch = get_bearing_between_lat_lngs(JSON.parse(storage_branch[0]['latlng']), job_branch_lat_lng)
   a                                          = bearing_from_storage_branch_to_trip_branch

   bearing_from_trip_delivery_to_trip_branch  = trip['return_bearing'].to_f
   b                                          = bearing_from_trip_delivery_to_trip_branch
   dist_trip_branch_to_trip_delivery          = distance_between_latlngs(job_branch_lat_lng, g_directions['routes'][0]['legs'][1]['end_location'])

   if a>b
    angle_between_routes = a - b
  else
    angle_between_routes = b - a
   end
   if angle_between_routes > 180
    angle_between_routes = 360 - angle_between_routes
   end
   # if the trip is NOT heading towards the storage branch...then exclude
   # AND if the trip is not heading 

   x= @branch_distance_hash[trip['branch_code']][storage_branch[0]['branch_code']] - dist_trip_branch_to_trip_delivery * Math.cos( get_radians(angle_between_routes) ).abs

  goes_far_enough_towards_storage_branch = (x + dist_closest_branch_to_storage_delivery < dist_sb_sd_non_haver)


   if  angle_between_routes < 90 &&  goes_far_enough_towards_storage_branch  
    trips_of_interest.push(trip)
   end
  end
  get_distances_of_multi_branch_trips(trips_of_interest, closest_branch, out_of_store_job, storage_branch, storage_branch_latlng, storage_delivery_latlng, distance_from_storage_branch_to_storage_delivery)


 
  # get all trips in date range
  # exclude trips heading away from storage branch
end



# Get bearing A from branch to delivery
# Get bearing B from branch to storage branch
# If going wrong way exclude
# Get lat lng equation of the line at right angles to A
# if lat > n.lng + c then exclude (delivery lat lngs)
# Get equation of circle lat lng which has a radius of 1/2 distance from SB to SD centered on storage branch
# if start of any step is within this circle then find nearest point




def get_distances_of_multi_branch_trips(trips_of_interest, closest_branch, out_of_store_job, storage_branch, storage_branch_latlng, storage_delivery_latlng, distance_from_storage_branch_to_storage_delivery)

  trips_to_return        = []
  closest_branch_lat_lng = JSON.parse(closest_branch['latlng'])
  delivery_dist          = haversine_distance_between_lat_lngs(JSON.parse(closest_branch['latlng']), storage_delivery_latlng)
  

  trips_of_interest.each{|trip|
   
    delivery_parsed_google_directions = JSON.parse(trip[:google_waypoints_directions])
    return_leg                        = delivery_parsed_google_directions['routes'][0]['legs'][2]

    closest_lat_lng_to_storage_branch = find_closest_point_on_return_path(return_leg, storage_branch_latlng)
    closest_lat_lng_to_closest_branch = find_closest_point_on_return_path(return_leg, closest_branch_lat_lng)

    detour1 = haversine_distance_between_lat_lngs(closest_lat_lng_to_closest_branch, closest_branch_lat_lng)
    detour2 = haversine_distance_between_lat_lngs(closest_lat_lng_to_storage_branch, storage_branch_latlng)



      if distance_from_storage_branch_to_storage_delivery > detour1 + detour2 + delivery_dist

       trips_to_return.push( {Trip.where(id: trip['id'])[0] => distance_from_storage_branch_to_storage_delivery - (detour1 + detour2 + delivery_dist)} )
       # trips_to_return.push( {Trip.where(id: trip['id']).select(Trip.column_names - ["google_waypoints_directions"])[0] => distance_from_storage_branch_to_storage_delivery - (detour1 + detour2 + delivery_dist)} )
      end
  }

  p trips_to_return
  return trips_to_return

end

def get_bearing_between_lat_lngs(start_latLng, end_latLng)
 startLat   = get_radians(start_latLng['lat'])
 startLong  = get_radians(start_latLng['lng'])
 endLat     = get_radians(end_latLng['lat'])
 endLong    = get_radians(end_latLng['lng'])

 dLong = endLong - startLong;

 dPhi = Math.log(Math.tan(endLat/2.0+Math::PI/4.0)/Math.tan(startLat/2.0+Math::PI/4.0))
  if dLong.abs > Math::PI
    if (dLong > 0.0)
       dLong = -(2.0 * Math::PI - dLong)
    else
       dLong = (2.0 * Math::PI + dLong)
    end
  end

  return (get_degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0

end

def get_radians(n)
  n * (Math::PI/180)
end

def get_degrees(n)
  n * (180 / Math::PI)
end

def get_branch_distance_hash()
  branch_distance_hash = {}
  branches  = Branch.all
  branches2 = Branch.all
  branches.each{|branch| 
    branch_distance_hash["#{branch['branch_code']}"] = {}
    branches2.each{|branch2|
      branch_distance_hash["#{branch['branch_code']}"]["#{branch2['branch_code']}"] = distance_between_latlngs(JSON.parse(branch['latlng']), JSON.parse(branch2['latlng']))
    }
  }
  p branch_distance_hash
    branch_distance_hash
end

def find_optimal_branch(delivery_lat_lng)

  branches              = Branch.all
  optimal_branch        = nil
  smallest_distance     = nil
  branches.each{|branch|
    if optimal_branch == nil
      optimal_branch    = branch
      smallest_distance = distance_between_latlngs(delivery_lat_lng, JSON.parse(branch['latlng']))
    elsif smallest_distance > distance_between_latlngs(delivery_lat_lng, JSON.parse(branch['latlng']))
      optimal_branch    = branch
      smallest_distance = distance_between_latlngs(delivery_lat_lng, JSON.parse(branch['latlng']))
    end
  }
  return [optimal_branch, smallest_distance]
end

def get_date_milli_array(end_date)
  now = DateTime.now
  beginning_of_today_milliseconds_since_epoch = now.beginning_of_day.to_i * 1000
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

      counter +=  1
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

def haversine_distance_between_lat_lngs(origin, destination) # Takes into account curvature of Earth...great circles trig
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


end