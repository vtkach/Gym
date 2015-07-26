class CreateDefinitions < ActiveRecord::Migration
  def change
    create_table :definitions do |t|
      t.integer :age
      t.timestamp :date
      t.integer :proteins
      t.integer :fats
      t.integer :calories
      t.integer :carbohydrates
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
