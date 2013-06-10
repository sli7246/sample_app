class DropColumnSessionIdFromAppointments < ActiveRecord::Migration
  remove_column :appointments, :session_id
  add_column :appointments, :opentok_session, :string
end
