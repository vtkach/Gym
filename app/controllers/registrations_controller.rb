class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  skip_before_filter :check_current_user

  include UserData

  def create
    build_resource(sign_up_params)

    resource.profile = Profile.new(gender: 'male', age: 15)
    resource.save

    yield resource if block_given?

    if resource.persisted?
      sign_up(resource_name, resource)

      @user = resource
      response_params = 'users/user_profile'
    else
      response_params = generate_error(resource)
    end

    render response_params
  end

  private

  def generate_error resource
    errors = resource.errors.first
    error_title = errors.shift
    error_message = t("custom.errors.#{error_title}") + ' ' + errors[0]

    error_template(error_message, 422)
  end

  def require_no_authentication
     redirect_to '/users/current_user' if current_user
  end

end
