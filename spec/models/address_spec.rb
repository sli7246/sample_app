require 'spec_helper'

describe Address do
  let(:user) { FactoryGirl.create(:user) }
  
  before { 
    @address = user.addresses.build(line1: "177 2nd Avenue", line2: "Apt. 14E", city: "San Francisco",zip: '10000', country_code: "US")
  }

  subject { @address }
  
  it { should respond_to(:line1) }
  it { should respond_to(:line2) }
  it { should respond_to(:city) }
  it { should respond_to(:country_code) }
  it { should respond_to(:address_nickname) }
  its(:user) { should == user }

  it { should be_valid }
  
  describe "when user_id is not present" do
    before { @address.user_id = nil }
    it { should_not be_valid }
  end
  
  describe "accessible attributes" do
    it "should not allow access to user_id" do
      expect do
        Address.new(user_id: user.id)
      end.to raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end    
  end
end
