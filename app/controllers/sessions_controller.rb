class SessionsController < Devise::SessionsController

  include UserData

  skip_before_filter  :verify_signed_out_user, only: [:destroy]
  skip_before_filter :check_current_user

  respond_to :json

  def create
    @user = User.find_by_email(user_params[:email])

    response_params =
      if @user && @user.valid_password?(user_params[:password])
        sign_in(@user)
        'users/user_profile'
      else
        error_template t('custom.errors.authentification'), 401
      end

    response.headers['X-CSRF-Token'] = form_authenticity_token
    render response_params
  end

  def destroy
    if current_user
      sign_out(current_user)
    end

    render json: nil
  end

  def get_current_user
    response_params =
      if current_user
        @user = current_user
        'users/user_profile'
      else
        error_template t('custom.errors.currentUser'), 401
      end

    render response_params
  end

  def check_session
    response_params =
      if current_user
        { plain: 'Session is valid', status: 200 }
      else
        error_template t('custom.errors.sessionExpired'), 401
      end

    render response_params
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def require_no_authentication
    get_current_user if current_user
  end

end