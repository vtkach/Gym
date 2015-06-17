class PhysicalState < ActiveRecord::Base

  extend TabValidationHelper

  age_date_validation

  validates :height, numericality: settings_for_numericality(20, 250)
  validates :weight, numericality: settings_for_numericality(20, 150)
  validates :circumference, numericality: settings_for_numericality(20, 160)

  belongs_to :user, dependent: :destroy
end
