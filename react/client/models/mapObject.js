// import pantech from '../build/images/pantech.png'
import store from '../store.js'

let mapObjectInstances = {}

class MapObject{
  constructor(map, pathname){

    this.map = map
    this.directionsService = new google.maps.DirectionsService()
    this.renderedRoutes = [],
    this.bounds= new google.maps.LatLngBounds(),

    this.markers = [],
    this.postcodeMarkers = [],
    this.sliderMarkers = [],
    this.branchesMarkers = [],

    this.branchesButtonExists = false,
    this.pathname = pathname

    if(!mapObjectInstances.pathname){
      mapObjectInstances[pathname]=this
    }

  }

  clearMap(){
    this.clearMarkers(this.markers)
    this.clearMarkers(this.sliderMarkers)
    this.clearMarkers(this.postcodeMarkers)
    this.clearMarkers(this.branchesMarkers)
    this.clearRoutes()
  }

  clearRoutes(){
    this.renderedRoutes.forEach((route)=>{
      route.setMap(null)
    })
    this.renderedRoutes = []
  }

  clearMarkers(instance_variable_marker_array, resetBounds = false){
    this.bounds = new google.maps.LatLngBounds()
    while(instance_variable_marker_array.length){
      // instance_variable_marker_array.forEach((marker)=>{
       var marker = instance_variable_marker_array.pop()
       google.maps.event.clearListeners(marker, 'click');
       marker.setMap(null)
      // })
    }
    instance_variable_marker_array = []
  }

  resetBounds(){
    this.bounds = new google.maps.LatLngBounds()
  }

  displayArrayOfJobRoutes(arrayOfJobs){
    arrayOfJobs.forEach((job)=>{
      this.drawRouteWithGoogleResponse(job)
    })
  }

 


  handleSliderMarkerArray(sliderMarkerCoordsandIndexArray){
    //sliderMarkerCoordsandIndexArray looks like this: [{markerCoords, index, colour}, ...] index references mother array
    this.clearMarkers(this.sliderMarkers)
    sliderMarkerCoordsandIndexArray.forEach((object)=>{
      this.placeMarker(object.markerCoords,  this.truckSymbol3(object.colour), this.sliderMarkers, false, false, object.message)
    })
  }

  drawRouteWithGoogleResponse(job){
    if(job.hidden) return
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



  placeMarker(coords, symbol, instance_variable_marker_array, drop=true, setBounds=false, message=''){


    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: symbol,
      animation: drop ? google.maps.Animation.DROP : null,

    })
    if(message) this.addInfoWindow(marker, message)
      instance_variable_marker_array.push(marker)

    if(setBounds){
      this.bounds.extend(coords) 
      this.map.fitBounds(this.bounds)  
    }
  }




displayMarkersFromStore(marker_array_from_store,  instance_variable_marker_array, colour = 'red'){
  marker_array_from_store.forEach((coords)=>{
    this.placeMarker(coords, this.pinSymbol(colour), instance_variable_marker_array, true, true)
  })
  if(instance_variable_marker_array.length===1) this.map.setZoom(10)
}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

  addInfoWindow(marker, message) {
  // ensure listener is cleared 
  // note we can create a div for info window
  var infoWindow = new google.maps.InfoWindow({
    content: `${message}`
  });

  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.open(this.map, marker);
  });
}


addBranchButtonToMap(){
  if (this.branchesButtonExists) return
    this.branchesButtonExists = true
  var centerControlDiv = document.createElement('div');
  this.styleBranchesButtonAndListenerFunction(centerControlDiv, this.map)     

  centerControlDiv.index = 1;
  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

}

styleBranchesButtonAndListenerFunction(controlDiv, map){
// Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.margin = '12px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

     // Set CSS for the control interior.
     var controlText = document.createElement('div');
     controlText.style.color = 'rgb(25,25,25)';
     controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
     controlText.style.fontSize = '10px';
     controlText.style.lineHeight = '24px';
     controlText.style.paddingLeft = '5px';
     controlText.style.paddingRight = '5px';

     controlText.innerHTML = 'Branches';
     controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
    var chicago = {lat: 41.85, lng: -87.65};
    controlUI.addEventListener('click', this.display_branches.bind(this));
 }

 display_branches(){
  this.clearMap()
  const branches = store.getState().common.all_branches
  //get latlng from branch postcode
  // placeMarker(coords, symbol, instance_variable_marker_array, drop=true, setBounds=false, message='')
  branches.forEach((branch)=>{
    var latlng2 = JSON.parse(branch.latlng)
    console.log( latlng2)
    this.placeMarker(latlng2, this.pinSymbol(branch.colour), this.branchesMarkers, true, true, branch.address)})
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





