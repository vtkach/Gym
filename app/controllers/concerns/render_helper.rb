module RenderHelper

  def render_response state
    template =
      unless state.errors.any?
        :show
      else
        error_template(state.errors.full_messages.first)
      end

    render template
  end

  def error_template error, status = 400
    @error = error
    { template: 'base/error', status: status }
  end

end