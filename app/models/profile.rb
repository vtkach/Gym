class Profile < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_validation
end
