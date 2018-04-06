class MenuItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :is_avail, :item_image
  belongs_to :menu
end
