class Activity < ActiveRecord::Base
  has_one :motor_activities_activity
  has_one :motor_activity, through: :motor_activities_activity

  extend TabValidationHelper

  validates :startDate, numericality: settings_for_numericality(0, 24)
  validates :description, presence: true
  validates :activityPeriod, numericality: settings_for_numericality(1, 1140)
  validates :activityLevel, inclusion: { in: %w(basic sitting small middle high) }
end