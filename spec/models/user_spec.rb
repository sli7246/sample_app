# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  email      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'spec_helper'

describe User do

  before { @user = User.new(first_name: "Example", last_name: "User", email: "user@example.com", 
    password: "foobarar", password_confirmation: "foobarar") }

  subject { @user }

  it { should respond_to(:name) }
  it { should respond_to(:first_name) }
  it { should respond_to(:last_name) }
  it { should respond_to(:email) }
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should respond_to(:remember_token) }
  it { should respond_to(:admin) }
  it { should respond_to(:microposts) }
  it { should respond_to(:feed) }
  it { should respond_to(:relationships) }
  it { should respond_to(:followed_users) }
  it { should respond_to(:reverse_relationships) }
  it { should respond_to(:following?) }
  it { should respond_to(:follow!) }
  it { should respond_to(:followers) }
  it { should respond_to(:appointments) }
  it { should respond_to(:booked_appointment?) }
  it { should respond_to(:cancel_appointment!) }
  
  it { should be_valid }
  it { should_not be_admin }
  
  describe "with admin attribute set to 'true'" do
    before do
      @user.save!
      @user.toggle!(:admin)
    end

    it { should be_admin }
  end

  #Name validation tests
  describe "when first name is not present" do
    before { @user.first_name = " " }
    it { should_not be_valid }
  end
  
  describe "when first name is too long" do
    before { @user.first_name = "a" * 51 }
    it { should_not be_valid }
  end
  
  describe "when last name is not present" do
    before { @user.last_name = " " }
    it { should_not be_valid }
  end
  
  describe "when last name is too long" do
    before { @user.last_name = "a" * 51 }
    it { should_not be_valid }
  end
  
  describe "when Email is not present" do
    before { @user.email = " " }
    it { should_not be_valid }
  end
  
  #Invalid email addresses
  describe "when email format is invalid" do
    it "should be invalid" do
      addresses = %w[user@foo,com user_at_foo.org example.user@foo.
                     foo@bar_baz.com foo@bar+baz.com]
      addresses.each do |invalid_address|
        @user.email = invalid_address
        @user.should_not be_valid
      end      
    end
  end

  #Test to confirm that emails have been downcased
  describe "email address with mixed case" do
    let(:mixed_case_email) { "Foo@ExAMPle.CoM" }

    it "should be saved as all lower-case" do
      @user.email = mixed_case_email
      @user.save
      @user.reload.email.should == mixed_case_email.downcase
    end
  end
  
  #Valid email addresses
  describe "when email format is valid" do
    it "should be valid" do
      addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
      addresses.each do |valid_address|
        @user.email = valid_address
        @user.should be_valid
      end      
    end
  end
  
  #Duplicate email address check
  describe "when email address is already taken" do
    before do
      user_with_same_email = @user.dup
      user_with_same_email.email = @user.email.upcase
      user_with_same_email.save
    end

    it { should_not be_valid }
  end
  
  #Check that both password and pass_confirmationa are present
  describe "when password is not present" do
    before { @user.password = @user.password_confirmation = " " }
    it { should_not be_valid }
  end
  
  #Check that passwor and password confirmation are matching
  describe "when password doesn't match confirmation" do
    before { @user.password_confirmation = "mismatch" }
    it { should_not be_valid }
  end
  
  #Check if the password confirmation is nil. Note this is only imapcting in the console and not the actual web
  describe "when password confirmation is nil" do
    before { @user.password_confirmation = nil }
    it { should_not be_valid }
  end

  # Tests related to user authentication  
  describe "with a password that's too short" do
    before { @user.password = @user.password_confirmation = "a" * 5 }
    it { should be_invalid }
  end

  describe "return value of authenticate method" do
    before { @user.save }
    let(:found_user) { User.find_by_email(@user.email) }

    describe "with valid password" do
      specify { found_user.valid_password?(@user.password).should be_true }
    end

    describe "with invalid password" do
      specify { found_user.valid_password?("invalid").should be_false }
    end
  end
  
  describe "remember token" do
    before { @user.save }
    its(:remember_token) { should_not be_blank }
  end
  
  describe "address associations" do
    before { @user.save }
    let!(:address) do
      FactoryGirl.create(:address, user: @user)
    end
    
    it "should destroy associated address" do
      addresses = @user.addresses.dup
      @user.destroy
      addresses.should_not be_empty
      addresses.each do |address|
        Address.find_by_id(address.id).should be_nil
      end
    end
  end
  
   describe "telephone number associations" do
    before { @user.save }
    let!(:telephone_number) do
      FactoryGirl.create(:telephone_number, user: @user)
    end
    
    it "should destroy associated telephone number" do
      telephone_numbers = @user.telephone_numbers.dup
      @user.destroy
      telephone_numbers.should_not be_empty
      telephone_numbers.each do |telephone_number|
        TelephoneNumber.find_by_id(telephone_number.id).should be_nil
      end
    end
  end
  
  
  describe "micropost associations" do

    before { @user.save }
    let!(:older_micropost) do 
      FactoryGirl.create(:micropost, user: @user, created_at: 1.day.ago)
    end
    let!(:newer_micropost) do
      FactoryGirl.create(:micropost, user: @user, created_at: 1.hour.ago)
    end

    it "should have the right microposts in the right order" do
      @user.microposts.should == [newer_micropost, older_micropost]
    end
    
    
    it "should destroy associated microposts" do
      microposts = @user.microposts.dup
      @user.destroy
      microposts.should_not be_empty
      microposts.each do |micropost|
        Micropost.find_by_id(micropost.id).should be_nil
      end
    end
    
    describe "status" do
      let(:unfollowed_post) do
        FactoryGirl.create(:micropost, user: FactoryGirl.create(:user))
      end
      let(:followed_user) { FactoryGirl.create(:user) }

      before do
        @user.follow!(followed_user)
        3.times { followed_user.microposts.create!(content: "Lorem ipsum") }
      end

      its(:feed) { should include(newer_micropost) }
      its(:feed) { should include(older_micropost) }
      its(:feed) { should_not include(unfollowed_post) }
      its(:feed) do
        followed_user.microposts.each do |micropost|
          should include(micropost)
        end
      end
    end
  end
  
  describe "following" do
    let(:other_user) { FactoryGirl.create(:user) }    
    before do
      @user.save
      @user.follow!(other_user)
    end

    it { should be_following(other_user) }
    its(:followed_users) { should include(other_user) }
    
    describe "followed user" do
      subject { other_user }
      its(:followers) { should include(@user) }
    end
    
    describe "and unfollowing" do
      before { @user.unfollow!(other_user) }

      it { should_not be_following(other_user) }
      its(:followed_users) { should_not include(other_user) }
    end
  end
  
  describe "proposing appointment" do
    let(:other_user) { FactoryGirl.create(:user) } 
    let(:prop_one_time)     { Time.new(2023, 7, 24, 
                                 10, 30, 0, "+00:00") - 0} 
    let(:prop_two_time)     { Time.new(2023, 7, 24, 
                                 10, 30, 0, "+00:00") - 0} 
    let(:prop_three_time)   { Time.new(2023, 7, 24, 
                                 10, 30, 0, "+00:00") - 0}
    let(:app_introduction)  { "" }                              
                          
    before do
      @user.save
      @appointment = @user.propose_appointment!(other_user, prop_one_time, prop_two_time, prop_three_time, app_introduction)
      @appointment.save
    end
    
    its(:all_appointments) { should include( @appointment ) }
    
    describe "proposed appointment" do
      subject {@appointment}
      
      it "reflect the last update was from @user" do
        @appointment.last_update_from.should == @user.id
      end
    end 
  end
end