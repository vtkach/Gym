class MotorActivitiesActivity < ActiveRecord::Base
  belongs_to :motor_activity
  belongs_to :activity
end
