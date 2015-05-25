class SessionsController < Devise::SessionsController

  skip_before_filter  :verify_authenticity_token, only: [:destroy]
  skip_before_filter  :verify_signed_out_user, only: [:destroy]

  respond_to :json

  def create
    @user = User.find_by_email(user_params[:email])

    if @user && @user.valid_password?(user_params[:password])
      sign_in(@user)
    else
      render plain: t('custom.errors.authentification'), status: 401
    end
  end

  def destroy
    if current_user
      sign_out(current_user)
    end

    render json: nil
  end

  def get_current_user
    response_value = {}

    if current_user
      response_value[:json] = current_user.to_json
    else
      response_value[:json] = { errors: [t('custom.errors.currentUser')] }
      response_value[:status] = 401
    end

    render response_value
  end

  def check_session
    response_value =
      if current_user
        { plain: 'Session is valid', status: 200 }
      else
        { text: t('custom.errors.sessionExpired'), status: 401 }
      end

    render response_value
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def require_no_authentication
    get_current_user if current_user
  end

end
