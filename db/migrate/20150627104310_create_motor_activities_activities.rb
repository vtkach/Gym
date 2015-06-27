class CreateMotorActivitiesActivities < ActiveRecord::Migration
  def change
    create_table :motor_activities_activities do |t|
      t.references :motor_activity, index: true, foreign_key: true
      t.references :activity, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
