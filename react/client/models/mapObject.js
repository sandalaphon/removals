let mapObjectInstances = {}

class MapObject{
  constructor(map, pathname){
    
    this.map = map
    this.directionsService = new google.maps.DirectionsService()
    this.renderedRoutes = [],
    this.markers = [],
    this.bounds= new google.maps.LatLngBounds()
  
    if(!mapObjectInstances.pathname){
      mapObjectInstances[pathname]=this
    }


  }

  pinSymbol(color) {
      return {
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 2,
          scale: 1,
     };
  }

  drawRouteWithGoogleResponse(directionsServiceResponse){
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      suppressMarkers: true
    })
    directionsDisplay.setDirections(directionsServiceResponse.google_directions)

    var start = directionsServiceResponse.google_directions.routes[ 0 ].legs[ 0 ].start_location
    var ending = directionsServiceResponse.google_directions.routes[ 0 ].legs[ 0 ].end_location
    this.placeMarker(start,directionsServiceResponse.colour)
    this.placeMarker(ending,directionsServiceResponse.colour)


    this.renderedRoutes.push(directionsDisplay)
  }

  placeMarker(coords,colour){
    /////////////ENTER BRANCH COORDS INSTEAD OF GETCENTER///
    // this.bounds.extend(this.map.getCenter())
    ////////////////////////////////////////////////////////
    this.bounds.extend(coords) 
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: this.pinSymbol(colour),
      animation: google.maps.Animation.DROP
    })
    this.markers.push(marker)
    this.map.fitBounds(this.bounds)   

  }

  clearMarkers(){
    while(this.markers.length){
      this.markers.forEach((marker)=>{
        marker = this.markers.pop()
        console.log('this.markers', this.markers)
        marker.setMap(null)
      })
    }
    this.bounds = new google.maps.LatLngBounds()
  }

  displayMarkers(marker_array){
    marker_array.forEach((coords)=>{
      this.placeMarker(coords,"red")
    })
  }

  clearMap(){
    this.clearMarkers()
    this.renderedRoutes.forEach((route)=>{
      route.setMap(null)
    })
    
  }
}

export {MapObject, mapObjectInstances}