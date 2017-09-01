class AddSecondsSince1970ToSurveys < ActiveRecord::Migration[5.0]
  def change
    add_column :surveys, :milliseconds_since_1970, :bigint
  end
end
