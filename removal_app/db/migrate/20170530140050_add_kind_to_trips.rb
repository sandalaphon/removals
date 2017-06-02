class AddKindToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :kind, :string
  end
end
