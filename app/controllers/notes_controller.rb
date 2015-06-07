class NotesController < ApplicationController

  def index
    @notes = Note.where(user_id: current_user.id).limit(5)
  end

  def create
    @note = current_user.notes.create(notes_params)

    render_response(@note)
  end

  private

  def notes_params
    params.require(:note).permit(:date, :note, :user_id)
  end

end
