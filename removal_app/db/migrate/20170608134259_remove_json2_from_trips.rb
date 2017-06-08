class RemoveJson2FromTrips < ActiveRecord::Migration[5.0]
  def change
    remove_column :trips, :collection_latlng
  end
end
