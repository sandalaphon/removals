class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.references :truck, index: true, foreign_key: true
      t.references :trip, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
