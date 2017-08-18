// import pantech from '../build/images/pantech.png'
import store from '../store.js'
import { dispatch } from 'redux';
import { setBranchDisplayStatus } from '../actions/_common_actions';

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

  setZoom(zoom){
    this.map.setZoom(zoom)
  }

  clearMap(clearArrays=true, clearSliderMarkers = true){
    this.clearMarkers(this.markers, clearArrays)
    if(clearSliderMarkers) this.clearMarkers(this.sliderMarkers, clearArrays)
    this.clearMarkers(this.postcodeMarkers, clearArrays)
    // this.clearMarkers(this.branchesMarkers, clearArrays)
    this.clearRoutes(clearArrays)
  }

  clearRoutes(clearArrays){
    this.showOrHide(this.renderedRoutes, true)
    if(clearArrays) this.renderedRoutes.length = 0
  }

  clearMarkers(instance_variable_marker_array, clearArrays=true){
    this.resetBounds()
    this.showOrHide(instance_variable_marker_array, true, clearArrays)
    if(clearArrays){
        instance_variable_marker_array.length = 0 //clears array
      }
    }

  reinstateMap(){
    console.log(this.renderedRoutes)
    this.showOrHide(this.renderedRoutes, false)
    this.showOrHide(this.markers, false)
    this.showOrHide(this.sliderMarkers, false)
    this.showOrHide(this.postcodeMarkers, false)
    this.clearMarkers(this.branchesMarkers)
  }

  showOrHide(array, hide=true, removeListeners=false){ //takes array of routes or markers
   var mapOrNull = hide ? null : this.map
   array.forEach((markerOrRoute)=>{
    markerOrRoute.setMap(mapOrNull)
    if(removeListeners){
      google.maps.event.clearInstanceListeners(markerOrRoute);
    }
   })
  }

  resetBounds(){
    this.bounds = new google.maps.LatLngBounds()
  }

  displayArrayOfJobRoutes(arrayOfJobs){
    this.clearMap(true, false)
    arrayOfJobs.forEach((job)=>{
        this.drawRouteWithGoogleResponse(job)
    })
  }

  handleSliderMarkerArray(sliderMarkerCoordsandIndexArray){
    //sliderMarkerCoordsandIndexArray looks like this: [{markerCoords, index, colour}, ...] index references mother array
    this.clearMarkers(this.sliderMarkers)
    sliderMarkerCoordsandIndexArray.forEach((object)=>{
      console.log('object', object)
      this.placeMarker(object.markerCoords,  this.truckSymbol3(object.colour), this.sliderMarkers, false, false, object.message)
    })
  }

  drawRouteWithGoogleResponse(job){
    console.log('drawing a route')
      if(job.hidden) return
    var {start_location, end_location} = job.google_directions.routes[ 0 ].legs[ 0 ]
    this.placeMarker(start_location , this.pinSymbol(job.colour), this.markers, true, false, '', this.panToStreetView.bind(this))
    this.placeMarker(end_location , this.pinSymbol(job.colour), this.markers, true, false, '', this.panToStreetView.bind(this))

    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      suppressMarkers: true
    })
    directionsDisplay.setDirections(job.google_directions)
    this.renderedRoutes.push(directionsDisplay)
  }

  placeMarker(coords, symbol, instance_variable_marker_array, drop=true, setBounds=false, message='', clickfunction=null){
    // console.log(coords, message,instance_variable_marker_array)
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: symbol,
      animation: drop ? google.maps.Animation.DROP : null,
    })
    if(message) this.addInfoWindow(marker, message)
    if(setBounds){
      this.bounds.extend(coords) 
      this.map.fitBounds(this.bounds)  
    }
    if(clickfunction) marker.addListener('click', (e)=>{clickfunction(e)})
    instance_variable_marker_array.push(marker)

  }
  
  testClickFunction(e){
    console.log('e', e)
  }

displayMarkersFromStore(marker_array_from_store,  instance_variable_marker_array, colour = 'red', clickfunction){
  marker_array_from_store.forEach((coords)=>{
    this.placeMarker(coords, this.pinSymbol(colour), instance_variable_marker_array, false, true, '', clickfunction)
  })
  console.log('length', instance_variable_marker_array.length)
  if(instance_variable_marker_array.length===1) this.map.setZoom(10)
}

panToStreetView(coords){
var streetView = new google.maps.StreetViewPanorama(
            document.getElementById('map'), {
              position: coords.latLng,
              addressControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
              },
              linksControl: false,
              panControl: true,
              enableCloseButton: false
        });
this.createAMapButton(this.returnToMap.bind(this, streetView), 'LEFT_BOTTOM', 'Return To Map', streetView)
}

returnToMap(streetView){
  streetView.setVisible(false)
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

getPixelFromLatLng(latLng) {
    var projection = this.map.getProjection();
    //refer to the google.maps.Projection object in the Maps API reference
    var point = projection.fromLatLngToPoint(latLng);
    return point;
}

getInfowindowOffset(marker){
  var center = this.getPixelFromLatLng(this.map.getCenter())
  var point = this.getPixelFromLatLng(marker.getPosition())
  var offset = ''
  var quadrant =''
  quadrant += (point.y > center.y) ? "b" : "t";
  quadrant += (point.x < center.x) ? "l" : "r";
  if (quadrant == "tr") {
      offset = new google.maps.Size(-70, 185);
  } else if (quadrant == "tl") {
      offset = new google.maps.Size(70, 185);
  } else if (quadrant == "br") {
      offset = new google.maps.Size(-70, 20);
  } else if (quadrant == "bl") {
      offset = new google.maps.Size(70, 20);
  }
  return offset
}

  addInfoWindow(marker, message) {
  // ensure listener is cleared 
  // note we can create a div for info window
  var infoWindow = new google.maps.InfoWindow({
    content: `${message}`,
    maxWidth: 200,
    disableAutoPan : true,
    // pixelOffset: this.getInfowindowOffset(marker)
  });

  marker.addListener( 'mouseover', function () {
    infoWindow.open(this.map, marker);
  });
  // google.maps.event.addListener(markhandleer,'click', function() {
            // alert('clicked');
          // });
  marker.addListener('mouseout', function() {
            infoWindow.close(this.map, marker);
          });
}

createAMapButton(listenerFunction, positionInCapitals, nameString, streetView){//if no streetView then normal map
  if(nameString=='Branches'){
    if(this.branchesButtonExists) return
      this.branchesButtonExists = true
  }
  var button = document.createElement('div');
  this.styleButtonAndAddListener(button, this.map, listenerFunction, nameString, streetView)
  button.index = 1
  if(streetView){
    streetView.controls[google.maps.ControlPosition[positionInCapitals]].push(button)
    //push to streetviewcontrols
  
  }else{
    this.map.controls[google.maps.ControlPosition[positionInCapitals]].push(button);
  }
  
}

styleButtonAndAddListener(button, map, listenerFunction, nameString, streetView){
    var backColor = streetView ? 'rgb(25,25,25)' : '#fff'
    var textColor = streetView ? '#fff' : 'rgb(25,25,25)'
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = backColor;
    controlUI.style.border =  `2px solid ${backColor}`;
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.margin = '12px';
    controlUI.style.textAlign = 'center';
    // controlUI.title = 'Click to recenter the map';
    button.appendChild(controlUI);
     // Set CSS for the control interior.
     var controlText = document.createElement('div');
     controlText.style.color = textColor;
     controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
     controlText.style.fontSize = '10px';
     controlText.style.lineHeight = '24px';
     controlText.style.paddingLeft = '5px';
     controlText.style.paddingRight = '5px';
     controlText.innerHTML = nameString;
     controlUI.appendChild(controlText);
     controlUI.addEventListener('click', listenerFunction);
}

 setCurrentBranchStatus(incrementCurrentBranchesStatus=false){
  switch(this.pathname){
    case 'partload':
    this.currentBranchStatus = store.getState().common.branch_status_partload
    break;
    case 'today':
    this.currentBranchStatus = store.getState().common.branch_status_today
    break;
    case 'planner':
    this.currentBranchStatus = store.getState().common.branch_status_planner
    break;
  }
  if(incrementCurrentBranchesStatus){
    this.currentBranchStatus++
    if(this.currentBranchStatus===3) this.currentBranchStatus=0
  }
 }

 handleBranchMarkerClick(event){
  this.handleBranchesClick()
 }

 handleBranchesClick(){

  this.setCurrentBranchStatus(true)
  store.dispatch(setBranchDisplayStatus(this.pathname, this.currentBranchStatus))
  this.display_branches(this.currentBranchStatus)
 }

 display_branches(branchStatus){
  const branches = store.getState().common.all_branches

  if(!branchStatus){
    this.hideOrShowElements(false)
    this.clearMarkers(this.branchesMarkers, true)
  }else if(branchStatus==1){
    this.hideOrShowElements(false)
    branches.forEach((branch)=>{
      var latlng2 = JSON.parse(branch.latlng)
      this.placeMarker(latlng2, this.branchSymbol("#265eb7"), this.branchesMarkers, true, false, branch.address, this.handleBranchMarkerClick.bind(this))
    })
  }else{
    this.hideOrShowElements(true)
    branches.forEach((branch)=>{
      var latlng2 = JSON.parse(branch.latlng)
      this.placeMarker(latlng2, this.branchSymbol("#265eb7"), this.branchesMarkers, false, false, branch.address, this.handleBranchMarkerClick.bind(this))
    })

  }
 }

 hideOrShowElements(hide=true){

  var domElements = this.getElements()
  console.log(domElements, this.pathname)
  domElements.forEach((element)=>{
    hide ? element.classList.add('hidden') : element.classList.remove('hidden')
  })
 this.setBranchListVisibility(!hide)
 }

 setBranchListVisibility(hide){
    var branchListDiv = document.querySelector(`.branch-info-table-${this.pathname}`)
    hide ? branchListDiv.classList.add('hidden') : branchListDiv.classList.remove('hidden')
 }

 getElements(){
  switch(this.pathname){
    case 'planner':
      var jobListEl = document.querySelector('.grid-item-joblist')
      var truckdayEl = document.querySelector('.grid-item-truck-day-view')
      var filterEl = document.querySelector('.grid-item-filter')
      return([jobListEl, truckdayEl, filterEl])
    break;
    case 'today':
    var listTodayEl = document.querySelector('.grid-item-list-today')
    return([listTodayEl])
    break;
    case 'partload':
    var postcodeEl = document.querySelector('.grid-item-postcode')
    var suggestionListEl = document.querySelector('.grid-item-suggestion-list')
    return([postcodeEl, suggestionListEl])
    break;
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

branchSymbol(color='red'){
  return{
    path: "M25.595,38.425h6.69c1.02,0,1.85-0.83,1.85-1.86v-13.52l3.49-1.81l-13.64-11.66l-13.61,11.66     l3.49,1.81v13.52c0,1.03,0.83,1.86,1.86,1.86h6.68v-5.9599h3.19V38.425z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 2,
    scale: .4,
    origin: new google.maps.Point(0, 0), //origin point
    anchor: new google.maps.Point(24, 24) // offset point 
  }
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




