class AddEmployeeMovewareCodeToSurveys < ActiveRecord::Migration[5.0]
  def change
    add_column :surveys, :moveware_employee_code, :string
  end
end
