class RemovalOutOfStore

def intialize(trip)

end

def searchTripsForRemovalsOutOfStore()
  # removal from store, in date range and branches interesting and distancesInteresting
  Trip.where(kind: 'ROS' ).find_each do trip

end
end

end

# distancesInteresting if: distance from storage branch > distance from alternative branch delivery + distance from alternative branch to storage delivery
# branches are interesting if distance from alternative branch to storage delivery < distance from storage branch to delivery