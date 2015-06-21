class Profile < ActiveRecord::Base

  include TabValidationHelper

  age_validation

  belongs_to :user, dependent: :destroy
end
