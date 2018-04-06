class MenuSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :is_avail, :menu_image
  belongs_to :restaurant
  has_many :menu_items
end
