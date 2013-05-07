class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.integer :user_one_id
      t.integer :user_two_id
      t.date :app_date

      t.timestamps
    end
    
    add_index :appointments, [:user_one_id, :created_at]
    add_index :appointments, [:user_two_id, :created_at]
  end
end
