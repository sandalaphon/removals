class AddCollectionPostcodeToSurveys < ActiveRecord::Migration[5.0]
  def change
    add_column :surveys, :collection_postcode, :string
  end
end
