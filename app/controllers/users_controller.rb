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
    # To be eventually replaced with a case statement
    if params[:user][:edit_type] = 'setup_payments'
      setup_payments
    else 
      #raise params[:user][:addresses].to_yaml
      raise params.to_yaml
      # Need this session to ensure 
      
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
  end
  
  private
    def admin_user
      redirect_to(root_path) unless current_user.admin?
    end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path) unless current_user?(@user)
    end
    
    def setup_payments
      
      @account_api = PayPal::SDK::AdaptiveAccounts.new
      
      # There should really just be one telephone number and address      
      @address = current_user.addresses.build(params[:user][:addresses])
      @address.state = params[:user_addresses][:state]
      
      @telephone_number = current_user.telephone_numbers.build(params[:user][:telephone_numbers])
      
      if (@telephone_number.country_code.blank?)
        @telephone_number.country_code = params[:user][:addresses][:country_code]
      end
        
      # Save telephone number and address  
      if !@telephone_number.save
        if !TelephoneNumber.exists?(:phone_number => @telephone_number.phone_number)
          flash[:error] = "It appears you did not enter a valid telephone number. Please try again"
          redirect_to payments_register_user_path
          return
        end
      end  
        
      if !@address.save
        flash[:error] = "It appears you did not enter a valid address. Please try again"
        redirect_to payments_register_user_path
        # return
      end
      
      # Create adaptive payments account creation call  
      @create_account = @account_api.build_create_account({
        :accountType => "Premier",
        :name => {
          :firstName => current_user.first_name,
          :lastName => current_user.last_name },
        :address => {
          :line1 => @address.line2.empty? ? @address.line1 : @address.line1 + 'Apt#' + @address.line2,
          :city => @address.city,
          :state => @address.state,
          :postalCode => @address.zip,
          :countryCode => @address.country_code },
        :contactPhoneNumber => @telephone_number.phone_number,
        # Use as default
        :currencyCode => "USD",
        :citizenshipCountryCode => @address.country_code,
        :preferredLanguageCode => "en_US",
        ## :notificationURL => "http://localhost:3000/samples/adaptive_accounts/ipn_notify",
        :emailAddress => current_user.email,
        :registrationType => "Web",
        :createAccountWebOptions => {
          :returnUrl => "http://localhost:3000/",
          } })
        
      # Make API call & get response
      @create_account_response = @account_api.create_account(@create_account)
      
      # Response status
      if @create_account_response.success?
        print @create_account_response.accountId
        redirect_to @create_account_response.redirectURL
      else
        print @create_account_response.error[0].message
        redirect_to 'static_pages/home'
        return
      end  
    end
end
