class MenuItem < ApplicationRecord
  belongs_to :menu, :optional => true
end
