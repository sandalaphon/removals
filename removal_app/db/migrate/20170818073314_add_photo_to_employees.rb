class AddPhotoToEmployees < ActiveRecord::Migration[5.0]
  def change
    add_column :employees, :photoUrl, :string
  end
end
