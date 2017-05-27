class CompaniesController < ApplicationController

def index
  comp = Company.all
  trip = Trip.all

  data = [comp, trip]

  render :json => data
end






end