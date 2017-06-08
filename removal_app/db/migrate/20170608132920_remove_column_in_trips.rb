class RemoveColumnInTrips < ActiveRecord::Migration[5.0]
  def change
    remove_column :trips, :delivery_LatLng
  end
end
