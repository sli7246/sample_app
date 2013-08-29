class PaymentsController < ApplicationController
  before_filter :signed_in_user, only: [:register_user, :destroy]
  before_filter :initilize_api
  
  def new    
  end
  
  def register_user
    
  end
  
  def test
    @create_account = @account_api.build_create_account({
      :accountType => "Personal",
      :name => {
        :salutation => "Mr.",
        :firstName => "Bonzop",
        :middleName => "Simore",
        :lastName => "Zaius" },
      :dateOfBirth => "1968-01-01",
      :address => {
        :line1 => "1968 Ape Way",
        :city => "Austin",
        :state => "TX",
        :postalCode => "78750",
        :countryCode => "US" },
      :contactPhoneNumber => "5126914160",
      :homePhoneNumber => "5126914160",
      :mobilePhoneNumber => "5126914160",
      :currencyCode => "USD",
      :citizenshipCountryCode => "US",
      :preferredLanguageCode => "en_US",
      :notificationURL => "http://localhost:3000/samples/adaptive_accounts/ipn_notify",
      :emailAddress => "newEmailAddress@paypal.com",
      :registrationType => "Web",
      :createAccountWebOptions => {
        :returnUrl => "http://localhost:3000/samples/adaptive_accounts/create_account",
        :showAddCreditCard => true } })
  
    # Make API call & get response
    @create_account_response = @account_api.create_account(@create_account)
    
    raise @create_account_response.to_yaml
    
    # Response status
    if @create_account_response.success?
      print @create_account_response.accountId
    else
      print @create_account_response.error[0].message
    end
  end
  
  private 
    def initilize_api
      
      
      @account_api = PayPal::SDK::AdaptiveAccounts.new
      @payment_api = PayPal::SDK::AdaptivePayments.new
    end
end
