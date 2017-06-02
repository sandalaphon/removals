class UsersController < ApplicationController
before_action :authenticate_user!

def user_params
  params.require(:user).permit([:admin])
end

def index
  render json: current_user
end

def allusers
  render json: User.all
end

def update
  user = User.find(params[:id])

  if(user.update_attributes(user_params))
    render :json => User.all
  else render json: {status: :update_failed}
  end
end



def delete
  user = User.find(params[:id])
  if user.destroy!
    render json: User.all
else
  render json: {status: :delete_failed}
end
  end


end