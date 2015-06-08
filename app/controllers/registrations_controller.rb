class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  skip_before_filter :check_current_user

  include UserData

  def create
    build_resource(sign_up_params)
    response_params = {}

    resource.profile = Profile.new(gender: 'male')
    resource.save

    yield resource if block_given?

    if resource.persisted?
      sign_up(resource_name, resource)
      response_params[:json] = generate_response(resource, resource.profile)
    else
      response_params[:text] = generate_error(resource)
      response_params[:status] = 422
    end

    render response_params
  end

  private

  def generate_error resource
    errors = resource.errors.first
    error_title = errors.shift

    t("custom.errors.#{error_title}") + ' ' + errors[0]
  end

end
