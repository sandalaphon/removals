class CreateCosts < ActiveRecord::Migration[5.0]
  def change
    create_table :costs do |t|
      t.string :fuel_per_mile_18t
      t.string :fuel_per_mile_9t
      t.string :fuel_per_mile_luton
      t.string  :driver_per_hour_18t
      t.string :driver_per_hour_9t
      t.string :driver_per_hour_luton
      t.string :porter_per_hour

      t.timestamps
    end
  end
end
