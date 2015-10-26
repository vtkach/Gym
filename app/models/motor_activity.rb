class MotorActivity < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_date_validation

  only_integer_validation :smlresult
  only_integer_validation :blresult
  only_integer_validation :slresult
  only_integer_validation :mlresult
  only_integer_validation :hlresult
end

# == Schema Information
#
# Table name: motor_activities
#
#  id         :integer          not null, primary key
#  age        :integer
#  date       :datetime
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  smlresult  :integer
#  blresult   :integer
#  slresult   :integer
#  mlresult   :integer
#  hlresult   :integer
#
# Indexes
#
#  index_motor_activities_on_user_id  (user_id)
#
