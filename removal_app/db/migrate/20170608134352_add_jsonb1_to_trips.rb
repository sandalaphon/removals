class AddJsonb1ToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :delivery_latlng, :jsonb, default: '{}'
  end
end
