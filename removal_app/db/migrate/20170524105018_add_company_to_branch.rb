class AddCompanyToBranch < ActiveRecord::Migration
  def change
    add_reference :branches, :company, index: true, foreign_key: true
  end
end
