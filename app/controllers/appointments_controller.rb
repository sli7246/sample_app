class AppointmentsController < ApplicationController
  before_filter :signed_in_user
  
  def show
    @appointment = Appointment.find(params[:id])
    
    # Authenticate that the user can view the current appointment
    unless @appointment.user_one_id == current_user.id || @appointment.user_two_id == current_user.id
      flash[:success] = "You do not have permission to view this appointment"
      redirect_to root_url
    end
    
    # Identify the other party in the appointment
    if current_user.id == @appointment.user_one_id
      @other_user = User.find(@appointment.user_two_id)
    else 
      @other_user = User.find(@appointment.user_one_id)
    end
    
    # Handle all OpenTok variables
    @appointment.set_opentok_session(request.ip)
    @token = OPENTOK_SDK.generateToken :session_id => @appointment.opentok_session
    
    # Whiteboar Refresh Token
    refresh_token
  end
  
  def create
    flash[:success] = "Your appointment request has been sent."
    
    @user = User.find(params[:appointment][:user_two_id])
    proposed_times = []
    
    #Pull in all data from user input form
    timezone_offset_sec = ActiveSupport::TimeZone[current_user.time_zone].utc_offset.seconds    
    
    proposed_times[0] = DateTime.strptime(params[:appointment][:prop_one_app_date] + " " + params[:appointment][:prop_one_app_time], "%m/%d/%Y %l:%M%p") - timezone_offset_sec
    proposed_times[1] = DateTime.strptime(params[:appointment][:prop_two_app_date] + " " + params[:appointment][:prop_two_app_time], "%m/%d/%Y %l:%M%p") - timezone_offset_sec
    proposed_times[2] = DateTime.strptime(params[:appointment][:prop_three_app_date] + " " + params[:appointment][:prop_three_app_time], "%m/%d/%Y %l:%M%p") - timezone_offset_sec
    
    current_user.propose_appointment!(@user, proposed_times[0], proposed_times[1], proposed_times[2], params[:appointment][:app_introduction])
    # raise AppointmentMailer.appointment_proposal(current_user, @user).to_yaml
    
    AppointmentMailer.appointment_proposal(current_user, @user).deliver
    
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
      flash[:success] = "You have updated the appointment request."
      proposed_times = []
            
      #Pull in all data from user input form
      timezone_offset_sec = ActiveSupport::TimeZone[current_user.time_zone].utc_offset.seconds    
      
      
      proposed_times[0] = DateTime.strptime(params[:appointment][:prop_one_app_date] + " " + params[:appointment][:prop_one_app_time], "%m/%d/%Y %l:%M%p") - timezone_offset_sec
      proposed_times[1] = DateTime.strptime(params[:appointment][:prop_two_app_date] + " " + params[:appointment][:prop_two_app_time], "%m/%d/%Y %l:%M%p") - timezone_offset_sec
      proposed_times[2] = DateTime.strptime(params[:appointment][:prop_three_app_date] + " " + params[:appointment][:prop_three_app_time], "%m/%d/%Y %l:%M%p") - timezone_offset_sec
    
      @appointment.update_attributes!(  :prop_one_app_date_time => proposed_times[0],
                                        :prop_two_app_date_time => proposed_times[1],
                                        :prop_three_app_date_time => proposed_times[2],
                                        :app_introduction => params[:appointment][:app_introduction])      
      
      @appointment.last_update_from = current_user.id
      @appointment.save!
      
      redirect_to root_url
    else
      booked_date_time = params[:appointment][:app_date_time]
      @appointment.book_appointment(booked_date_time)
      
      flash[:success] = "Congratulations! You have successfully booked the appointment."
      redirect_to root_url
    end
  end
  
  def destroy
    
    if current_user.id == params[:appointment][:user_one_id].to_i
      @user = User.find(params[:appointment][:user_two_id])
    else
      @user = User.find(params[:appointment][:user_one_id])
    end
    
    flash[:success] = "You have turned down the appointment request."
    current_user.cancel_appointment!(@user, params[:appointment][:app_date_time])
    respond_to do |format|
      format.html { redirect_to @user}  
      format.js
    end
  end
end

private 

# Note this code should NEVER be used as the Google Drive Token should auto refresh
def refresh_token
  data = {
    :client_id => GOOGLE_CLIENT_ID,
    :client_secret => GOOGLE_CLIENT_SECRET,
    :refresh_token => GOOGLE_REFRESH_TOKEN,
    :grant_type => "refresh_token"
  }
  @response = ActiveSupport::JSON.decode(RestClient.post "https://accounts.google.com/o/oauth2/token", data)
  
  unless @response["access_token"].present?
    flash[:notice] = "Failed to create token"
    #self.oauth2_token = @response["access_token"]
    #self.oauth2_token_expires_at = Time.now.utc + @response["expires_in"].to_i.seconds
    #self.save!
  end
#rescue RestClient::BadRequest => e
  # Bad request
#rescue
  # Something else bad happened
end