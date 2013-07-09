class UsersController < ApplicationController
  before_filter :authenticate_user!, only: [:index, :edit, :destroy, :following, :followers, :update]
  before_filter :correct_user,   only: [:edit, :update]
  before_filter :admin_user,     only: :destroy

  def show 
    @user = User.find(params[:id])
    @microposts = @user.microposts.paginate(page: params[:page])
    
    if signed_in?
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
    if params[:search].present?
      @search = User.search do
        fulltext params[:search]
      end
      @users = @search.results.paginate(page: params[:page])
      @header = "Results for '"+params[:search]+"'"
    else
      @users = User.paginate(page: params[:page])
      @header = "All users"
    end
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
    store_location
    current_user.update_attribute(:time_zone, params[:user][:time_zone])
    respond_to do |format|
      format.html { 
          @user = User.find(params[:id])
          redirect_to(session[:return_to] || root_url)
       }
      #format.js
    end
  end
 
  # Need to update this function. 
  def update
    # Need this session to ensure 
    # raise "wtf".to_yaml
    
    if !params[:user][:crop_x].nil? then 
      @user.update_attribute(:crop_x, params[:user][:crop_x])
      @user.update_attribute(:crop_y, params[:user][:crop_y])
      @user.update_attribute(:crop_h, params[:user][:crop_h])
      @user.update_attribute(:crop_w, params[:user][:crop_w])
    end
    
    if  @user.update_attributes(params[:user])
      flash[:success] = "Profile updated"
      redirect_to @user
    else 
      flash[:notice] = "Something went wrong, please contact us if this error persists"
      redirect_to @user
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
