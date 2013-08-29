class ChangeAddressTableName < ActiveRecord::Migration
  def up
    rename_table :address, :addresses
  end

  def down
    rename_table :addresses, :address
  end
end
