class ShoulderIndicesController < ApplicationController

  def index
    @shoulder_indices = ShoulderIndex.where(user_id: current_user.id).limit(5)
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
