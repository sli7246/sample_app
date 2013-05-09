class AddTimezoneColumnToUsers < ActiveRecord::Migration
  add_column :users, :time_zone, :string
end
