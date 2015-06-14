class NotesController < BaseArchivesController

  def index
    @notes = get_last_items(Note)
  end

  def create
    @note = current_user.notes.create(notes_params)

    render_response(@note)
  end

  private

  def notes_params
    params.require(:note).permit(:date, :note)
  end

end
