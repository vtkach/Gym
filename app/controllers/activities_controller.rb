class ActivitiesController < ApplicationController

  def destroy
    @activity = Activity.find(params[:id])

    if @activity.motor_activity.user.id == get_user_id
      @activity.destroy
    end

    render :show
  end

end
