class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.datetime :date
      t.references :branch, index: true, foreign_key: true
      t.integer :moveware_code
      t.string :type
      t.string :client_name
      t.string :client_address
      t.string :client_postcode
      t.string :collection_postcode
      t.string :collection_address
      t.string :delivery_address
      t.string :delivery_postcode
      t.boolean :allocated
      t.boolean :hourly
      t.datetime :arrival_time
      t.integer :men_requested
      t.integer :volume
      t.text :notes

      t.timestamps null: false
    end
  end
end
