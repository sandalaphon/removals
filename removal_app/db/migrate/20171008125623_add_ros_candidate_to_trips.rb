class AddRosCandidateToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :ros_candidate, :boolean
  end
end
