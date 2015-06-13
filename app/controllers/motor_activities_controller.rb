class MotorActivitiesController < ApplicationController

  def index
    @motorActivities = []
  end

  def create
    @motorActivity = {}

    render :show
  end

  def update
    @motorActivity = {}

    render :show
  end

end
