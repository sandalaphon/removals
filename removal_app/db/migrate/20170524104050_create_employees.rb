class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :name
      t.integer :telephone
      t.boolean :driver
      t.boolean :porter
      t.boolean :ops_manager
      t.boolean :surveyor
      t.boolean :branch_manager
      t.boolean :admin
      t.references :branch, index: true, foreign_key: true
      t.boolean :software_user
      t.string :email
      t.string :job_title
      t.string :driver_licence

      t.timestamps null: false
    end
  end
end
