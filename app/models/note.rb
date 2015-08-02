class Note < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  validates :note, presence: true
  validates :date, presence: true
end
