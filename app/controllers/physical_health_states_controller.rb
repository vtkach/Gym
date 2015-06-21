class PhysicalHealthStatesController < BaseArchivesController

  def index
    @physical_health_states = get_last_items(PhysicalHealthState)
  end

  def create
    @physical_health_state = current_user.physical_health_states.create(physical_health_params)

    render_response(@physical_health_state)
  end

  def update
    @physical_health_state = find_id(PhysicalHealthState)
    @physical_health_state.update(physical_health_params)
    render_response(@physical_health_state)
  end

  private

  def physical_health_params
    params.require(:physicalHealth)
      .permit(
        :date,
        :age,
        :weight,
        :height,
        :volume,
        :pressure,
        :wrist,
        :pulse,
        :pulseRecovering,
        :result
      )
  end

end
