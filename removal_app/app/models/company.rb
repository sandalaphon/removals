class Company < ActiveRecord::Base
  has_many :branches
  has_many :users
end
