class AddSurveysObjectToSurveys < ActiveRecord::Migration[5.0]
  def change
    add_column :surveys, :surveys_object, :text
  end
end
