class TelephoneNumber < ActiveRecord::Base
  belongs_to :user
  attr_accessible :country_code, :phone_number, :primary, :telephone_nickname
  
  validates :user_id, presence: true
  validates :country_code, presence: true, length: { maximum: 10 }
  
  # Need to do this as a combination of phone_number and user_id i.e. it shouldn't just be phone_number
  validates :phone_number, presence: true,
    uniqueness: { case_sensitive: false }
  
  # Normalizes the attribute itself before validation
  phony_normalize :phone_number, :default_country_code => 'US'
end
