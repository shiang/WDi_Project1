class Api::V1::MenuItemsController < ApiController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_menu_item, only: [:show]
  before_action :set_menu_item_with_permission, only: [:update, :destroy]

  def index
    # Public access

    @menu_items = MenuItem.where :menu_id => params[:menu_id]

    render json: @menu_items

  end

  def create
    # Require token access
    if current_user
      @menu_item = MenuItem.create(menu_params)
      render json: @menu_item
    end
  end

  def update
    # Require token access
    @menu_item.update menu_params
    render json: @menu_item
  end


  def show
    # Public access
    render json: @menu_item
  end

  def destroy
    # Require token access
    @menu_item.destroy
    render json: @menu_item
  end

  private

    def set_menu_item
      @menu_item = MenuItem.find(params[:id])
    end

    def set_menu_item_with_permission
      # Find the menu_item belongs to a user
      if current_user
        @menu_item = MenuItem.find(params[:id])
      end
    end

    def menu_params
      params.permit(:name, :price, :item_image, :is_avail, :description, :menu_id)
    end

end
