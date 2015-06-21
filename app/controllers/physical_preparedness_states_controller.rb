class PhysicalPreparednessStatesController < BaseArchivesController

  def index
    @physical_preparedness_states = get_last_items(PhysicalPreparednessState)
  end

  def create
    @physical_preparedness_state = current_user.physical_preparedness_states.create(physical_preparedness_params)

    render_response(@physical_preparedness_state)
  end

  def update
    @physical_preparedness_state = find_id(PhysicalPreparednessState)
    @physical_preparedness_state.update(physical_preparedness_params)
    render_response(@physical_preparedness_state)
  end

  private

  def physical_preparedness_params
    params.require(:physicalPreparedness)
      .permit(
        :date,
        :age,
        :pushUps,
        :raising,
        :jumpLength,
        :jumpHeight,
        :estafeta,
        :cooperTest,
        :inclineBody,
        :flamingoTest,
        :inclines
      )
  end

end
