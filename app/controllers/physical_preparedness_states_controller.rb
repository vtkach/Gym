class PhysicalPreparednessStatesController < BaseArchivesController

  def index
    @physical_preparedness_states = []
  end

  def create
    @physical_preparedness_state = {}

    render :show
  end

  def update
    @physical_preparedness_state = {}

    render :show
  end

end
