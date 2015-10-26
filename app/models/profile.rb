class Profile < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  extend TabValidationHelper

  age_validation
end

# == Schema Information
#
# Table name: profiles
#
#  id         :integer          not null, primary key
#  lastName   :string
#  firstName  :string
#  surname    :string
#  gender     :string
#  school     :string
#  group      :string
#  household  :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  age        :integer
#
# Indexes
#
#  index_profiles_on_user_id  (user_id)
#
