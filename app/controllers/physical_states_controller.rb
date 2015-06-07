class PhysicalStatesController < ApplicationController

  def index
    @physical_states = PhysicalState.where(user_id: current_user.id).limit(5)
  end

  def create
    @physical_state = current_user.physical_states.create(physical_states_params)

    render_response(@physical_state)
  end

  def update
    @physical_state = PhysicalState.find_by(user_id: current_user.id, id: params[:id])

    render_response(@physical_state.update(physical_states_params))
  end

  private

  def physical_states_params
    params.require(:physicalState)
      .permit(
        :weight,
        :height,
        :volume,
        :circumference,
        :bodyindex,
        :lifeindex
      )
  end

  def render_response state
    if state
      template = :show
    else
      template = 'base/error'
    end

    render template
  end

end
