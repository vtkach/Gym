class ShoulderIndex < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_date_validation

  validates :shoulder, numericality: settings_for_numericality(10, 100)
  validates :shoulderWidth, numericality: settings_for_numericality(10, 200)
end

# == Schema Information
#
# Table name: shoulder_indices
#
#  id            :integer          not null, primary key
#  shoulder      :integer
#  shoulderWidth :integer
#  brachialIndex :float
#  date          :datetime
#  user_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  age           :integer
#
# Indexes
#
#  index_shoulder_indices_on_user_id  (user_id)
#
