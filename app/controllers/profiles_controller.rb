class ProfilesController < ApplicationController

  def show
    @profile = current_user.profile
  end

  def update
    @profile = current_user.profile

    response_params =
      if @profile.update(profile_params)
        :show
      else
        error_template t('custom.errors.profile'), 400
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
