class AddCollectionLatLngToSurveys < ActiveRecord::Migration[5.0]
  def change
    add_column :surveys, :collection_latLng, :string
  end
end
