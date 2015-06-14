class PhysicalStatesController < BaseArchivesController

  def index
    @physical_states = get_last_items(PhysicalState)
  end

  def create
    @physical_state = current_user.physical_states.create(physical_states_params)

    render_response(@physical_state)
  end

  def update
    @physical_state = PhysicalState.find_by(user_id: get_user_id, id: params[:id])

    render_response(@physical_state.update(physical_states_params))
  end

  private

  def physical_states_params
    params.require(:physicalState)
      .permit(
        :date,
        :age,
        :weight,
        :height,
        :volume,
        :circumference,
        :bodyindex,
        :lifeindex
      )
  end

end
