class RemoveJsonbFromTrips < ActiveRecord::Migration[5.0]
  def change
    remove_column :trips, :jsonb, :string
  end
end
