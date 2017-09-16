class AddSecondsToUnLoadToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :seconds_to_unload, :integer
  end
end
