class SurveysController < ApplicationController
  before_action :authenticate_user!

def index
  #add branch to employee before returning
  surveys = Survey.all
  render json: surveys.to_json()
end

def create
  #add branch to employee before returning
  puts 'survey params'
  puts survey_params
  branch = Branch.where(:branch_code => survey_params[:branch_code])[0]
  # employee_surveying = Employee.where(:moveware_employee_code => survey_params[:moveware_employee_code])[0]
  created_survey = branch.surveys.create(survey_params)
  # created_survey = employee_surveying.surveys.create(survey_params)
  render json: created_survey.to_json()
end

private
def survey_params
  params.require(:survey).permit([
    :appointment_date,
    :appointment_time,
    :moveware_code,
    :collection_address,
    :delivery_address,
    :client_name,
    :branch_code,
    :duration,
    :moveware_employee_code,
    :collection_postcode,
    :collection_latLng,
    :milliseconds_since_1970,
    :surveys_object
    
    ])
end


end