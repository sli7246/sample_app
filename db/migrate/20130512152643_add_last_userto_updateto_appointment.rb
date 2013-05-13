class AddLastUsertoUpdatetoAppointment < ActiveRecord::Migration
  add_column :appointments, :last_update_from, :integer
end
