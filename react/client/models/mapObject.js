class MapObject{
  constructor(map){
    this.map = map
    this.directionsService = new google.maps.DirectionsService()
    this.renderedRoutes = []
  }

  drawRouteWithGoogleResponse(directionsServiceResponse){
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map
    })
    directionsDisplay.setDirections(directionsServiceResponse)
    this.renderedRoutes.push(directionsDisplay)
  }

  clearMap(){
    console.log("clearMap")
    this.renderedRoutes.forEach((route)=>{
      route.setMap(null)
    })
    
  }
}




export default MapObject