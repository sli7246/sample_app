require 'spec_helper'

describe Address do
  let(:user) { FactoryGirl.create(:user) }
  
  before { 
    @address = user.addresses.build(line1: "177 2nd Avenue", line2: "Apt. 14E", city: "San Francisco", country_code: "USA")
  }

  subject { @address }
  
  it { should respond_to(:line1) }
  it { should respond_to(:line2) }
  it { should respond_to(:city) }
  it { should respond_to(:country_code) }
  it { should respond_to(:address_nickname) }
end
