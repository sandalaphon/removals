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
  trip = Trip.create(trip_params)
  render json: Trip.all.to_json()
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
    :delivery_LatLng,
    :collection_LatLng
    ])
end






end