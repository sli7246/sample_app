class ApplicationController < ActionController::Base
  protect_from_forgery
  
  include SessionsHelper

  # Force signout to prevent CSRF attacks
  def handle_unverified_request
    sign_out
    super
  end
  
  def after_sign_in_path_for(resource)
    resource # Note presence of 'resource'
  end
  
  def after_sign_out_path_for(resource)
    root_url # Note presence of 'resource'
  end
end
