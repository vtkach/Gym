class ProfilesController < ApplicationController

  skip_before_filter :verify_authenticity_token, only: [:update]
  before_filter :check_current_user

  def show
    @profile = current_user.profile
  end

  def update
    response_params = {}
    @profile = Profile.find_by(user_id: current_user.id)

    if !@profile.update(profile_params)
      response_params = :show
    else
      response_params[:text] = t('custom.errors.profile')
      response_params[:status] = 501
    end

    render response_params
  end

  private

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
