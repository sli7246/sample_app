class Appointment < ActiveRecord::Base
  attr_accessible :app_date_time, :app_date, :app_time, :user_two_id,
    :prop_one_app_date, :prop_one_app_time, :prop_one_app_date_time,
    :prop_two_app_date, :prop_two_app_time, :prop_two_app_date_time,
    :prop_three_app_date, :prop_three_app_time, :prop_three_app_date_time, 
    :app_introduction, :app_accepted, :session_id
  
  attr_accessor :app_date, :app_time,
    :prop_one_app_date, :prop_one_app_time,
    :prop_two_app_date, :prop_two_app_time,
    :prop_three_app_date, :prop_three_app_time, :session_id
    
  
  # Validations
  #validates :app_date_time , presence: true, :if => :app_accepted?
  validates :user_one_id, presence: true
  validates :user_two_id, presence: true
  validates :last_update_from, presence: true
  #validates_format_of :app_date_time, :with => /\d{1,2}:\d{2}/
  
  # validates that a user cannot create an appointment with himself
  validates_each :user_one_id do |record, attr, value|
    if(value == record.user_two_id)
      record.errors.add(attr)
    end
  end
  
  validates_each :last_update_from do |record, attr, value|
    if(value != record.user_two_id && value != record.user_one_id)
      record.errors.add(attr)
    end
  end
  
  
  belongs_to :user_one, class_name: "User"
  belongs_to :user_two, class_name: "User"
  
  after_initialize :get_datetimes # convert db format to accessors
  before_validation :set_datetimes # convert accessors back to db format

  def book_appointment(booked_date_time)
    # Save the appointment in the database
    self.update_attributes(:app_date_time => booked_date_time, :app_accepted => true)
    
    # Mail confirms to both users
    AppointmentMailer.appointment_confirmation(self.user_one, self.user_two, self).deliver
    AppointmentMailer.appointment_confirmation(self.user_two, self.user_one, self).deliver
  end

  def display_app_date_time(app_date_time, time_zone)  
    app_utc_time = app_date_time + ActiveSupport::TimeZone[time_zone].utc_offset.seconds    
    
    app_utc_time.strftime('%b %d, %Y') +" at " + app_utc_time.strftime('%l:%M %p')
  end
  
  def get_datetimes
    
    # Set the date_time attributes through the virtual attributes or directly. 
    unless app_date_time.nil?
      app_date ||= app_date_time.to_date.to_s(:db) # extract the date is yyyy-mm-dd format
      app_time ||= "#{'%02d' % app_date_time.hour}:#{'%02d' % app_date_time.min}" # extract the time
      
      prop_one_app_date ||= prop_one_app_date_time.to_date.to_s(:db) # extract the date is yyyy-mm-dd format
      prop_one_app_time ||= "#{'%02d' % prop_one_app_date_time.hour}:#{'%02d' % prop_one_app_date_time.min}" # extract the time
        
      prop_two_app_date ||= prop_two_app_date_time.to_date.to_s(:db) # extract the date is yyyy-mm-dd format
      prop_two_app_time ||= "#{'%02d' % prop_two_app_date_time.hour}:#{'%02d' % prop_two_app_date_time.min}" # extract the time
      
      prop_three_app_date ||= prop_three_app_date_time.to_date.to_s(:db) # extract the date is yyyy-mm-dd format
      prop_three_app_time ||= "#{'%02d' % prop_three_app_date_time.hour}:#{'%02d' % prop_three_app_date_time.min}" # extract the time
    end
  end
  
  def set_datetimes
    # convert the two fields back to db
    if !(app_date.nil? || app_time.nil?)
      self.app_date_time = DateTime.new(            app_date.year, 
                                                    app_date.month, 
                                                    app_date.day, 
                                                    app_time.hour, 
                                                    app_time.min) 
    end
    if !(prop_one_app_date.nil? || prop_one_app_time.nil?)
      self.prop_one_app_date_time = DateTime.new(   prop_one_app_date.year, 
                                                    prop_one_app_date.month, 
                                                    prop_one_app_date.day, 
                                                    prop_one_app_time.hour, 
                                                    prop_one_app_time.min) 
    end
    if !(prop_two_app_date.nil? || prop_two_app_time.nil?)
      self.prop_two_app_date_time = DateTime.new(   prop_two_app_date.year, 
                                                    prop_two_app_date.month, 
                                                    prop_two_app_date.day, 
                                                    prop_two_app_time.hour, 
                                                    prop_two_app_time.min) 
    end
    if !(prop_three_app_date.nil? || prop_three_app_time.nil?)
      self.prop_three_app_date_time = DateTime.new( prop_three_app_date.year, 
                                                    prop_three_app_date.month, 
                                                    prop_three_app_date.day, 
                                                    prop_three_app_time.hour, 
                                                    prop_three_app_time.min)
    end
  end 
  
  def set_opentok_session(requestip, override = false)
    if self.opentok_session.nil? || (Time.now - updated_at)/(1.hour) > 12 || override
      # Create OpenTok session and token
      # @session_id = OPENTOK_SDK.createSession( request.ip )      
      sessionProperties = {OpenTok::SessionPropertyConstants::P2P_PREFERENCE => "disabled"}    # or disabled
      self.opentok_session = OPENTOK_SDK.createSession( requestip, sessionProperties ).session_id
      self.save!
    end
    
    self.opentok_session
  end
  
  private 
end
