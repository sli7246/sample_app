class Address < ActiveRecord::Base
  belongs_to :user
  attr_accessible :line1, :line2, :city, :country_code, :address_nickname, :zip
  
  # Need to have some way to confirm that address is valid
  validates :user_id, presence: true
  validates :line1, presence: true, length: { maximum: 50 }
  validates :line2, length: { maximum: 50 }
  validates :city, presence: true, length: { maximum: 50 }
end
