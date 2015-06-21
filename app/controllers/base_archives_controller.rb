class BaseArchivesController < ApplicationController

  protected

  def get_last_items model
    model.where(user_id: get_user_id)
         .order(:created_at)
         .reverse_order
         .limit(5)
  end

  def find_id model
    model.find_by(user_id: get_user_id, id: params[:id])
  end

end
