class Appointment < ActiveRecord::Base
  attr_accessible :app_date, :user_two_id
  
  # Validations
  validates :app_date, presence: true
  validates :user_one_id, presence: true
  validates :user_two_id, presence: true
  
  belongs_to :user_one, class_name: "User"
  belongs_to :user_two, class_name: "User"
end
