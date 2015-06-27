json.(@motor_activity,
    :id,
    :age,
    :date,
    :created_at,
    :updated_at
)

json.activities @motor_activity.activities,
                :id,
                :startDate,
                :activityPeriod,
                :activityLevel,
                :description,
                :created_at,
                :updated_at
