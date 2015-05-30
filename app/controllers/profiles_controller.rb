class ProfilesController < ApplicationController

  before_filter :check_current_user

  def show
    render json: current_user.profile.to_json
  end

  def update
    response_params = {}

    if current_user.profile.update(profile_params)
      response_params[:json] = current_user.profile.to_json
    else
      response_params[:text] = t('custom.errors.profile')
      response_params[:status] = 501
    end

    render response_params
  end

  private

  def check_current_user
    unless valid_user?
      render status: 401, text: t('custom.errors.sessionExpired')
    end
  end

  def profile_params
    params.require(:profile)
      .permit(
        :lastName,
        :firstName,
        :surname,
        :gender,
        :school,
        :group,
        :household
      )
  end

end
