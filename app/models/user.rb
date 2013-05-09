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
         :omniauthable, :omniauth_providers => [:facebook, :linkedin]

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
  def all_appointments
    @all_appointments = appointments + reverse_appointments
    @all_appointments.sort_by!{|e| e[:app_date_time]}
  end
  
  def booked_appointment?(other_user, date_time)
    appointment = appointments.where(:user_two_id=>other_user.id).where(:app_date_time=>date_time).first
    if appointment.nil?
      appointment = other_user.appointments.where(:user_two_id=>self.id).where(:app_date_time=>date_time).first
    end
    appointment
  end
  
  def book_appointment!(other_user, date, time)
    # Force convention where User_one ID is always less than User_two ID. 
    # Note not checking this convention in the other methods
    
    if self.id < other_user.id
      appointments.create!(user_two_id:other_user.id, app_date:date, app_time:time)
    else 
      other_user.appointments.create!(user_two_id:self.id, app_date:date, app_time:time)
    end
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