class ShoulderIndex < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_date_validation

  validates :shoulder, numericality: settings_for_numericality(10, 100)
  validates :shoulderWidth, numericality: settings_for_numericality(10, 200)
end
