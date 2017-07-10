let mapObjectInstances = {'planner': null, 'partload': null}

class MapObject{
  constructor(map, pathname){
    
    this.map = map
    this.directionsService = new google.maps.DirectionsService()
    this.renderedRoutes = [],
    this.markers = [],
    this.bounds= new google.maps.LatLngBounds()
  
    if(!mapObjectInstances.pathname){
      console.log('made new mapObject', this)
      mapObjectInstances[pathname]=this
    }
    // return mapObjectInstances
    console.log('mapObjectInstances',mapObjectInstances)

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
    console.log("service response",directionsServiceResponse)
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
      this.placeMarker(coords,"red")
    })
  }

  clearMap(){
    console.log("clearMap")
    this.renderedRoutes.forEach((route)=>{
      route.setMap(null)
    })
    
  }
}

export {MapObject, mapObjectInstances}