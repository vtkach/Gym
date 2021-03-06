class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include UserData
  include RenderHelper

  protect_from_forgery with: :exception
  protect_from_forgery with: :null_session


  before_filter :check_current_user
  skip_before_filter :verify_authenticity_token, only: [:create, :update, :destroy]
  # before_filter :check_permission, unless: :devise_controller?

  protected

  def check_current_user
    unless valid_user?
      render error_template t('custom.errors.sessionExpired'), 401
    end
  end

end
