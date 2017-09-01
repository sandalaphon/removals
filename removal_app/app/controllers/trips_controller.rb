class TripsController < ApplicationController
  before_action :authenticate_user!

# def index
  # company = Company.all
  # trip = Trip.all

  # data = [comp, trip]
  # data = company

  # render :json => data.to_json()
# end

def create

  # puts trip_params
  # puts Branch.where(:branch_code => trip_params[:branch_code])
  trip_branch = Branch.where(:branch_code => trip_params[:branch_code])[0]
  puts "hello"
  puts trip_branch
  puts 'hellooo'

  # puts trip_params
  # trip_branch.trips.create(trip_params)
  # @newtrip = Trip.create(trip_params)

  created_trip = trip_branch.trips.create(trip_params)
  
  render json: created_trip.to_json()
  # render json: Trip.all.to_json()



end

def index
  trips = Trip.all
  render json: trips.to_json()
end

def partload_closest_pickup
  startLat = params[:startLat]
  startLng = params[:startLng]
  trips = Trip.all
  arrayOfShortestDistanceToPoint = trips.map do |trip|
    parsed = JSON.parse(trip[:google_directions])
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
  shortest_distance=nil
  while counter<path.length do
    x =startLat - path[counter]["lat"]
    y = startLng - path[counter]["lng"]
    distance = Math.sqrt((x*x) + (y*y))
    if shortest_distance==nil 
      shortest_distance = distance
    end

    if distance<shortest_distance 
      shortest_distance = distance
    end
    counter =counter + 10
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
    :google_directions_to_branch
    ])
end






end