class CreateTelephoneNumbers < ActiveRecord::Migration
  def change
    create_table :telephone_numbers do |t|
      t.integer :user_id
      t.string :country_code
      t.string :phone_number
      t.string :primary
      t.string :telephone_nickname
      t.timestamps
    end
  end
end
