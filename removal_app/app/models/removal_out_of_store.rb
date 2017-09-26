class RemovalOutOfStore

def intialize(trip)

end

def searchTripsForRemovalsOutOfStore()
  Trip.where(kind: 'ROS').find_each do trip

end
end

end