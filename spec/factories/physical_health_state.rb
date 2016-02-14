FactoryGirl.define do
  factory :physical_health_state do
     height 180
     weight 75
     pressure 120
     volume 3000
     wrist 50
     pulse 80
     pulseRecovering 60
     date Time.now
     age 15
     result 100
  end
end
