class AddIdColumnsToUsers < ActiveRecord::Migration
  def change
    remove_column :users, :provider
    remove_column :users, :uid
    
    add_column :users, :facebookuid, :string
    add_column :users, :linkedin, :string
    add_column :users, :nativelogin, :boolean 
  end
end
