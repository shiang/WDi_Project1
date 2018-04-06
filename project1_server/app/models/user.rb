class User < ApplicationRecord
  belongs_to :role, :optional => true
  has_many :restaurants

  has_secure_password

  validates :email, :presence => true, :uniqueness => true

  def self.from_token_payload payload
    payload["sub"]
  end

  def to_token_payload
    {
      sub: id,
      email: email,
      role: role_id
    }
  end

end
