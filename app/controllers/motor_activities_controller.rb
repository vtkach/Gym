class MotorActivitiesController < BaseArchivesController

  def index
    @motorActivities = get_last_items(MotorActivity)
  end

  def create
    @motor_activity = current_user.motor_activities.create(motor_activity_params)

    render_response(@motor_activity)
  end

  def update
    @motor_activity = MotorActivity.find_by(user_id: get_user_id, id: params[:id])
    @motor_activity.update(motor_activity_params)

    render_response(@motor_activity)
  end

  private

  def motor_activity_params
    params.require(:motorActivity)
      .permit(
        :date,
        :age
      ).merge(
        activities_attributes: activities_params[:activities]
      )
  end

  def activities_params
    params.permit(activities: [
      :id,
      :startDate,
      :activityPeriod,
      :activityLevel,
      :description
    ])
  end

end
