class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :lastName
      t.string :firstName
      t.string :surname
      t.string :gender
      t.string :school
      t.string :group
      t.string :household
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :profiles, :users
  end
end
