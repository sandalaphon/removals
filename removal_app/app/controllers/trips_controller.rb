class TripsController < ApplicationController
  before_action :authenticate_user!

# def index
  # company = Company.all
  # trip = Trip.all

  # data = [comp, trip]
  # data = company

  # render :json => data.to_json()
# end

def today_closest
  date_range_object = params[:date_range_object_milli]
  lat_lng_object = params[:lat_lng]
  branch = params[:branch]
  start_milli = date_range_object[:start_date]
  end_milli = date_range_object[:end_date]
  lat = lat_lng_object[:lat]
  lng = lat_lng_object[:lng]
 
  p start_milli
  p end_milli
  p lat
  p lng
  p branch

  best_trips = getClosestTrips(start_milli, end_milli, lat, lng, branch)
  render json: best_trips.to_json()
end

def getClosestTrips(start_milli, end_milli, lat, lng, branch)
  date_millis = get_date_milli_array(start_milli, end_milli)
  branches = []
  if branch == 'All_Branches'
    Branch.all.each{|branch| branches.push(branch[:branch_code])}
  else
    branches.push(branch)
  end

  trip_id_closest_distance_hash = {}
  Trip.where(branch_code: branches, dateMilli: date_millis).all.find_each(batch_size:50) do |trip|
    parsed = JSON.parse(trip[:google_waypoints_directions])
    path = parsed["routes"][0]["overview_path"]
    closest_distance = getShortestDistance(path, lat, lng)
    trip_id = trip.id
    trip_id_closest_distance_hash[trip_id] = closest_distance
  end
  p trip_id_closest_distance_hash
  trip_id_closest_distance_hash = trip_id_closest_distance_hash.sort_by {|k,v| v}.to_h
  p trip_id_closest_distance_hash
  best_trips = []
  trip_id_closest_distance_hash.keys[0..4].each do |key|
    best_trips.push(Trip.find(key.to_i))
  end
  best_trips
end



def get_date_milli_array(start_milli, end_milli)
  milli = start_milli.to_i
  array_of_accepted_date_millis = []
  while milli <= end_milli.to_i
    array_of_accepted_date_millis.push(milli)
    milli += 86400000
  end
  array_of_accepted_date_millis
end



def create

  # puts trip_params
  # puts Branch.where(:branch_code => trip_params[:branch_code])
  trip_branch = Branch.where(:branch_code => trip_params[:branch_code])[0]
  # puts "hello"
  # puts trip_branch
  # puts 'hellooo'

  # puts trip_params
  # trip_branch.trips.create(trip_params)
  # @newtrip = Trip.create(trip_params)

  created_trip = trip_branch.trips.create(trip_params)
  # p 'trip_params'
  # p trip_params
  set_ros_candidate_bool(created_trip, trip_branch)
  
  render json: created_trip.to_json()

end

def set_ros_candidate_bool(trip, trip_branch)

  if trip["kind"] == "ROS"
    home_branch_is_closest = is_home_branch_closest(trip, trip_branch)
   if home_branch_is_closest
    trip.update(ros_candidate: 'false')
  else
    trip.update(ros_candidate: 'true')
  end
  else
    # p 'not ros'
    trip.update(ros_candidate: 'false')
  end
end

def is_home_branch_closest(trip, trip_branch)
g_dir = JSON.parse(trip['google_waypoints_directions'])
delivery_lat_lng = g_dir['routes'][0]['legs'][1]['end_location']
optimal_branch = find_optimal_branch(delivery_lat_lng)
optimal_branch == trip_branch
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
  return optimal_branch
end

def distance_between_latlngs(latlng1, latlng2)
  # not haversine...just plain trig is good enough here
  x = latlng1['lat'].to_f- latlng2['lat'].to_f
  y = latlng1['lng'].to_f-latlng2['lng'].to_f
  Math.sqrt(x**2 + y**2)
end

def index
  trips = Trip.all
  render json: trips.to_json()
end

def rosCandidates
  candidates = Trip.where(ros_candidate: 'true').select(Trip.column_names - ["google_waypoints_directions"])
  render json: candidates.to_json()
end

def partload_closest_pickup
  startLat = params[:startLat]
  startLng = params[:startLng]
  trips = Trip.all
  arrayOfShortestDistanceToPoint = trips.map do |trip|
    parsed = JSON.parse(trip[:google_waypoints_directions])
    # puts "______s_______"
    # puts trip[:google_directions].[:routes]
    # puts parsed["routes"]
    # puts "______e_______"
    path = parsed["routes"][0]["overview_path"]
    # puts path
    #[0][:overview_path]
    # path = trip.google_directions.routes[0].overview_path
    getShortestDistance(path, startLat, startLng)
  end

  indexes = find_best_pickup_trucks_indexes(arrayOfShortestDistanceToPoint)
  best_trips = indexes.map{|i| trips[i]}
  render json: best_trips.to_json()

end

def find_best_pickup_trucks_indexes(array_of_distances)
array_of_distances.each_index.min_by(5){|i| array_of_distances[i]} 
  end



def getShortestDistance(path, startLat, startLng)
  counter = 0
  shortest_distance = nil
  while counter < path.length do
    x = startLat - path[counter]["lat"]
    y = startLng - path[counter]["lng"]
    distance = Math.sqrt((x*x) + (y*y))
    if shortest_distance == nil 
      shortest_distance = distance
    end

    if distance < shortest_distance 
      shortest_distance = distance
    end
    counter = counter + 10
  end
  return shortest_distance
end

# private
# def company_params
#   params.require(:company).permit([:TABLE COLUMNS])
# end

private
def trip_params
  params.require(:trip).permit([
    :date,
    :name,
    :branch_id,
    :moveware_code,
    :kind,
    :client_name,
    :client_address,
    :client_postcode,
    :collection_postcode,
    :collection_address,
    :delivery_address,
    :delivery_postcode,
    :allocated,
    :hourly,
    :arrival_time,
    :men_requested,
    :volume,
    :notes,
    :delivery_latlng,
    :collection_latlng,
    :estimated_hours,
    :google_directions,
    :branch_code,
    :google_directions_from_branch,
    :google_directions_to_branch,
    :google_waypoints_directions,
    :seconds_to_load,
    :seconds_to_unload,
    :dateMilli,
    :return_bearing,
    :ros_candidate
    ])
end






end