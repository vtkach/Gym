class MotorActivitiesController < BaseArchivesController

  def index
    @motorActivities = get_last_items(MotorActivity)
  end

  def create
    check_activities do
      @motor_activity = current_user.motor_activities.create(motor_activity_params)
    end
  end

  def update
    check_activities do
      @motor_activity = MotorActivity.find_by(user_id: get_user_id, id: params[:id])
      @motor_activity.update(motor_activity_params)
    end
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
      :startHour,
      :srartMinute,
      :activityPeriod,
      :activityLevel,
      :description
    ])
  end

  def check_activities
    if activities_params[:activities]
      yield
      render_response(@motor_activity)
    else
      @error = t('custom.errors.motorActivity')
      render 'base/error', status: 400
    end
  end

end
