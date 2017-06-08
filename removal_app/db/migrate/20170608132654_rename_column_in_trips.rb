class RenameColumnInTrips < ActiveRecord::Migration[5.0]
  def change
    remove_column :trips, :collection_LatLng
  end
end
