class AddcollectionLatLngToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :collection_LatLng, :json
  end
end
