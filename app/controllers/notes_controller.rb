class NotesController < ApplicationController

  def index
    @notes = Note.where(user_id: current_user.id).limit(5)
  end

  def create

  end

end
