FactoryGirl.define do
  factory :physical_state do
    date Time.new
    age 15
    weight 75
    height 180
    volume 1000
    circumference 80
    bodyindex 12.5
    lifeindex 17.5
  end
end
