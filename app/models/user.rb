class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :profile
  has_many :notes
  has_many :physical_states
  has_many :shoulder_indexes
  has_many :physical_health_states
  has_many :physical_preparedness_states
  has_many :motor_activities
  has_many :definitions
end
