class ChangeIdColumnsToUsers < ActiveRecord::Migration
  rename_column :users, :linkedin, :linkedinuid
end
