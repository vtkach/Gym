class CreatePhysicalPreparednessStates < ActiveRecord::Migration
  def change
    create_table :physical_preparedness_states do |t|
      t.timestamp :date
      t.integer :age
      t.integer :pushUps
      t.integer :raising
      t.integer :jumpLength
      t.integer :jumpHeight
      t.integer :estafeta
      t.integer :cooperTest
      t.integer :inclineBody
      t.integer :flamingoTest
      t.integer :inclines
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
