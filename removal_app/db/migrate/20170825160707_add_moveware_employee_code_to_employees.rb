class AddMovewareEmployeeCodeToEmployees < ActiveRecord::Migration[5.0]
  def change
    add_column :employees, :moveware_employee_code, :string
  end
end
