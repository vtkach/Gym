class NotesController < ApplicationController

  def index
    @notes = Note.where(user_id: current_user.id).limit(5)
  end

  def create
    @note = current_user.notes.create(notes_params)
    template = nil

    if @note
      template = :show
    else
      @error = @notes
      template = 'base/error'
    end

    render template
  end

  private

  def notes_params
    params.require(:note).permit(:date, :note, :user_id)
  end

end
