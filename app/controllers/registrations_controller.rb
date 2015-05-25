class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)
    response_value = {}

    resource.save
    yield resource if block_given?

    if resource.persisted?
      sign_up(resource_name, resource)
      response_value[:json] = resource.to_json
    else
      response_value[:text] = generate_error(resource)
      response_value[:status] = 422
    end

    render response_value
  end

  private

  def generate_error resource
    # return { errors: resource.errors.to_json }
    errors = resource.errors.first
    error_title = errors.shift

    t("custom.errors.#{error_title}") + ' ' + errors[0]
  end

end
