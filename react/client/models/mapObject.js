

class MapObject{
  constructor(map){
    this.map = map
    this.directionsService = new google.maps.DirectionsService()
    this.renderedRoutes = [],
    this.markers = [],
    this.bounds= new google.maps.LatLngBounds()
    

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
    /////////////ENTER BRANCH COORDS INSTEAD OF GETCENTER///
    // this.bounds.extend(this.map.getCenter())
    ////////////////////////////////////////////////////////
    this.bounds.extend(coords) 
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      animation: google.maps.Animation.DROP
    })
    console.log('created marker', marker)
    this.markers.push(marker)
    console.log(this.markers)
    this.map.fitBounds(this.bounds)   
     // marker.setMap(this.map)
  }

  clearMarkers(){
    console.log('this.markers', this.markers)
    if(this.markers.length){
      for(var i = 0; i<=this.markers.length;i++){
        var marker = this.markers.pop()
        console.log('current marker in loop', marker)
        marker.setMap(null)
      }
    }
    this.bounds = new google.maps.LatLngBounds()
    
    
  }

  displayMarkers(marker_array){
    marker_array.forEach((coords)=>{
      this.placeMarker(coords)
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