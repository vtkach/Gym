class ShoulderIndex < ActiveRecord::Base

  extend TabValidationHelper

  age_date_validation

  validates :shoulder, numericality: settings_for_numericality(10, 100)
  validates :shoulderWidth, numericality: settings_for_numericality(10, 200)

  belongs_to :user, dependent: :destroy
end
