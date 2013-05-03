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
  attr_accessible :email, :name, :password, :password_confirmation, :remember_me, :facebookuid, :linkedinuid, :nativelogin
  
  # Commenting this out as app is now using Devise to provide authentication
  # has_secure_password
  has_many :microposts, dependent: :destroy
  
  has_many :relationships, foreign_key: "follower_id", dependent: :destroy
  has_many :followed_users, through: :relationships, source: :followed
  
  has_many :reverse_relationships, foreign_key: "followed_id",
                                   class_name:  "Relationship",
                                   dependent:   :destroy
  has_many :followers, through: :reverse_relationships, source: :follower
  
  before_save { email.downcase! }
  before_save :create_remember_token
  
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, 
    format: { with: VALID_EMAIL_REGEX }, 
    uniqueness: { case_sensitive: false }
    
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true
  
  def feed
    Micropost.from_users_followed_by(self)
  end
  
  def following?(other_user)
    relationships.find_by_followed_id(other_user.id)
  end

  def follow!(other_user)
    relationships.create!(followed_id: other_user.id)
  end
  
  def unfollow!(other_user)
    relationships.find_by_followed_id(other_user.id).destroy
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
      
#      raise session["devise.omniauth_data"]["provider"].to_yaml
#      
#      if session["devise.omniauth_data"]["provider"] == "facebook"
#        
#        raise session["devise.omniauth_data"]["provider"].to_yaml 
#        raise "Hello".to_yaml
#        
#        if data = session["devise.omniauth_data"] && session["devise.omniauth_data"]["extra"]["raw_info"]
#          user.email = data["email"] if user.email.blank?
#        end
#      elsif session["devise.omniauth_data"]["provider"] == "linkedin"
#        
#        #raise session["devise.omniauth_data"]["provider"].to_yaml 
#        raise "World".to_yaml 
#        
#        if data = session["devise.omniauth_data"]
#          user.email = data["info"]["email"] if user.email.blank?
#        end
#      end 
    end
  end
  
  #LinkedIn authentication methods
  
  private

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end
end