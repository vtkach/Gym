class Profile < ActiveRecord::Base

  extend TabValidationHelper

  age_validation

  belongs_to :user, dependent: :destroy
end
