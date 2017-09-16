class AddColumnToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :google_waypoints_directions, :jsonb
  end
end
