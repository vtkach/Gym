class StatisticController < ApplicationController

  def index
    @users_profiles = Profile.all
  end

end
