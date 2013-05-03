class AddIndicesToUsers < ActiveRecord::Migration
  add_index :users, :facebookuid
  add_index :users, :linkedinuid
end
