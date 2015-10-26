class PhysicalHealthState < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_date_validation

  validates :height, numericality: settings_for_numericality(20, 250)
  validates :weight, numericality: settings_for_numericality(20, 150)
  validates :pressure, numericality: settings_for_numericality(40, 240)
  validates :volume, numericality: settings_for_numericality(1000, 7000)
  validates :wrist, numericality: settings_for_numericality(0, 100)
  validates :pulse, numericality: settings_for_numericality(40, 250)
  validates :pulseRecovering, numericality: { greater_than: 0 }
end

# == Schema Information
#
# Table name: physical_health_states
#
#  id              :integer          not null, primary key
#  height          :integer
#  weight          :integer
#  pressure        :integer
#  volume          :integer
#  wrist           :integer
#  pulse           :integer
#  pulseRecovering :integer
#  date            :datetime
#  age             :integer
#  result          :integer
#  user_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_physical_health_states_on_user_id  (user_id)
#
