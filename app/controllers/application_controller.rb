class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper
  before_filter :pull_user_appointments

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
  
  private 
    def pull_user_appointments
    if signed_in?
      @booked_appointments = current_user.all_appointments(true, true).paginate(page: params[:app_page]) 
      @proposed_appointments = current_user.all_appointments(false).paginate(page: params[:final_app_page]) 
    end
  end
end
