class RenameStartDateToStartHourAtActivities < ActiveRecord::Migration
  def change
    rename_column :activities, :startDate, :startHour
  end
end
