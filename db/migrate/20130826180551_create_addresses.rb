class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :address do |t|
      t.integer :user_id
      t.string :line1
      t.string :line2
      t.string :city
      t.string :country_code
      t.string :address_nickname
      t.timestamps
    end
  end
end
