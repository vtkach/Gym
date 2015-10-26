class PhysicalState < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_date_validation

  validates :height, numericality: settings_for_numericality(20, 250)
  validates :weight, numericality: settings_for_numericality(20, 150)
  validates :circumference, numericality: settings_for_numericality(20, 160)
end

# == Schema Information
#
# Table name: physical_states
#
#  id            :integer          not null, primary key
#  weight        :integer
#  height        :integer
#  volume        :integer
#  circumference :integer
#  bodyindex     :float
#  lifeindex     :float
#  date          :datetime
#  user_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  age           :integer
#
# Indexes
#
#  index_physical_states_on_user_id  (user_id)
#
