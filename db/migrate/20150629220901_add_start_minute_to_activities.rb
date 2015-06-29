class AddStartMinuteToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :startMinute, :integer
  end
end
