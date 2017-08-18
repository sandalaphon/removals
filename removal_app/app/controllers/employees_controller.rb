class EmployeesController < ApplicationController
  before_action :authenticate_user!

def index
  #add branch to employee before returning
  employees = Employee.all
  render json: employees.to_json()
end






end