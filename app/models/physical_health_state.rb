class PhysicalHealthState < ActiveRecord::Base

  extend TabValidationHelper

  age_date_validation

  validates :height, numericality: settings_for_numericality(20, 250)
  validates :weight, numericality: settings_for_numericality(20, 150)
  validates :pressure, numericality: settings_for_numericality(40, 240)
  validates :volume, numericality: settings_for_numericality(1000, 7000)
  validates :wrist, numericality: settings_for_numericality(0, 100)
  validates :pulse, numericality: settings_for_numericality(40, 250)
  validates :pulseRecovering, numericality: { greater_than: 0 }

  belongs_to :user, dependent: :destroy
end
