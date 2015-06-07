class CreateShoulderIndices < ActiveRecord::Migration
  def change
    create_table :shoulder_indices do |t|
      t.integer :shoulder
      t.integer :shoulderWidth
      t.float :brachialIndex
      t.timestamp :date
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :shoulder_indices, :users
  end
end
