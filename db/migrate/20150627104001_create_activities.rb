class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.float :startDate
      t.integer :activityPeriod
      t.string :activityLevel
      t.string :description

      t.timestamps null: false
    end
  end
end
