class AddGoogleDirectionsToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :google_directions, :string
    add_column :trips, :jsonb, :string
  end
end
