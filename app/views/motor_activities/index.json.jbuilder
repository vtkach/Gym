json.array! @motorActivities do |motorActivity|
  json.(
    motorActivity,
    :id,
    :age,
    :date,
    :created_at,
    :updated_at
  )

  json.activities motorActivity.activities,
                  :id,
                  :startHour,
                  :startMinute,
                  :activityPeriod,
                  :activityLevel,
                  :description,
                  :created_at,
                  :updated_at
end