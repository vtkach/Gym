class ActivitiesController < ApplicationController

  def destroy
    @activity = Activity.find(params[:id])
    motor_activity = @activity.motor_activity

    if motor_activity.activities.count > 1 && motor_activity.user.id == get_user_id
      @activity.destroy
      template = :show
    else
      @error = t('custom.errors.motorActivity')
      template = { template: 'base/error', status: 400 }
    end

    render template
  end

end
