#class SessionsController < ApplicationController
#
#  def new
#  end
#
#  def create
#    user = User.find_by_email(params[:session][:email].downcase)
#    if user && user.authenticate(params[:session][:password])
#      sign_in_ user
#      redirect_back_or user
#    else
#      flash.now[:error] = 'Invalid email/password combination'
#      render 'new'
#    end
#  end
#
#  def destroy
#    sign_out
#    redirect_to root_url
#  end
#  
#  def signed_in_user
#      store_location
#      redirect_to signin_url, notice: "Please sign in." unless signed_in?
#    end
#end