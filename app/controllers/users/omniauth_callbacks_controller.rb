class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.find_for_oauth(request.env["omniauth.auth"], current_user)

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
      
    else
      session["devise.omniauth_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end
  
  def linkedin
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.find_for_oauth(request.env["omniauth.auth"], current_user)
    
    #raise request.env["omniauth.auth"].except("extra").to_yaml 

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "LinkedIn") if is_navigational_format?
      
    else
      session["devise.omniauth_data"] = request.env["omniauth.auth"].except("extra")
      redirect_to new_user_registration_url
    end
  end
  
  def google_oauth2
      
      # THIS IS ONLY USED FOR pulling Google Refresh Token. 
      # Use only to acquire refresh token...
      raise request.env["omniauth.auth"].to_yaml
      
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      
      # @user = User.find_for_google_oauth2(request.env["omniauth.auth"], current_user)

      # if @user.persisted?
      #  flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
      #  sign_in_and_redirect @user, :event => :authentication
      # else
      #  session["devise.google_data"] = request.env["omniauth.auth"]
      #  redirect_to new_user_registration_url
      # end
  end
end