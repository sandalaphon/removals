import pantech from '../build/images/pantech.png'

let mapObjectInstances = {}

class MapObject{
  constructor(map, pathname){
    
    this.map = map
    this.directionsService = new google.maps.DirectionsService()
    this.renderedRoutes = [],
    this.markers = [],
    this.bounds= new google.maps.LatLngBounds(),
    this.postcodeMarkers = [],
    this.sliderMarkers = []
  
    if(!mapObjectInstances.pathname){
      mapObjectInstances[pathname]=this
    }


  }

  handleSliderMarkerArray(sliderMarkerCoordsandIndexArray){
    this.clearSliderMarkers()
    sliderMarkerCoordsandIndexArray.forEach((object)=>{
      this.placeSliderMarker(object.markerCoords, object.colour)
    })
  }


  placeSliderMarker(coords,colour){
    var icon = {
      url: pantech,
      scaledSize: new google.maps.Size(35, 35)
      }
    this.bounds.extend(coords) 
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      optimized: false,
      icon
      // icon: this.pinSymbol(colour)
      // icon: this.truckSymbol(colour),
      // origin: new google.maps.Point(1000,1000),
      // anchor: new google.maps.Point(1,1)
      // animation: google.maps.Animation.DROP
    })
    this.sliderMarkers.push(marker)
    // this.map.fitBounds(this.bounds)   

  }

  clearSliderMarkers(){
    while(this.sliderMarkers.length){
      this.sliderMarkers.forEach((marker)=>{
        marker = this.sliderMarkers.pop()
        // console.log('this.markers', this.markers)
        marker.setMap(null)
      })
    }
    
  }

  truckSymbol(color) {
      return {
          path: 'M24.832 11.445c-0.186-0.278-0.498-0.445-0.832-0.445h-1c-0.553 0-1 0.447-1 1v6c0 0.553 0.447 1 1 1h4c0.553 0 1-0.447 1-1v-1.5c0-0.197-0.059-0.391-0.168-0.555l-3-4.5zM27 18h-4v-6h1l3 4.5v1.5zM31.496 15.336l-4-6c-0.558-0.837-1.492-1.336-2.496-1.336h-4v-2c0-1.654-1.346-3-3-3h-15c-1.654 0-3 1.346-3 3v11c0 1.654 1.346 3 3 3v0 3c0 1.654 1.346 3 3 3h1.142c0.447 1.721 2 3 3.859 3 1.857 0 3.41-1.279 3.857-3h5.282c0.447 1.721 2 3 3.859 3 1.857 0 3.41-1.279 3.857-3h1.144c1.654 0 3-1.346 3-3v-6c0-0.594-0.174-1.17-0.504-1.664zM3 18c-0.552 0-1-0.447-1-1v-11c0-0.553 0.448-1 1-1h15c0.553 0 1 0.447 1 1v11c0 0.553-0.447 1-1 1h-15zM11.001 27c-1.105 0-2-0.896-2-2s0.895-2 2-2c1.104 0 2 0.896 2 2s-0.897 2-2 2zM24 27c-1.105 0-2-0.896-2-2s0.895-2 2-2c1.104 0 2 0.896 2 2s-0.896 2-2 2zM30 23c0 0.553-0.447 1-1 1h-1.143c-0.447-1.721-2-3-3.857-3-1.859 0-3.412 1.279-3.859 3h-5.282c-0.447-1.721-2-3-3.857-3-1.859 0-3.412 1.279-3.859 3h-1.143c-0.552 0-1-0.447-1-1v-3h13c1.654 0 3-1.346 3-3v-7h4c0.334 0 0.646 0.167 0.832 0.445l4 6c0.109 0.164 0.168 0.358 0.168 0.555v6z',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: color,
          strokeWeight: 1,
          scale: 1,
     };
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

  placePostcodeMarker(coords,colour){
    this.bounds.extend(coords) 
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: this.pinSymbol(colour),
      animation: google.maps.Animation.DROP
    })
    this.postcodeMarkers.push(marker)
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

  displayPostcodeMarkers(marker_array){
    marker_array.forEach((coords)=>{
      this.placePostcodeMarker(coords,"red")
    })
  }

  

  clearPostcodeMarkers(){
    while(this.postcodeMarkers.length){
      this.postcodeMarkers.forEach((marker)=>{
        marker = this.postcodeMarkers.pop()
        // console.log('this.markers', this.markers)
        marker.setMap(null)
      })
    }
    this.bounds = new google.maps.LatLngBounds()
  }

  clearMap(){
    this.clearPostcodeMarkers()
    this.clearMarkers()
    this.clearRoutes()
    
  }

clearRoutes(){
  this.renderedRoutes.forEach((route)=>{
    route.setMap(null)
  })
}

}

export {MapObject, mapObjectInstances}