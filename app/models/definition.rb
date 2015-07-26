class Definition < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_date_validation

  only_integer_validation :proteins
  only_integer_validation :fats
  only_integer_validation :calories
  only_integer_validation :carbohydrates
end
