class AddAgeToShoulderIndices < ActiveRecord::Migration
  def change
    add_column :shoulder_indices, :age, :integer
  end
end
