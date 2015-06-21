class PhysicalStatesController < BaseArchivesController

  def index
    @physical_states = get_last_items(PhysicalState)
  end

  def create
    @physical_state = current_user.physical_states.create(physical_states_params)

    render_response(@physical_state)
  end

  def update
    @physical_state = find_id(PhysicalState)
    @physical_state.update(physical_states_params)
    render_response(@physical_state)
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
