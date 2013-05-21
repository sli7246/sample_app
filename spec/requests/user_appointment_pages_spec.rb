require 'spec_helper'

describe "appointments" do
  
  subject { page }

  let(:user) { FactoryGirl.create(:user) }
  let(:other_user) { FactoryGirl.create(:user) }
  let(:prop_one_time) { Time.new(2023, 7, 24, 10, 30, 0, "+00:00") - 0 } 
  let(:prop_two_time) { Time.new(2023, 7, 25, 10, 30, 0, "+00:00") - 0 } 
  let(:prop_three_time) { Time.new(2023, 7, 26, 10, 30, 0, "+00:00") - 0 }
   
  before do 
    user.propose_appointment!(other_user, prop_one_time, prop_two_time, prop_three_time, "Valid Test Case")
    user.propose_appointment!(other_user, prop_one_time-1000000000, prop_two_time-1000000000, prop_three_time-1000000000, "Invalid Historical Test Case")
    sign_in other_user
    visit root_path
  end
 
  it { should have_content('Micropost Feed') } 
  it { should have_content('You must enter your current time zone to view your outstanding chat requests') }
  it { should_not have_content('Which times work for you?') }
  
  describe "with other_user with time_zone" do
    before do
      click_link "Sign out"
      other_user.time_zone = 'Georgetown'
      other_user.save
      sign_in other_user
    end
     
    it { should have_content('Which times work for you?') }  
    it { should have_content('if you are no longer in') }
    it { should have_content('Valid Test Case') }
    it { should_not have_content('Invalid Historical Test Case') }
    
    describe "and am booking appointment" do
      before do 
        #puts page.body
        
        select 'Jul 25, 2023 at 6:30 AM', :from => 'appointment_app_date_time'
        #within '#appointment_app_date_time' do
        #  find("option[value='2013-07-25 10:30:00 UTC']").click
        #end
        click_button 'Book it!'
      end
      
      it { should have_content('Micropost Feed') }
      it { should_not have_content('Which times work for you?') }  
      it { should have_content('if you are no longer in') }
      
      describe ". Original user should see booked appointment" do
        before do
          click_link "Sign out"
          user.time_zone = "Almaty"
          user.save
          sign_in user
          visit user_path(other_user)
          # puts page.body
        end
        
        it { should have_content("Your upcoming chats") }
        it { should have_content("On Jul 25, 2023 at 4:30 PM")}
        
        describe "Canceling the appointment should remove the booking" do
          before do
            click_button "Cancel appointment"
          end
          
          specify { user.all_appointments(false, false).any?.should == false }
        end
      end
    end
  
    describe "and am changing the appointment parameters." do
      before do 
        click_link "Propose alternative times"
        fill_in "appointment_prop_one_app_date", with: "05/22/2013"
        fill_in "appointment_prop_one_app_time", with:  "12:30am"
        fill_in "appointment_prop_two_app_date", with:  "05/23/2013"
        fill_in "appointment_prop_two_app_time", with:  "08:30pm"
        fill_in "appointment_prop_three_app_date", with:  "05/27/2013"
        fill_in "appointment_prop_three_app_time", with:  "09:30am"
        fill_in "appointment_app_introduction", with: "This is a stick up!"
        click_button "Update Request"
      end
     
      it { should_not have_content('Which times work for you?') }  
      it { should have_content('if you are no longer in') }
    
      describe "The first user should not now be required to update the appointment" do
        before do
          click_link "Sign out"
          user.time_zone = "Almaty"
          user.save
          sign_in user
          visit root_path
        end
 
        it { should have_content('Micropost Feed') } 
        it { should_not have_content('You must enter your current time zone to view your outstanding chat requests') }
        it { should have_content('Which times work for you?') }
        it { should have_content('This is a stick up!') }
      end
    end
  end
end