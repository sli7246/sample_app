class Address < ActiveRecord::Base
  # around_create :set_primary
  belongs_to :user
  attr_accessible :line1, :line2, :city, :country_code, :address_nickname, :zip
  
  # Need to have some way to confirm that address is valid
  validates :user_id, presence: true
  validates :line1, presence: true, length: { maximum: 50 }
  validates :city, presence: true, length: { maximum: 50 }
  validates :country_code, presence: true, length: { maximum: 10 }
  validates :zip, presence: true
  
  private
    # def set_primary
    #  
    #  yield
    # end
end
