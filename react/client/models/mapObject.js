

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

  placeMarker(coords){
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(this.map.getCenter())
    bounds.extend(coords)
    // this.map.setCenter(coords)
    console.log('coords', coords)
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      animation: google.maps.Animation.DROP
    })
    this.map.fitBounds(bounds)   
     // marker.setMap(this.map)
  }

  clearAllMarkers(marker){
    marker.setMap(null)
  }

  displayMarkers(marker_array){

    console.log('in displayMarkers')
    marker_array.forEach((marker)=>{
      this.placeMarker(marker)
    })
  }

  clearMap(){
    console.log("clearMap")
    this.renderedRoutes.forEach((route)=>{
      route.setMap(null)
    })
    
  }
}

export default MapObject