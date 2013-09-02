require 'spec_helper'

describe "Payment pages" do

  subject { page }
  
  let(:user) { FactoryGirl.create(:user) }
  before { 
      sign_in user 
  }

  describe "adaptive user creation" do
    
    before { visit payments_register_user_path }
    
    describe "with invalid information" do
      describe 'i.e. without any information filled in' do
        it "should not create a new adaptive user" do
            expect { click_button "Submit" }.not_to change(Address, :count)
            expect { click_button "Submit" }.not_to change(TelephoneNumber, :count)
        end
    
        describe "error messages" do
          before { click_button "Submit" }
          it { should have_selector('div.alert.alert-error')}
        end
      end
      
      describe "i.e. without any telephone number information filled in" do
        before do
          fill_in "Street Address", with: "200 ShortStone Drive"
          fill_in "Apt #", with: "14E"
          fill_in "City", with: "Shanghai"
          fill_in "Zip Code", with: "00000"
          select 'United States', from: 'user_addresses_country_code'
          select 'New York', from: 'order_state_code'
          click_button "Submit" 
        end
        
        it { should have_selector('div.alert.alert-error', text: 'It appears you did not enter a valid telephone number. Please try again')}
      end
      
      describe 'i.e. without any address information filled in' do
        before do 
          select 'United States', from: 'user_telephone_numbers_country_code'
          fill_in 'Phone Number', with: '1234567890'
          click_button "Submit"
        end
        
        it { should have_selector('div.alert.alert-error', text: 'It appears you did not enter a valid address. Please try again')}
      end
    end
    
=begin    
    describe 'with valid information' do
      before do
        fill_in "Street Address", with: "200 ShortStone Drive"
        fill_in "Apt #", with: "14E"
        fill_in "City", with: "Shanghai"
        fill_in "Zip Code", with: "00000"
        select 'United States', from: 'user_addresses_country_code'
        select 'New York', from: 'order_state_code'
        select 'United States', from: 'user_telephone_numbers_country_code'
        fill_in 'Phone Number', with: '1234567890'
        click_button "Submit" 
      end
      
      it { should have_selector('div.alert.alert-error', text: 'It appears you did not enter a valid address. Please try again')}
    end
=end    
  end
end