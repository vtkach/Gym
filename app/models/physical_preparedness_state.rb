class PhysicalPreparednessState < ActiveRecord::Base

  extend TabValidationHelper

  age_date_validation

  validates :pushUps, numericality: settings_for_numericality(0, 500)
  validates :raising, numericality: settings_for_numericality(0, 500)
  validates :jumpLength, numericality: settings_for_numericality(0, 500)
  validates :jumpHeight, numericality: settings_for_numericality(0, 500)
  validates :estafeta, numericality: settings_for_numericality(10, 12)
  validates :cooperTest, numericality: settings_for_numericality(2000, 4000)
  validates :inclineBody, numericality: settings_for_numericality(0, 100)
  validates :flamingoTest, numericality: settings_for_numericality(3, 19)
  validates :inclines, numericality: settings_for_numericality(0, 100)

  belongs_to :user, dependent: :destroy
end
