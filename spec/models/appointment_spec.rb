require 'spec_helper'

describe Appointment do
  let(:user_one) { FactoryGirl.create(:user) }
  let(:user_two) { FactoryGirl.create(:user) }
  let(:appointment) { user_one.appointments.build( user_two_id:user_two.id, app_date:"1/12/2013".to_date, app_time:Time.new("2:30PM") ) }
  
  subject { appointment }
  
  describe "accessible attributes" do
    it "should not allow access to user_one_id" do 
      expect do 
        Appointment.new(user_one_id:user_one.id)
      end.to raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end
  end
  
  describe "appointment methods" do    
    it { should respond_to(:user_one) }
    it { should respond_to(:user_two) }
    its(:user_one) { should == user_one }
    its(:user_two) { should == user_two }
  end
  
  # Validation Tests
  describe "when user_one id is not present" do
    before { appointment.user_one_id = nil }
    it { should_not be_valid }
  end

  describe "when user_two id is not present" do
    before { appointment.user_two_id = nil }
    it { should_not be_valid }
  end
end
