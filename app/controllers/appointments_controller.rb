class AppointmentsController < ApplicationController
  before_filter :signed_in_user
  
  def create
    @user = User.find(params[:appointment][:user_two_id])
    
    #Pull in all data from user input form
    timezone_offset_sec = ActiveSupport::TimeZone[current_user.time_zone].utc_offset.seconds    
    
    prop_one_app_non_utc_date = Date.strptime(params[:appointment][:prop_one_app_date], "%m/%d/%Y")
    prop_one_app_non_utc_time = Time.parse(params[:appointment][:prop_one_app_time])
    
    prop_two_app_non_utc_date = Date.strptime(params[:appointment][:prop_two_app_date], "%m/%d/%Y")
    prop_two_app_non_utc_time = Time.parse(params[:appointment][:prop_two_app_time])
    
    prop_three_app_non_utc_date = Date.strptime(params[:appointment][:prop_three_app_date], "%m/%d/%Y")
    prop_three_app_non_utc_time = Time.parse(params[:appointment][:prop_three_app_time])
    
    # Code to store all appointments as UTC code in the database. 
    # Quite messy right now, will refactor when able.
    prop_one_app_utc_time =   Time.new(prop_one_app_non_utc_date.year, prop_one_app_non_utc_date.month, prop_one_app_non_utc_date.day, 
                                 prop_one_app_non_utc_time.hour, prop_one_app_non_utc_time.min, 0, "+00:00") - timezone_offset_sec  
    prop_two_app_utc_time =   Time.new(prop_two_app_non_utc_date.year, prop_two_app_non_utc_date.month, prop_two_app_non_utc_date.day, 
                                 prop_two_app_non_utc_time.hour, prop_two_app_non_utc_time.min, 0, "+00:00") - timezone_offset_sec  
    prop_three_app_utc_time = Time.new(prop_three_app_non_utc_date.year, prop_three_app_non_utc_date.month, prop_three_app_non_utc_date.day, 
                                 prop_three_app_non_utc_time.hour, prop_three_app_non_utc_time.min, 0, "+00:00") - timezone_offset_sec                                                            
            
    current_user.propose_appointment!(@user, prop_one_app_utc_time, prop_two_app_utc_time, prop_three_app_utc_time, params[:appointment][:app_introduction])
    respond_to do |format|
      format.html { redirect_to @user}  
      format.js
    end
  end
  
  def edit
    @appointment = Appointment.find(params[:id])
    
    if params[:commit] == ' Reject '
      @appointment.destroy
      redirect_to current_user
    elsif params[:commit] == 'Update Request'      
      
      #Pull in all data from user input form
      timezone_offset_sec = ActiveSupport::TimeZone[current_user.time_zone].utc_offset.seconds    
      
      prop_one_app_non_utc_date = Date.strptime(params[:appointment][:prop_one_app_date], "%m/%d/%Y")
      prop_one_app_non_utc_time = Time.parse(params[:appointment][:prop_one_app_time])
      
      prop_two_app_non_utc_date = Date.strptime(params[:appointment][:prop_two_app_date], "%m/%d/%Y")
      prop_two_app_non_utc_time = Time.parse(params[:appointment][:prop_two_app_time])
      
      prop_three_app_non_utc_date = Date.strptime(params[:appointment][:prop_three_app_date], "%m/%d/%Y")
      prop_three_app_non_utc_time = Time.parse(params[:appointment][:prop_three_app_time])
      
      # Code to store all appointments as UTC code in the database. 
      # Quite messy right now, will refactor when able.
      prop_one_app_utc_time =   Time.new(prop_one_app_non_utc_date.year, prop_one_app_non_utc_date.month, prop_one_app_non_utc_date.day, 
                                   prop_one_app_non_utc_time.hour, prop_one_app_non_utc_time.min, 0, "+00:00") - timezone_offset_sec  
      prop_two_app_utc_time =   Time.new(prop_two_app_non_utc_date.year, prop_two_app_non_utc_date.month, prop_two_app_non_utc_date.day, 
                                   prop_two_app_non_utc_time.hour, prop_two_app_non_utc_time.min, 0, "+00:00") - timezone_offset_sec  
      prop_three_app_utc_time = Time.new(prop_three_app_non_utc_date.year, prop_three_app_non_utc_date.month, prop_three_app_non_utc_date.day, 
                                   prop_three_app_non_utc_time.hour, prop_three_app_non_utc_time.min, 0, "+00:00") - timezone_offset_sec                                                            
      
      @appointment.update_attributes!( :prop_one_app_date_time => prop_one_app_utc_time.to_datetime,
                                      :prop_two_app_date_time => prop_two_app_utc_time.to_datetime,
                                      :prop_three_app_date_time => prop_three_app_utc_time.to_datetime,
                                      :app_introduction => params[:appointment][:app_introduction])      
      
      @appointment.last_update_from = current_user.id
      @appointment.save!
      
      redirect_to root_url
    else
      @appointment.update_attributes(:app_date_time => params[:appointment][:app_date_time], :app_accepted => true)
      redirect_to root_url
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
  
  private
  
end