# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  email      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook, :linkedin, :google_oauth2]

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :name, :password, :password_confirmation, :remember_me, :facebookuid, :linkedinuid, :nativelogin, :time_zone
 
  has_many :microposts, dependent: :destroy
  
  # Followers/following Relationship table
  has_many :relationships, foreign_key: "follower_id", dependent: :destroy
  has_many :followed_users, through: :relationships, source: :followed
  has_many :reverse_relationships,  foreign_key: "followed_id",
                                    class_name:  "Relationship",
                                    dependent:   :destroy
  has_many :followers, through: :reverse_relationships, source: :follower
  
  # Appointments Table
  has_many :appointments, foreign_key: "user_one_id", dependent: :destroy
  has_many :reverse_appointments, foreign_key: "user_two_id", class_name: "Appointment", dependent: :destroy
  #has_many :meeting_user_two, through: :appointments, source: :user_two
  
  before_save { email.downcase! }
  before_save :create_remember_token
  
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, 
    format: { with: VALID_EMAIL_REGEX }, 
    uniqueness: { case_sensitive: false }
    
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true
  validates_inclusion_of :time_zone, :in => ActiveSupport::TimeZone.zones_map { |m| m.name }, :message => "is not a valid Time Zone", :allow_nil => true
  
  def set_time_zone!
    #self.time_zone = params[:time_zone]
  end
  
  def feed
    Micropost.from_users_followed_by(self)
  end

  # Relationship related methods
  def following?(other_user)
    relationships.where(:followed_id=>other_user.id).first
  end

  def follow!(other_user)
    relationships.create!(followed_id: other_user.id)
  end
  
  def unfollow!(other_user)
    relationships.where(:followed_id=>other_user.id).first.destroy
  end
  
  # Appointment related methods
  def all_appointments(booked = nil, include_self_updates = false, future_only = true)
    all_appointments = case booked
    when nil then
      appointments + reverse_appointments 
    when true then
      include_self_updates ?  appointments.where(:app_accepted => true) + 
                              reverse_appointments.where(:app_accepted => true) : 
                              appointments.where('app_accepted = true AND last_update_from != ?', self.id) + 
                              reverse_appointments.where('app_accepted = true AND last_update_from != ?', self.id)
    when false then
      include_self_updates ?  appointments.where(:app_accepted => false) + 
                              reverse_appointments.where(:app_accepted => false) : 
                              appointments.where('app_accepted = false AND last_update_from != ?', self.id) + 
                              reverse_appointments.where('app_accepted = false AND last_update_from != ?', self.id)
    end 
    
    if future_only
      # Depending on whether appointment is booked, evaluate on finalized time or proposed time
      # System will assume a proposal is valid until the furtherest date becomes historical
      all_appointments.select!{|e| 
        evaluation_array = e[:app_accepted] ? [e[:app_date_time]] : 
                                              [e[:prop_one_app_date_time],e[:prop_two_app_date_time],e[:prop_three_app_date_time]]
        (evaluation_array.max || Time.new(2000,1,1)) > Time.now
        }
    else
      app_appointments
    end
    all_appointments.nil? ? [] : all_appointments.sort_by!{|e| e[:app_date_time] || Time.new(2000,1,1) }
  end
  
  def booked_appointment?(other_user, date_time)
    appointment = appointments.where(:user_two_id=>other_user.id).where(:app_date_time=>date_time).first
    if appointment.nil?
      appointment = other_user.appointments.where(:user_two_id=>self.id).where(:app_date_time=>date_time).first
    end
    appointment
  end
  
  def propose_appointment!(other_user, prop_one_time, prop_two_time, prop_three_time, app_introduction)
    # Mass assignment attributes
    if self.id < other_user.id
      appointment = appointments.new( user_two_id:other_user.id, 
                            prop_one_app_date_time:prop_one_time.to_datetime, 
                            prop_two_app_date_time:prop_two_time.to_datetime, 
                            prop_three_app_date_time:prop_three_time.to_datetime,
                            app_introduction: app_introduction.to_s)           
    else 
      appointment = other_user.appointments.new(user_two_id:self.id, 
                            prop_one_app_date_time:prop_one_time.to_datetime, 
                            prop_two_app_date_time:prop_two_time.to_datetime, 
                            prop_three_app_date_time:prop_three_time.to_datetime,
                            app_introduction: app_introduction.to_s)            
    end
    
    # Non Mass assignment attributes
    appointment.last_update_from = self.id
    appointment.save!
    appointment      
  end
  
  def cancel_appointment!(other_user, date_time)
    appointment = appointments.where(:user_two_id=>other_user.id).where(:app_date_time=>date_time).first
    if appointment.nil?
      appointment = other_user.appointments.where(:user_two_id=>self.id).where(:app_date_time=>date_time).first
    end
    appointment.destroy
  end
  
  #Facebook authentication methods
  def self.find_for_oauth(auth, signed_in_resource=nil)
    
    # Dummy data for passwords
    password_placeholder = Devise.friendly_token[0,20]
    
    # Check to see if user has previously logged in
    if auth.provider == "facebook"
      # Test to see if this authentication path has ever been used before
      user = User.where(:facebookuid => auth.uid).first
      
      unless user #If not
        
        # Test to see if the user's email has been used before
        user = User.where(:email => auth.info.email).first        
        if user
          user.facebookuid = auth.uid
        else 
          user = User.create(name: auth.extra.raw_info.name,
                         facebookuid: auth.uid,
                         email: auth.info.email,
                         password: password_placeholder,
                         password_confirmation: password_placeholder,
                         nativelogin:false
                         )
        end
      end
      
    elsif auth.provider == "linkedin"
      # Test to see if this authentication path has ever been used before
      user = User.where(:linkedinuid => auth.uid).first
      
      unless user #If not
        
        # Test to see if the user's email has been used before
        user = User.where(:email => auth.info.email).first
        
        if user
          user.linkedinuid = auth.uid
        else
          user = User.create(name: auth.info.name,
                         linkedinuid: auth.uid,
                         email: auth.info.email,
                         password: password_placeholder,
                         password_confirmation: password_placeholder,
                         nativelogin:false
                         )
        end
      end
    end
    user
  end
  
  def self.new_with_session(params, session)
    super.tap do |user|
      # Note this only works for Facebook Authentication right now. Basically puts the email into the sign-up grid.
      # Not critical enough to spend time fixing. 
      if data = session["devise.omniauth_data"] && session["devise.omniauth_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
  
  #LinkedIn authentication methods
  
  private

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end
end

 
  # Commenting this out as app is now using Devise to provide authentication
  # has_secure_password