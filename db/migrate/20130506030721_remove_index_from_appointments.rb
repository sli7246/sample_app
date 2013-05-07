class RemoveIndexFromAppointments < ActiveRecord::Migration
  remove_index :appointments, [:user_one_id, :created_at]
  remove_index :appointments, [:user_two_id, :created_at]
  
  add_index    :appointments, [:user_one_id, :app_date], :unique => true
  add_index    :appointments, [:user_two_id, :app_date], :unique => true
end
