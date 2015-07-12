class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.integer :proteins
      t.integer :fats
      t.integer :carbohydrates
      t.integer :calories

      t.timestamps null: false
    end
  end
end
