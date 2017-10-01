class AddReturnBearingToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :return_bearing, :decimal
  end
end
