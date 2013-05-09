class Appointment < ActiveRecord::Base
  attr_accessible :app_date_time, :app_date, :app_time, :user_two_id
  
  attr_accessor :app_date, :app_time
  
  # Validations
  validates :app_date_time , presence: true
  validates :user_one_id, presence: true
  validates :user_two_id, presence: true
  
  validates_format_of :app_date_time, :with => /\d{1,2}:\d{2}/
  
  belongs_to :user_one, class_name: "User"
  belongs_to :user_two, class_name: "User"
  
  after_initialize :get_datetimes # convert db format to accessors
  before_validation :set_datetimes # convert accessors back to db format
  
  
  def get_datetimes
    self.app_date_time ||= Time.now  # if the published_at time is not set, set it to now
    self.app_date_time ||= self.app_date_time.to_date.to_s(:db) # extract the date is yyyy-mm-dd format
    self.app_date_time ||= "#{'%02d' % self.app_date_time.hour}:#{'%02d' % self.app_date_time.min}" # extract the time
  end
  
  def set_datetimes
    self.app_date_time = DateTime.new(app_date.year, app_date.month, app_date.day, app_time.hour, app_time.min) # convert the two fields back to db
  end 
  
  def display_app_date_time(time_zone)  
    app_utc_time = app_date_time + ActiveSupport::TimeZone[time_zone].utc_offset.seconds    
    
    app_utc_time.strftime('%v') +" at " + app_utc_time.strftime('%l:%M %p')
  end
end
