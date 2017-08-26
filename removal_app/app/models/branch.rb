class Branch < ActiveRecord::Base
  belongs_to :company
  has_many :jobs, :through => :trucks
  has_many :trips
  has_many :trucks
  has_many :employees
  has_many :surveys
  has_many :users, :through => :companies
end
