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
