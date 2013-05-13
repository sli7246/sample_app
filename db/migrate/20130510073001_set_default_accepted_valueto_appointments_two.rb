class SetDefaultAcceptedValuetoAppointmentsTwo < ActiveRecord::Migration
  change_column :appointments, :app_accepted, :boolean, :default => false
end
