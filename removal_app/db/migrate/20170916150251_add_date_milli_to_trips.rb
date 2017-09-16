class AddDateMilliToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :dateMilli, :integer
  end
end
