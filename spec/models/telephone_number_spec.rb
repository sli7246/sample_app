require 'spec_helper'

describe TelephoneNumber do
  let(:user) { FactoryGirl.create(:user) }
    
  before { 
    @tele_number = user.telephone_numbers.build(country_code: "001", phone_number: "675-709-9435", primary: "San Francisco")
  }
  
  subject { @tele_number }
  
  it { should respond_to(:country_code) }
  it { should respond_to(:phone_number) }
  it { should respond_to(:primary) }
  it { should respond_to(:user_id) }
end
