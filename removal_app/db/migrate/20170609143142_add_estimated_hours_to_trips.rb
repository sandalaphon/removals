class AddEstimatedHoursToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :estimated_hours, :integer
  end
end
