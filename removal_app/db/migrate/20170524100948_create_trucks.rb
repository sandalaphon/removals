class CreateTrucks < ActiveRecord::Migration
  def change
    create_table :trucks do |t|
      t.string :modeltype
      t.integer :maxvolume
      t.references :branch, index: true, foreign_key: true
      t.string :registration_number
      t.boolean :sidedoors
      t.boolean :tail_lift
      t.date :service_due

      t.timestamps null: false
    end
  end
end
