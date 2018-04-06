class Api::V1::UsersController < ApiController

  def index
    @users = User.all
    render json: @users
  end

  def restaurants
    user = User.find(params[:id])
    @restaurants = user.restaurants.all
    render json: @restaurants
  end

  def create
    @user = User.create!(user_params)
    render json: @user
  end

  private
  def user_params
    params.permit(:email, :password, :password_confirmation, :role_id)
  end

end
