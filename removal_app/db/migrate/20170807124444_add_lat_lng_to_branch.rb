class AddLatLngToBranch < ActiveRecord::Migration[5.0]
  def change
    add_column :branches, :latlng, :string
  end
end
