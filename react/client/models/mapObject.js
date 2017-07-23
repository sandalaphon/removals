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

  clearMap(){
    this.clearMarkers(this.markers)
    this.clearMarkers(this.sliderMarkers)
    this.clearMarkers(this.postcodeMarkers)
    this.clearRoutes()

  }

  clearRoutes(){
    this.renderedRoutes.forEach((route)=>{
      route.setMap(null)
    })
  }

  clearMarkers(instance_variable_marker_array){
    while(instance_variable_marker_array.length){
      instance_variable_marker_array.forEach((marker)=>{
        marker = instance_variable_marker_array.pop()
        marker.setMap(null)
      })
    }
    this.bounds = new google.maps.LatLngBounds()
  }

  handleSliderMarkerArray(sliderMarkerCoordsandIndexArray){
    //sliderMarkerCoordsandIndexArray looks like this: [{markerCoords, index, colour}, ...] index references mother array
    this.clearMarkers(this.sliderMarkers)
    sliderMarkerCoordsandIndexArray.forEach((object)=>{
      // this.placeMarker(object.markerCoords,  this.truckSymbol(object.colour), this.sliderMarkers, false, false)
      this.placeMarker(object.markerCoords,  this.truckSymbol3(object.colour), this.sliderMarkers, false, false)
    })
  }

  drawRouteWithGoogleResponse(job){
    var {start_location, end_location} = job.google_directions.routes[ 0 ].legs[ 0 ]
    this.placeMarker(start_location , this.pinSymbol(job.colour), this.markers)
    this.placeMarker(end_location , this.pinSymbol(job.colour), this.markers)

    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      suppressMarkers: true
    })
    directionsDisplay.setDirections(job.google_directions)
    this.renderedRoutes.push(directionsDisplay)
  }

  placeMarker(coords, symbol, instance_variable_marker_array, drop=true, setBounds=true){
      var marker = new google.maps.Marker({
        position: coords,
        map: this.map,
        icon: symbol,
        animation: drop ? google.maps.Animation.DROP : null,
        
      })
      instance_variable_marker_array.push(marker)
     if(setBounds){
      this.bounds.extend(coords) 
      this.map.fitBounds(this.bounds)  
     }    

  }



displayMarkersFromStore(marker_array_from_store,  instance_variable_marker_array){
  marker_array_from_store.forEach((coords)=>{
    this.placeMarker(coords, this.pinSymbol("red"), instance_variable_marker_array, false)
  })
  this.map.setZoom(10)
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


truckSymbol3(color){
  return {
    
    path: "M0 1530 l0 -460 835 0 835 0 0 460 0 460 -835 0 -835 0 0 -460z M1765 1647 c-3 -6 -4 -194 -3 -417 l3 -405 70 -2 c69 -3 70 -2 90 29 11 18 39 46 63 62 37 26 54 31 117 34 94 5 153 -20 198 -85 l31 -43 88 0 c81 0 91 2 113 25 24 23 25 28 25 169 0 80 -5 157 -10 172 -6 15 -70 123 -142 240 -108 176 -136 215 -161 223 -45 16 -476 15 -482 -2z m419 -44 c34 -5 43 -14 76 -66 21 -33 57 -97 81 -142 63 -119 71 -115 -216 -115 -290 0 -270 -12 -270 70 0 93 4 131 14 143 11 14 35 17 145 17 72 0 148 -3 170 -7z m314 -625 c18 -18 15 -103 -4 -119 -25 -21 -49 1 -52 49 -5 65 24 102 56 70z M153 990 c-36 -14 -56 -55 -50 -97 7 -42 56 -98 64 -74 11 29 76 91 117 110 57 28 152 28 205 1 41 -20 111 -94 111 -117 0 -11 99 -13 535 -13 l535 0 0 100 0 100 -747 -1 c-412 0 -758 -4 -770 -9z M300 888 c-133 -68 -112 -261 33 -308 70 -22 159 16 190 83 25 51 22 127 -6 168 -26 39 -97 79 -142 79 -17 0 -51 -10 -75 -22z m123 -27 c87 -33 108 -155 36 -215 -84 -71 -209 -14 -209 94 0 90 90 152 173 121z M2045 896 c-17 -7 -45 -29 -62 -49 -80 -91 -34 -232 87 -268 78 -23 164 24 196 107 15 40 16 53 5 93 -27 103 -133 158 -226 117z m136 -49 c66 -45 76 -139 19 -196 -53 -53 -127 -53 -180 0 -107 108 35 281 161 196z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: 'black',
    strokeWeight: .3,
    scale: 0.01,
    rotation: 180,
    // size: new google.maps.Size(800, 800), //size
    origin: new google.maps.Point(0, 0), //origin point
    anchor: new google.maps.Point(1000, 1000) // offset point

 
    
  }
}


  }

  export {MapObject, mapObjectInstances}

////////////////////////////////////////////////////////////////////////
/////// factored out functions                      ///////////////////
//////////////////////////////////////////////////////////////////////

// clearSliderMarkers(){
//   while(this.sliderMarkers.length){
//     this.sliderMarkers.forEach((marker)=>{
//       marker = this.sliderMarkers.pop()
//       // console.log('this.markers', this.markers)
//       marker.setMap(null)
//     })
//   }

// }

// clearPostcodeMarkers(){
//   while(this.postcodeMarkers.length){
//     this.postcodeMarkers.forEach((marker)=>{
//       marker = this.postcodeMarkers.pop()
//       // console.log('this.markers', this.markers)
//       marker.setMap(null)
//     })
//   }
//   this.bounds = new google.maps.LatLngBounds()
// }



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

// truckSymbol(color) {
//   return {
//     path: 'M53.074,320.717c-18.015,0-32.679,14.662-32.679,32.679c0,18.022,14.665,32.688,32.679,32.688 c18.032,0,32.689-14.665,32.689-32.688C85.763,335.379,71.106,320.717,53.074,320.717z M53.074,376.08 c-12.506,0-22.688-10.167-22.688-22.685c0-12.512,10.175-22.688,22.688-22.688c12.516,0,22.7,10.176,22.7,22.688 C75.773,365.913,65.59,376.08,53.074,376.08z M525.664,267.11v-20.484l-20.445-89.995c0-6.235-9.05-6.235-12.496-6.235H384.716 c-3.442,0-6.243,0.654-6.243,6.235v163.898c0,16.328,2.801,19.13,6.243,19.13h22.033c6.911-15.213,22.244-25.817,40.019-25.817 c17.763,0,33.077,10.61,40.001,25.817h32.644c3.449,0,6.251-2.802,6.251-6.248v-31.51h-5.873V267.11H525.664z M426.593,246.503 h-23.617v-4.796h23.617V246.503z M398.243,234.046V167.05h90.193l10.31,66.996H398.243z M503.041,325.092h-16.742 c-4.729-9.018-15.039-15.464-15.039-15.464h31.781V325.092z M21.847,303.642h341.646v39.136H182.431 c-6.14-16.869-22.333-28.936-41.288-28.936c-18.959,0-35.14,12.066-41.282,28.936h-4.046c-6.14-16.869-22.318-28.936-41.277-28.936 c-18.677,0-34.658,11.721-41,28.186C5.722,339.779,0,332.584,0,324.036v-1.663c0-4.235,1.457-8.082,3.814-11.219v-15.282 L3.637,139.58h354.409l-0.357,156.302H21.847V303.642z M445.302,320.717c-18.021,0-32.687,14.662-32.687,32.679 c0,18.022,14.665,32.688,32.687,32.688c18.022,0,32.685-14.665,32.685-32.688C477.987,335.379,463.325,320.717,445.302,320.717z M445.302,376.08c-12.512,0-22.688-10.167-22.688-22.685c0-12.512,10.165-22.688,22.688-22.688 c12.518,0,22.697,10.176,22.697,22.688C468,365.913,457.811,376.08,445.302,376.08z M139.679,320.717 c-18.02,0-32.686,14.662-32.686,32.679c0,18.022,14.666,32.688,32.686,32.688c18.026,0,32.684-14.665,32.684-32.688 C172.363,335.379,157.706,320.717,139.679,320.717z M139.679,376.08c-12.506,0-22.693-10.167-22.693-22.685 c0-12.512,10.181-22.688,22.693-22.688c12.511,0,22.694,10.176,22.694,22.688C162.374,365.913,152.19,376.08,139.679,376.08z',
//         // 'M24.832 11.445c-0.186-0.278-0.498-0.445-0.832-0.445h-1c-0.553 0-1 0.447-1 1v6c0 0.553 0.447 1 1 1h4c0.553 0 1-0.447 1-1v-1.5c0-0.197-0.059-0.391-0.168-0.555l-3-4.5zM27 18h-4v-6h1l3 4.5v1.5zM31.496 15.336l-4-6c-0.558-0.837-1.492-1.336-2.496-1.336h-4v-2c0-1.654-1.346-3-3-3h-15c-1.654 0-3 1.346-3 3v11c0 1.654 1.346 3 3 3v0 3c0 1.654 1.346 3 3 3h1.142c0.447 1.721 2 3 3.859 3 1.857 0 3.41-1.279 3.857-3h5.282c0.447 1.721 2 3 3.859 3 1.857 0 3.41-1.279 3.857-3h1.144c1.654 0 3-1.346 3-3v-6c0-0.594-0.174-1.17-0.504-1.664zM3 18c-0.552 0-1-0.447-1-1v-11c0-0.553 0.448-1 1-1h15c0.553 0 1 0.447 1 1v11c0 0.553-0.447 1-1 1h-15zM11.001 27c-1.105 0-2-0.896-2-2s0.895-2 2-2c1.104 0 2 0.896 2 2s-0.897 2-2 2zM24 27c-1.105 0-2-0.896-2-2s0.895-2 2-2c1.104 0 2 0.896 2 2s-0.896 2-2 2zM30 23c0 0.553-0.447 1-1 1h-1.143c-0.447-1.721-2-3-3.857-3-1.859 0-3.412 1.279-3.859 3h-5.282c-0.447-1.721-2-3-3.857-3-1.859 0-3.412 1.279-3.859 3h-1.143c-0.552 0-1-0.447-1-1v-3h13c1.654 0 3-1.346 3-3v-7h4c0.334 0 0.646 0.167 0.832 0.445l4 6c0.109 0.164 0.168 0.358 0.168 0.555v6z',
//         fillColor: color,
//         fillOpacity: 1,
//         strokeColor: color,
//         strokeWeight: 1,
//         scale: 0.045,
//       };
//     }

// truckSymbol2(color){
//   return {
    
//     path: "M507 1593 c-4 -71 -7 -230 -7 -355 l0 -228 475 0 c384 0 475 2 475 13 0 7 11 29 25 47 76 103 213 89 280 -28 1 -1 22 18 46 42 52 52 99 65 162 46 39 -11 87 -50 100 -80 6 -13 8 -13 14 0 24 56 112 98 178 86 42 -8 110 -66 119 -101 6 -24 10 -25 76 -25 l70 0 0 80 c0 73 2 80 20 80 20 0 20 7 20 275 l0 275 -1023 0 -1024 0 -6 -127z m1973 -463 c0 -22 -4 -40 -10 -40 -5 0 -10 18 -10 40 0 22 5 40 10 40 6 0 10 -18 10 -40z M408 1667 c-41 -24 -88 -53 -103 -65 l-28 -22 107 0 106 0 0 65 c0 36 -1 65 -3 65 -1 0 -37 -20 -79 -43z M56 1423 l-57 -128 3 -125 3 -125 36 -3 c33 -3 38 1 65 44 76 121 244 112 308 -18 7 -14 22 -24 39 -26 l27 -3 0 255 0 256 -183 0 -184 0 -57 -127z m384 22 l0 -65 -72 0 c-69 0 -73 -1 -119 -40 -46 -38 -50 -40 -118 -40 -39 0 -71 3 -71 7 0 3 16 51 36 105 l36 98 154 0 154 0 0 -65z M183 1100 c-90 -54 -86 -192 7 -241 121 -65 250 66 186 189 -22 43 -71 72 -121 72 -22 0 -54 -9 -72 -20z m109 -72 c27 -22 30 -53 7 -81 -27 -35 -61 -35 -88 0 -32 40 -7 93 44 93 12 0 28 -6 37 -12z M1540 1094 c-88 -64 -89 -163 -1 -221 85 -57 191 5 191 111 0 38 -6 52 -33 82 -28 31 -41 37 -83 41 -36 3 -55 0 -74 -13z m98 -70 c41 -29 19 -96 -31 -96 -36 0 -57 19 -57 53 0 27 30 59 55 59 6 0 21 -7 33 -16z M1847 1092 c-38 -23 -71 -93 -62 -131 18 -84 112 -134 183 -97 89 46 102 149 26 215 -41 36 -101 42 -147 13z m101 -68 c41 -29 19 -96 -31 -96 -36 0 -57 19 -57 53 0 27 30 59 55 59 6 0 21 -7 33 -16z M2158 1095 c-34 -19 -68 -74 -68 -111 0 -67 67 -134 134 -134 38 0 93 35 111 70 58 111 -67 234 -177 175z m103 -76 c26 -26 21 -57 -12 -82 -21 -15 -31 -17 -48 -8 -32 17 -44 47 -30 74 23 43 57 49 90 16z M0 1005 c0 -22 4 -25 35 -25 31 0 35 3 35 25 0 22 -4 25 -35 25 -31 0 -35 -3 -35 -25z M430 1005 c0 -20 5 -25 25 -25 20 0 25 5 25 25 0 20 -5 25 -25 25 -20 0 -25 -5 -25 -25z M500 980 c0 -20 7 -20 470 -20 463 0 470 0 470 20 0 20 -7 20 -470 20 -463 0 -470 0 -470 -20z M2390 980 c0 -18 7 -20 70 -20 63 0 70 2 70 20 0 18 -7 20 -70 20 -63 0 -70 -2 -70 -20z"
//     ,
//     fillColor: color,
//     fillOpacity: 1,
//     strokeColor: 'black',
//     strokeWeight: .3,
//     scale: 0.01,
 
    
//   }
// }

  // placeMarker(coords, colour, instance_variable_marker_array, drop=true, setBounds=true){
  //   /////////////ENTER BRANCH COORDS INSTEAD OF GETCENTER///
  //   // this.bounds.extend(this.map.getCenter())
  //   ////////////////////////////////////////////////////////
  //   var isSlider = (instance_variable_marker_array===this.sliderMarkers)
  //   var marker = isSlider ? this.getAppropriateMarker(coords, colour, drop) : this.getAppropriateMarker(coords, colour, drop)
  //   instance_variable_marker_array.push(marker)
  //   if(setBounds){
  //     this.bounds.extend(coords) 
  //     this.map.fitBounds(this.bounds)  
  //   }  

  // }

//   getAppropriateMarker(coords, colour, drop, symbol=null){
//   // if(symbol==null){

//   // } symbol = this.pinSymbol(colour)

//   symbol = symbol==null ? this.pinSymbol(colour) : symbol

//   var marker = new google.maps.Marker({
//     position: coords,
//     map: this.map,
//     icon: symbol,
//     animation: drop ? google.maps.Animation.DROP : null
//   })
//   return marker
// }




