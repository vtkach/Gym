module RenderHelper

  def render_response state
    unless state.errors.any?
      template = :show
    else
      @errors = state.errors.full_messages
      template = { template: 'base/error', status: 400 }
    end

    render template
  end

end