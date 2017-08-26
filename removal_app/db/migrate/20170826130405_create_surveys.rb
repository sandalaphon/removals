class CreateSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :surveys do |t|
      t.references :employee, foreign_key: true
      t.references :branch, foreign_key: true
      t.date :appointment_date
      t.time :appointment_time
      t.integer :moveware_code
      t.string :collection_address
      t.string :delivery_address
      t.string :client_name
      t.decimal :duration
      t.string :branch_code

      t.timestamps
    end
  end
end
