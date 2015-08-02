class DropMotorActivitiesActivityTable < ActiveRecord::Migration
  def change
    drop_table :motor_activities_activities
  end
end
