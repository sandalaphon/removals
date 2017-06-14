export function drawRoute(startCoords, endCoords, map){
  console.log('in map okay')
  var directionsService = new google.maps.DirectionsService()
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map
  })

  var directionInput = {
        origin: startCoords,
        destination: endCoords,
        waypoints: [],
        travelMode: 'DRIVING',
        avoidTolls: true
      }

directionsService.route(directionInput, function(response, status){
  if(status==='OK'){
    console.log('in map ok')
    directionsDisplay.setDirections(response)
  }
}.bind(this))







}