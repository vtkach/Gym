class PhysicalPreparednessStatesController < ApplicationController

  def index
    @physcial_preparedness_states = []
  end

  def create
    @physcial_preparedness_state = {}

    render :show
  end

  def update
    @physcial_preparedness_state = {}

    render :show
  end

end
