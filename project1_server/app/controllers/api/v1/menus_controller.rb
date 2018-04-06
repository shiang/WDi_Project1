class Api::V1::MenusController < ApiController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_menu, only: [:show]
  before_action :set_menu_with_permission, only: [:update, :destroy]

  def index
    # Public access
    @menus = Menu.find_by :restaurant_id => params[:restaurant_id]

    render json: @menus

  end

  def create
    # Require token access
    if current_user
      @menu = Menu.create(menu_params)
      render json: @menu
    end
  end

  def update
    # Require token access
    @menu.update menu_params
    render json: @menu
  end


  def show
    # Public access
    render json: @menu
  end

  def destroy
    # Require token access
    @menu.destroy
    render json: @menu
  end

  private

    def set_menu
      @menu = Menu.find(params[:id])
    end

    def set_menu_with_permission
      # Find the menu belongs to a user
      if current_user
        @menu = Menu.find(params[:id])
      end
    end

    def menu_params
      params.permit(:name, :price, :menu_image, :is_avail, :description, :restaurant_id)
    end

end
