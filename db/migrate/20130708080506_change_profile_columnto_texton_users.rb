class ChangeProfileColumntoTextonUsers < ActiveRecord::Migration
  def up
    change_column :users, :profile, :text, :limit => nil
  end

  def down
    change_column :users, :profile, :string, :limit => nil
  end
end
