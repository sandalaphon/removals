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

  best_5_suggestions = transfer_to_optimal_branch_suggestions(start_date, end_date, branch_candidates, out_of_store_job, storage_branch, delivery_lat_lng, distance_from_storage_branch_to_storage_delivery)
  render json: params.to_json()
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

end







end