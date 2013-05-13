class StaticPagesController < ApplicationController
  def home
    if signed_in?
      @micropost  = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])
      
      # Perhaps add these to ApplicationControler? used in multiple places
      @booked_appointments = current_user.all_appointments(true, true).paginate(page: params[:prop_app_page]) 
      @proposed_appointments = current_user.all_appointments(false).paginate(page: params[:final_app_page]) 
    end
  end

  def help
  end
  
  def about
  end
  
  def contact
  end
end
