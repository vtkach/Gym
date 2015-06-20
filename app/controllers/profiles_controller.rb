class ProfilesController < ApplicationController

  # skip_before_filter :verify_authenticity_token, only: [:update]
  before_filter :check_current_user

  def show
    @profile = current_user.profile
  end

  def update
    @profile = Profile.find_by(user_id: current_user.id)

    response_params =
      if @profile.update(profile_params)
        :show
      else
        error_template t('custom.errors.profile'), 501
      end

    render response_params
  end

  private

  def profile_params
    params.require(:profile)
      .permit(
        :age,
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
