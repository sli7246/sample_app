class AddZiptoAddresses < ActiveRecord::Migration
  def up
    add_column :addresses, :zip, :integer
    add_column :addresses, :primary, :boolean
  end

  def down
    remove_column :addresses, :zip
    remove_column :addresses, :primary
  end
end
