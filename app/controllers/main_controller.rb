class MainController < ApplicationController
  # before_filter :authenticate_user!
  # skip_before_filter :check_permission, only: [:index]
  skip_before_filter :check_current_user

  def index
    # render status: 422
  end

  def show
    redirect_to '#views/UserActions/home'
  end


end
