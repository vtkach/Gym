class Definition < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_date_validation

  only_integer_validation :proteins
  only_integer_validation :fats
  only_integer_validation :calories
  only_integer_validation :carbohydrates
end

# == Schema Information
#
# Table name: definitions
#
#  id            :integer          not null, primary key
#  age           :integer
#  date          :datetime
#  proteins      :integer
#  fats          :integer
#  calories      :integer
#  carbohydrates :integer
#  user_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_definitions_on_user_id  (user_id)
#
