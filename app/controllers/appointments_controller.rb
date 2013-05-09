class AppointmentsController < ApplicationController
  before_filter :signed_in_user
  
  def create
    @user = User.find(params[:appointment][:user_two_id])
    
    app_non_utc_date = Date.strptime(params[:appointment][:app_date], "%m/%d/%Y")
    app_non_utc_time = Time.parse(params[:appointment][:app_time])
    
    # Code to store all appointments as UTC code in the database. 
    # Quite messy right now, will refactor when able.
    app_utc_date_time = DateTime.new(app_non_utc_date.year, app_non_utc_date.month, app_non_utc_date.day, app_non_utc_time.hour, app_non_utc_time.min) - 
            ActiveSupport::TimeZone[current_user.time_zone].utc_offset.seconds    
    app_utc_date = Date.new(app_utc_date_time.year, app_utc_date_time.month,app_utc_date_time.day)
    app_utc_time = Time.new(app_utc_date_time.year, app_utc_date_time.month,app_utc_date_time.day, app_utc_date_time.hour, app_utc_date_time.min, 0, "+00:00")
    
    current_user.book_appointment!(@user, app_utc_date, app_utc_time)
    respond_to do |format|
      format.html { redirect_to @user}  
      format.js
    end
  end
  
  def destroy
    if current_user.id == params[:appointment][:user_one_id].to_i
      @user = User.find(params[:appointment][:user_two_id])
    else
      @user = User.find(params[:appointment][:user_one_id])
    end
    current_user.cancel_appointment!(@user, params[:appointment][:app_date_time])
    respond_to do |format|
      format.html { redirect_to @user}  
      format.js
    end
  end
end