class SessionsController < Devise::SessionsController
  respond_to :json

  def check_session
    render if current_user
      render plain: 'OK', status: 200
    else
      render plain: 'pzdc', status: 401
    end
  end

end
