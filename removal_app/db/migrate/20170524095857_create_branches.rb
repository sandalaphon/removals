class CreateBranches < ActiveRecord::Migration
  def change
    create_table :branches do |t|
      t.string :name
      t.string :address
      t.string :postcode
      t.integer :telephone

      t.timestamps null: false
    end
  end
end
