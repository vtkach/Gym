class AddFieldsToMotorActivities < ActiveRecord::Migration
  def change
    add_column :motor_activities, :smlresult, :integer
    add_column :motor_activities, :blresult, :integer
    add_column :motor_activities, :slresult, :integer
    add_column :motor_activities, :mlresult, :integer
    add_column :motor_activities, :hlresult, :integer
  end
end
