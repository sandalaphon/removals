class AddGoogleDirectionsAgainToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :google_directions, :jsonb, default: '{}'
   
  end
end
