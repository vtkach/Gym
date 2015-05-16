class SessionsController < Devise::SessionsController
  respond_to :json

  def check_session
    if current_user
      render plain: 'OK', status: 200
    end
  end

end
