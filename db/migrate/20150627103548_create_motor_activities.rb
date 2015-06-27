class CreateMotorActivities < ActiveRecord::Migration
  def change
    create_table :motor_activities do |t|
      t.integer :age
      t.timestamp :date
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
