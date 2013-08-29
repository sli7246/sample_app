class TelephoneNumber < ActiveRecord::Base
  belongs_to :user
  attr_accessible :country_code, :phone_number, :primary, :telephone_nickname
  
  validates :user_id, presence: true
end
