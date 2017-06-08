class AddDeliveryLatLngColumnToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :delivery_latlng, :json
  end
end
