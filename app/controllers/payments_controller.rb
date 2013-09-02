class PaymentsController < ApplicationController
  before_filter :signed_in_user, only: [:register_user, :destroy]
  before_filter :initilize_api
  
  def new    
  end
  
  def register_user 
  end
  
  def create_callback
  end
  
  def subregion_options
    render partial: 'subregion_select'
  end
  
  
  
  private 
    def initilize_api
      @account_api = PayPal::SDK::AdaptiveAccounts.new
      @payment_api = PayPal::SDK::AdaptivePayments.new
    end
end
