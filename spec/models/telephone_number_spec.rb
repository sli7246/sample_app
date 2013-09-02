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
  it { should respond_to(:telephone_nickname) }
  its(:user) { should == user }

  it { should be_valid }
  
  describe "when user_id is not present" do
    before { @tele_number.user_id = nil }
    it { should_not be_valid }
  end
  
  describe "accessible attributes" do
    it "should not allow access to user_id" do
      expect do
        TelephoneNumber.new(user_id: user.id)
      end.to raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end    
  end
  
  
  describe "when phone_number is already taken" do
    before do
      same_tele_phone = @tele_number.dup
      same_tele_phone.save
    end

    it { should_not be_valid }
  end
end
