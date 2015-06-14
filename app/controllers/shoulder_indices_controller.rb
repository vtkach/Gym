class ShoulderIndicesController < BaseArchivesController

  def index
    @shoulder_indices = get_last_items(ShoulderIndex)
  end

  def create
    @shoulder_index = current_user.shoulder_indexes.create(shoulder_index_params)

    render_response(@shoulder_index)
  end

  def update
    @shoulder_index = ShoulderIndex.find_by(user_id: get_user_id, id: params[:id])

    render_response(@shoulder_index.update(shoulder_index_params))
  end

  private

  def shoulder_index_params
    params.require(:shoulderIndex)
      .permit(
        :date,
        :shoulder,
        :shoulderWidth,
        :brachialIndex
      )
  end

end
