class Api::V1::RestaurantsController < ApiController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_restaurant, only: [:show]
  before_action :set_restaurant_with_permission, only: [:update, :destroy]

  def index
    # Public access
    @restaurants = Restaurant.all

    render json: @restaurants

  end

  def create
    # Require token access
    if current_user
      user = User.find(current_user)
      @restaurant = user.restaurants.create!(restaurant_params)
      render json: @restaurant
    end
  end

  def update
    # Require token access
    @restaurant.update restaurant_params
    render json: @restaurant
  end

  def menus

    restaurant = Restaurant.find(params[:id])
    @menus = restaurant.menus.all
    render json: @menus
  end


  def show
    # Public access
    render json: @restaurant
  end

  def destroy
    # Require token access
    @restaurant.destroy
    render json: @restaurant
  end

  private

    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    end

    def set_restaurant_with_permission
      # Find the restaurant belongs to a user
      if current_user
        @restaurant = Restaurant.find(params[:id])
      end
    end

    def restaurant_params
      params.permit(:name, :address, :profile_image, :is_open, :phone, :description, :user_id)
    end

end
