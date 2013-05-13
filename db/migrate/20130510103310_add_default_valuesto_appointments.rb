class AddDefaultValuestoAppointments < ActiveRecord::Migration
  change_column :appointments, :prop_one_app_date_time, :datetime, :default => DateTime.new(2000,1,1)
  change_column :appointments, :prop_two_app_date_time, :datetime, :default => DateTime.new(2000,1,1)
  change_column :appointments, :prop_three_app_date_time, :datetime, :default => DateTime.new(2000,1,1)
end
