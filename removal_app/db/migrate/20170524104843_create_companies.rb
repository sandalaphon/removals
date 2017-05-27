class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.string :head_office_postcode
      t.string :head_office_address
      t.string :admin_user1
      t.string :admin_user2
      t.string :admin_user1_email
      t.string :admin_user2_email
      t.integer :admin_user1_telephone
      t.integer :admin_user2_telephone
      t.string :billing_contact_name
      t.integer :billing_contact_telephone
      t.string :billing_contact_email

      t.timestamps null: false
    end
  end
end
