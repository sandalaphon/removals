class CostsController < ApplicationController
  before_action :authenticate_user!

  def index 
    costs = Cost.all[0]
    render json: costs.to_json()
  end

  def update
    p params
    costs = Cost.all
    if costs[0]==nil
      p 'nil....................................'
      created_costs = Cost.create(cost_params)
      p created_costs
      render json: created_costs.to_json()
    else
      p 'not nil................................'
      current_costs = costs[0]
      current_costs.update(cost_params)
      p 'updated'
      p current_costs
      render json: current_costs.to_json()
    end
  end

  private
  def cost_params
    params.require(:cost).permit([
         :fuel_per_mile_18t,
         :fuel_per_mile_9t,
         :fuel_per_mile_luton,
         :driver_per_hour_18t,
         :driver_per_hour_9t,
         :driver_per_hour_luton,
         :porter_per_hour
      ])
  end

end