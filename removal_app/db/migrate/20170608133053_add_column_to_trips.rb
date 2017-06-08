class AddColumnToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :collection_latlng, :json
  end
end
