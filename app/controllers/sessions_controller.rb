class SessionsController < Devise::SessionsController

  skip_before_filter  :verify_authenticity_token, only: [:destroy]
  skip_before_filter  :verify_signed_out_user, only: [:destroy]

  respond_to :json

  def create
    @user = User.find_by_email(user_params[:email])

    if @user && @user.valid_password?(user_params[:password])
      sign_in(@user)
    else
      render json: generate_error(@user), status: 401
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
      response_value[:json] = { errors: ['User doesn\'t authenticate'] }
      response_value[:status] = 401
    end

    render response_value
  end

  def check_session
    response_value =
      if current_user
        { plain: 'Session is valid', status: 200 }
      else
        { plain: 'Authentication error', status: 401 }
      end

    render response_value
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def generate_error user
    unless user
      { errors: ['Invalid email'] }
    end
  end

  def require_no_authentication
    get_current_user if current_user
  end

end
