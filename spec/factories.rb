FactoryGirl.define do
  factory :user do
    name     "John Li"
    email    "jli@example.com"
    password "foobar"
    password_confirmation "foobar"
  end
end