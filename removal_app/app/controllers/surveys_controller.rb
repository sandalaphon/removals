class SurveysController < ApplicationController
  before_action :authenticate_user!

def index
  #add branch to employee before returning
  surveys = Survey.all
  render json: surveys.to_json()
end


end