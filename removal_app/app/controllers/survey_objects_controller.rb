class SurveyObjectsController < ApplicationController
  before_action :authenticate_user!

def index
  #add branch to employee before returning
  surveys_object = SurveyObject.all
  render json: surveys_object.to_json()
end

def create
  created_survey_object = SurveyObject.create(survey_object_params)
  render json: created_survey_object.to_json()
end

private
def survey_object_params
  params.require(:survey_object).permit([
    :all_surveys_object
    
    ])
end


end