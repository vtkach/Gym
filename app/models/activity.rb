class Activity < ActiveRecord::Base
  has_one :motor_activities_activity
  has_one :motor_activity, through: :motor_activities_activity
end
