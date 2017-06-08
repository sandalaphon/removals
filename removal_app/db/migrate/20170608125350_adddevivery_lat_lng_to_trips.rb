class AdddeviveryLatLngToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :delivery_LatLng, :json
  end
end
