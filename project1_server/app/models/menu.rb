class Menu < ApplicationRecord
  has_many :menu_items, dependent: :destroy
  belongs_to :restaurant, :optional => true
end
