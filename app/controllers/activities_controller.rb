class ActivitiesController < ApplicationController

  def destroy
    @activity = Activity.find(params[:id])
    p  @activity.motor_activity.to_json
    if @activity.motor_activity.user.id == get_user_id
      @activity.destroy
    end
    # motor_activity = current_user.motor_activities.find(params[:motor_activity_id])
    #
    # @activity = motor_activity.activity.find(params[:id])
    # @activity.destroy
    #
    render :show
  end

end
