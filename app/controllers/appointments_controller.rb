class AppointmentsController < ApplicationController
  before_filter :signed_in_user
  
  def create
    @user = User.find(params[:appointment][:user_two_id])
    current_user.book_appointment!(@user, Date.strptime(params[:appointment][:app_date], "%m/%d/%Y"))
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
    current_user.cancel_appointment!(@user, params[:appointment][:app_date])
    respond_to do |format|
      format.html { redirect_to @user}  
      format.js
    end
  end
end