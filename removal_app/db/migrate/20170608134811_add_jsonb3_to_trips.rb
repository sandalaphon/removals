class AddJsonb3ToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :collection_latlng, :jsonb, default: '{}'
  end
end
