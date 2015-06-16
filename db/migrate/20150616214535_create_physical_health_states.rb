class CreatePhysicalHealthStates < ActiveRecord::Migration
  def change
    create_table :physical_health_states do |t|
      t.integer :height
      t.integer :weight
      t.integer :pressure
      t.integer :volume
      t.integer :wrist
      t.integer :pulse
      t.integer :pulseRecovering
      t.timestamp :date
      t.integer :age
      t.integer :result
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
