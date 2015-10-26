class PhysicalPreparednessState < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

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
end

# == Schema Information
#
# Table name: physical_preparedness_states
#
#  id           :integer          not null, primary key
#  date         :datetime
#  age          :integer
#  pushUps      :integer
#  raising      :integer
#  jumpLength   :integer
#  jumpHeight   :integer
#  estafeta     :integer
#  cooperTest   :integer
#  inclineBody  :integer
#  flamingoTest :integer
#  inclines     :integer
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_physical_preparedness_states_on_user_id  (user_id)
#
