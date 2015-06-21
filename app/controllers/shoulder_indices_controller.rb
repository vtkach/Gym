class ShoulderIndicesController < BaseArchivesController

  def index
    @shoulder_indices = get_last_items(ShoulderIndex)
  end

  def create
    @shoulder_index = current_user.shoulder_indexes.create(shoulder_index_params)

    render_response(@shoulder_index)
  end

  def update
    @shoulder_index = find_id(ShoulderIndex)
    @shoulder_index.update(shoulder_index_params)
    render_response(@shoulder_index)
  end

  private

  def shoulder_index_params
    params.require(:shoulderIndex)
      .permit(
        :age,
        :date,
        :shoulder,
        :shoulderWidth,
        :brachialIndex
      )
  end

end
