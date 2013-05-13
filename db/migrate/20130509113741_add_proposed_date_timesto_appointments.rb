class AddProposedDateTimestoAppointments < ActiveRecord::Migration
  add_column :appointments, :prop_one_app_date_time, :datetime
  add_column :appointments, :prop_two_app_date_time, :datetime
  add_column :appointments, :prop_three_app_date_time, :datetime
  add_column :appointments, :app_accepted, :boolean 
  add_column :appointments, :app_introduction, :string
end
