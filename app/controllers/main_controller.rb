class MainController < ApplicationController
  # before_filter :authenticate_user!
  # skip_before_filter :check_permission, only: [:index]
  skip_before_filter :check_current_user

  def index
  end

end
