class AddSessionIdtoAppointment < ActiveRecord::Migration
  add_column :appointments, :session_id, :string
end
