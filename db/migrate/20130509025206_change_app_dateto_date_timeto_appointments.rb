class ChangeAppDatetoDateTimetoAppointments < ActiveRecord::Migration
  change_column :appointments, :app_date, :datetime
  
  rename_column :appointments, :app_date, :app_date_time
end
