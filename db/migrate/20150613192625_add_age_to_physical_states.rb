class AddAgeToPhysicalStates < ActiveRecord::Migration
  def change
    add_column :physical_states, :age, :integer
  end
end
