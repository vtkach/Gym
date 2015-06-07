module RenderHelper

  def render_response state
    if state
      template = :show
    else
      template = 'base/error'
    end

    render template
  end

end