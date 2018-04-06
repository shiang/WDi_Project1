class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :profile_image, :is_open, :phone, :description
  has_many :menus
  belongs_to :user
end
