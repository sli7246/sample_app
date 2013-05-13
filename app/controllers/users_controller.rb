class UsersController < ApplicationController
  before_filter :authenticate_user!, only: [:index, :edit, :destroy, :following, :followers]
  before_filter :correct_user,   only: [:edit, :update]
  before_filter :admin_user,     only: :destroy
  
  def show
    @user = User.find(params[:id])
    @microposts = @user.microposts.paginate(page: params[:page])

    if signed_in?
      @booked_appointments = current_user.all_appointments(true, true).paginate(page: params[:app_page]) 
      @proposed_appointments = current_user.all_appointments(false).paginate(page: params[:final_app_page]) 
      
      # Should really just store names separately as first name and last name
      @app_message = "What would you like to speak with " + @user.name.split(" ")[0] + " about?"
    end
  end

  def new
    @user = User.new
  end
  
  def edit
  end
  
  def index
    @users = User.paginate(page: params[:page])
  end
  
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User destroyed."
    redirect_to users_url
  end
  
  def following
    @title = "Following"
    @user = User.find(params[:id])
    @users = @user.followed_users.paginate(page: params[:page])
    render 'show_follow'
  end

  def followers
    @title = "Followers"
    @user = User.find(params[:id])
    @users = @user.followers.paginate(page: params[:page])
    render 'show_follow'
  end
  
  def time_zone
    current_user.update_attribute(:time_zone, params[:user][:time_zone])
    respond_to do |format|
      format.html { 
          @user = User.find(params[:id])
          redirect_to @user
       }
      #format.js
    end
  end
  
  private

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path) unless current_user?(@user)
    end
    
    def admin_user
      redirect_to(root_path) unless current_user.admin?
    end
end
