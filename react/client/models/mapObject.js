// import pantech from '../build/images/pantech.png'

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
      // this.placeSliderMarker(object.markerCoords, object.colour)
      this.placeMarker(object.markerCoords, object.colour, this.sliderMarkers, false)
    })
  }


  // placeSliderMarker(coords,colour){
  //   // var icon = {
  //   //   url: pantech,
  //   //   scaledSize: new google.maps.Size(35, 35)
  //   //   }
  //   // this.bounds.extend(coords) 
  //   var marker = new google.maps.Marker({
  //     position: coords,
  //     map: this.map,
  //     optimized: false,
      
  //     // icon: this.pinSymbol(colour)
  //     icon: this.truckSymbol(colour),
  //     // origin: new google.maps.Point(1000,1000),
  //     // anchor: new google.maps.Point(1,1)

  //   })
  //   this.sliderMarkers.push(marker)
  //   // this.map.fitBounds(this.bounds)   

  // }

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
          path: 'M53.074,320.717c-18.015,0-32.679,14.662-32.679,32.679c0,18.022,14.665,32.688,32.679,32.688 c18.032,0,32.689-14.665,32.689-32.688C85.763,335.379,71.106,320.717,53.074,320.717z M53.074,376.08 c-12.506,0-22.688-10.167-22.688-22.685c0-12.512,10.175-22.688,22.688-22.688c12.516,0,22.7,10.176,22.7,22.688 C75.773,365.913,65.59,376.08,53.074,376.08z M525.664,267.11v-20.484l-20.445-89.995c0-6.235-9.05-6.235-12.496-6.235H384.716 c-3.442,0-6.243,0.654-6.243,6.235v163.898c0,16.328,2.801,19.13,6.243,19.13h22.033c6.911-15.213,22.244-25.817,40.019-25.817 c17.763,0,33.077,10.61,40.001,25.817h32.644c3.449,0,6.251-2.802,6.251-6.248v-31.51h-5.873V267.11H525.664z M426.593,246.503 h-23.617v-4.796h23.617V246.503z M398.243,234.046V167.05h90.193l10.31,66.996H398.243z M503.041,325.092h-16.742 c-4.729-9.018-15.039-15.464-15.039-15.464h31.781V325.092z M21.847,303.642h341.646v39.136H182.431 c-6.14-16.869-22.333-28.936-41.288-28.936c-18.959,0-35.14,12.066-41.282,28.936h-4.046c-6.14-16.869-22.318-28.936-41.277-28.936 c-18.677,0-34.658,11.721-41,28.186C5.722,339.779,0,332.584,0,324.036v-1.663c0-4.235,1.457-8.082,3.814-11.219v-15.282 L3.637,139.58h354.409l-0.357,156.302H21.847V303.642z M445.302,320.717c-18.021,0-32.687,14.662-32.687,32.679 c0,18.022,14.665,32.688,32.687,32.688c18.022,0,32.685-14.665,32.685-32.688C477.987,335.379,463.325,320.717,445.302,320.717z M445.302,376.08c-12.512,0-22.688-10.167-22.688-22.685c0-12.512,10.165-22.688,22.688-22.688 c12.518,0,22.697,10.176,22.697,22.688C468,365.913,457.811,376.08,445.302,376.08z M139.679,320.717 c-18.02,0-32.686,14.662-32.686,32.679c0,18.022,14.666,32.688,32.686,32.688c18.026,0,32.684-14.665,32.684-32.688 C172.363,335.379,157.706,320.717,139.679,320.717z M139.679,376.08c-12.506,0-22.693-10.167-22.693-22.685 c0-12.512,10.181-22.688,22.693-22.688c12.511,0,22.694,10.176,22.694,22.688C162.374,365.913,152.19,376.08,139.679,376.08z',
          // 'M24.832 11.445c-0.186-0.278-0.498-0.445-0.832-0.445h-1c-0.553 0-1 0.447-1 1v6c0 0.553 0.447 1 1 1h4c0.553 0 1-0.447 1-1v-1.5c0-0.197-0.059-0.391-0.168-0.555l-3-4.5zM27 18h-4v-6h1l3 4.5v1.5zM31.496 15.336l-4-6c-0.558-0.837-1.492-1.336-2.496-1.336h-4v-2c0-1.654-1.346-3-3-3h-15c-1.654 0-3 1.346-3 3v11c0 1.654 1.346 3 3 3v0 3c0 1.654 1.346 3 3 3h1.142c0.447 1.721 2 3 3.859 3 1.857 0 3.41-1.279 3.857-3h5.282c0.447 1.721 2 3 3.859 3 1.857 0 3.41-1.279 3.857-3h1.144c1.654 0 3-1.346 3-3v-6c0-0.594-0.174-1.17-0.504-1.664zM3 18c-0.552 0-1-0.447-1-1v-11c0-0.553 0.448-1 1-1h15c0.553 0 1 0.447 1 1v11c0 0.553-0.447 1-1 1h-15zM11.001 27c-1.105 0-2-0.896-2-2s0.895-2 2-2c1.104 0 2 0.896 2 2s-0.897 2-2 2zM24 27c-1.105 0-2-0.896-2-2s0.895-2 2-2c1.104 0 2 0.896 2 2s-0.896 2-2 2zM30 23c0 0.553-0.447 1-1 1h-1.143c-0.447-1.721-2-3-3.857-3-1.859 0-3.412 1.279-3.859 3h-5.282c-0.447-1.721-2-3-3.857-3-1.859 0-3.412 1.279-3.859 3h-1.143c-0.552 0-1-0.447-1-1v-3h13c1.654 0 3-1.346 3-3v-7h4c0.334 0 0.646 0.167 0.832 0.445l4 6c0.109 0.164 0.168 0.358 0.168 0.555v6z',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: color,
          strokeWeight: 1,
          scale: 0.045,
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
    this.placeMarker(start,directionsServiceResponse.colour, this.markers)
    this.placeMarker(ending,directionsServiceResponse.colour, this.markers)


    this.renderedRoutes.push(directionsDisplay)
  }

  // placeMarker(coords,colour){
  //   /////////////ENTER BRANCH COORDS INSTEAD OF GETCENTER///
  //   // this.bounds.extend(this.map.getCenter())
  //   ////////////////////////////////////////////////////////
  //   this.bounds.extend(coords) 
  //   var marker = new google.maps.Marker({
  //     position: coords,
  //     map: this.map,
  //     icon: this.pinSymbol(colour),
  //     animation: google.maps.Animation.DROP
  //   })
  //   this.markers.push(marker)
  //   this.map.fitBounds(this.bounds)   

  // }

  placeMarker(coords,colour,instance_variable_marker_array, drop=true, setBounds=false){
    /////////////ENTER BRANCH COORDS INSTEAD OF GETCENTER///
    // this.bounds.extend(this.map.getCenter())
    ////////////////////////////////////////////////////////
    
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: this.pinSymbol(colour),
      animation: drop ? google.maps.Animation.DROP : null
    })
    instance_variable_marker_array.push(marker)
    if(setBounds){
      this.bounds.extend(coords) 
      this.map.fitBounds(this.bounds)  
    }  

  }



  // placePostcodeMarker(coords,colour){
  //   this.bounds.extend(coords) 
  //   var marker = new google.maps.Marker({
  //     position: coords,
  //     map: this.map,
  //     icon: this.pinSymbol(colour),
  //     animation: google.maps.Animation.DROP
  //   })
  //   this.postcodeMarkers.push(marker)
  //   this.map.fitBounds(this.bounds)   

  // }



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
      // this.placePostcodeMarker(coords,"red", this.postcodeMarkers, true)
      this.placeMarker(coords,"red", this.postcodeMarkers, true)
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