FactoryGirl.define do
  factory :user do
    sequence(:first_name)  { |n| "Person #{n}" }
    sequence(:last_name)  { |n| "Person #{n}" }
    sequence(:email) { |n| "person_#{n}@example.com"}   
    password "foobarar"
    password_confirmation "foobarar"
    confirmed_at Time.now
    factory :admin do
      admin true
    end
  end
  
  factory :address do
    user
    sequence(:line1) { |n| "#{n} 1st Street"}
    sequence(:line2) { |n| "Apt #{n}" }
    city "Philadelphia"
    country_code "United States"
    sequence(:address_nickname) { |n| "Address #{n}" }
  end
  
  factory :telephone_number do
    user
    country_code "001"
    phone_number "000-000-0000"
    primary "true"
    telephone_nickname "home"
  end

  factory :micropost do
    content "Lorem ipsum"
    user
  end
  
  factory :appointment do
    app_introduction "Lorem ipsum"
    association :user_one, factory: :user
    association :user_two, factory: :user
    #last_update_from user_one
  end
end