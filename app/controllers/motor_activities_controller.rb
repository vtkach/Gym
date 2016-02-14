class MotorActivitiesController < BaseArchivesController

  def index
    @motor_activities = get_last_items(MotorActivity)
  end

  def create
    @motor_activity = current_user.motor_activities.create(motor_activity_params)

    render_response(@motor_activity)
  end

  def update
    @motor_activity = find_id(MotorActivity)
    @motor_activity.update(motor_activity_params)

    render_response(@motor_activity)
  end

  private

  def motor_activity_params
    params.require(:motorActivity)
      .permit(
        :date,
        :age,
        :smlresult,
        :blresult,
        :slresult,
        :mlresult,
        :hlresult
      )
  end

end
