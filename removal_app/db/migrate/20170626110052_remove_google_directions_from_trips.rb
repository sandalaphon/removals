class RemoveGoogleDirectionsFromTrips < ActiveRecord::Migration[5.0]
  def change
    remove_column :trips, :google_directions, :string
  end
end
