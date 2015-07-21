class DefinitionsController < BaseArchivesController

  def index
    @definitions = get_last_items(Definition)
  end

  def create
    @definition = current_user.definitions.create(definition_params)

    render_response(@definition)
  end

  def update
    @definition = find_id(Definition)
    @definition.update(definition_params)

    render_response(@definition)
  end

  private

  def definition_params
    params.require(:definition)
      .permit(
        :date,
        :age,
        :proteins,
        :fats,
        :carbohydrates,
        :calories
      )
  end

end
