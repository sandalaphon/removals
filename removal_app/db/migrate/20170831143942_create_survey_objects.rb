class CreateSurveyObjects < ActiveRecord::Migration[5.0]
  def change
    create_table :survey_objects do |t|
      t.text :all_surveys_object

      t.timestamps
    end
  end
end
