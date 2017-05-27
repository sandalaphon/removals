class CompaniesController < ApplicationController
  before_action :authenticate_user!

def index
  company = Company.all
  # trip = Trip.all

  # data = [comp, trip]
  data = company

  render :json => data.to_json()
end

# private
# def company_params
#   params.require(:company).permit([:TABLE COLUMNS])
# end

private
def company_params
  params.require(:company).permit([:name,
    :head_office_postcode,
     :head_office_address,
      :admin_user1,
     :admin_user2,
     :admin_user1_email,
      :admin_user2_email,
    :admin_user1_telephone,
   :admin_user2_telephone,
     :billing_contact_name,
    :billing_contact_telephone,
      :billing_contact_email ])
end






end