class MotorActivity < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  has_many :motor_activities_activities
  has_many :activities, through: :motor_activities_activities

  accepts_nested_attributes_for :activities
end
