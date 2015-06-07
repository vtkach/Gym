class CreatePhysicalStates < ActiveRecord::Migration
  def change
    create_table :physical_states do |t|
      t.integer :weight
      t.integer :height
      t.integer :volume
      t.integer :circumference
      t.float :bodyindex
      t.float :lifeindex
      t.timestamp :date
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :physical_states, :users
  end
end
