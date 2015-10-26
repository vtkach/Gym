class Note < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  validates :note, presence: true
  validates :date, presence: true
end

# == Schema Information
#
# Table name: notes
#
#  id         :integer          not null, primary key
#  note       :text
#  date       :datetime
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_notes_on_user_id  (user_id)
#
