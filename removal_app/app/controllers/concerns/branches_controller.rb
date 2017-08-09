class BranchesController < ApplicationController
  before_action :authenticate_user!


def index
  branches = Branch.all
  render json: branches.to_json()
end



end