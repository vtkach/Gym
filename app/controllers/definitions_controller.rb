class DefinitionsController < ApplicationController

  def index
    @definitions = []
  end

  def create
    @definition = {}

    render 'show'
  end

  def update
    @definition = {}

    render 'show'
  end

end
