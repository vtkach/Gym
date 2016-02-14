FactoryGirl.define do
  factory :physical_preparedness_state do
    date Time.new
    age 15
    pushUps 250
    raising 250
    jumpLength 250
    jumpHeight 250
    estafeta 11
    cooperTest 3000
    inclineBody 50
    flamingoTest 15
    inclines 50
  end
end
