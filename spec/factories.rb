FactoryGirl.define do
  factory :user do
    sequence(:name)  { |n| "Person #{n}" }
    sequence(:email) { |n| "person_#{n}@example.com"}   
    password "foobarar"
    password_confirmation "foobarar"
    confirmed_at Time.now
    factory :admin do
      admin true
    end
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