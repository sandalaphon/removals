class RemoveJson1FromTrips < ActiveRecord::Migration[5.0]
  def change
    remove_column :trips, :delivery_latlng
  end
end
