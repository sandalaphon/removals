class Job < ActiveRecord::Base
  belongs_to :truck
  belongs_to :trip
end
