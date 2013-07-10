class AddProfileBlurbtoUsers < ActiveRecord::Migration
  def up
    add_column :users, :profile, :string
  end

  def down
    remove_column :users, :profile, :string
  end
end
