class AddStatetoAddresses < ActiveRecord::Migration
  def up
    add_column :addresses, :state, :string
  end

  def down
    remove_column :addresses, :state, :string
  end
end
