// import pantech from '../build/images/pantech.png'
import store from '../store.js'
import { dispatch } from 'redux'
import {
  toggleBranchesOnMap,
  toggleFullScreenMap,
  toggleBranchListDisplayed,
  setSliderSecondsFromStart,
  setBranchIconClickedId
} from '../actions/_common_actions'
import { getComplementaryColour } from '../reducers/_helpers'
// import {placeMarkers} from './sliderFunctions'
import Animation from '../models/animation'

let mapObjectInstances = {}

class MapObject {
  constructor(map, pathname) {
    this.map = map
    this.pathname = pathname
    this.animation = new Animation(this, pathname)
    this.directionsService = new google.maps.DirectionsService()
    this.renderedRoutes = []
    this.bounds = new google.maps.LatLngBounds()
    this.markers = []
    this.postcodeMarkers = []
    this.sliderMarkers = []
    this.branchesMarkers = []
    this.highlightedMarkers = []
    this.branchesButtonExists = false
    this.fullScreenButtonExists = false
    this.fromBranchesRoutes = []
    this.toBranchesRoutes = []
    this.toBranchesMarkers = []
    this.home_branch_of_route_markers = []
    this.branchesVisible = undefined
    this.branchListVisible = false
    this.initialRoutesRendered = false
    this.animeFrames = []
    this.surveyRoutesByCode = {}
    this.survey_markers = []
    this.renderedRoutesObject = {}
    this.renderedRoutesStartFinishMarkersObject = {},
    this.todayPostCodeMarkers = []

    if (!mapObjectInstances.pathname) {
      mapObjectInstances[pathname] = this
    }
    console.log('map object instances', mapObjectInstances)
  }

  isRouteDisplaySaved(id) {
    return Object.keys(this.renderedRoutes).includes(id)
  }

  placeTodayPostCodeMarker(latlng, postcode){
    // this.todayPostCodeMarkers = []
    this.clearMarkers(this.todayPostCodeMarkers)
    this.placeMarker(
      latlng,
      // this.pinSymbol('blue'),
      null,
      this.todayPostCodeMarkers,
      true,
      false,
      postcode
      )
    this.setCenter(latlng)
  }

  placeSurveyMarker(coords, message = '') {
    console.log('place survey markers')
    this.placeMarker(
      coords,
      this.surveySymbol(),
      this.survey_markers,
      false,
      true,
      message
    )
  }

  highlightMarker(coords, message) {
    this.clearMarkers(this.highlightedMarkers)
    this.placeMarker(
      coords,
      this.surveySymbol('blue'),
      this.highlightedMarkers,
      true,
      false,
      message
    )
  }

  setZoom(zoom) {
    this.map.setZoom(zoom)
  }

  setCenter(coords) {
    this.map.setCenter(coords)
  }

  clearMap(clearArrays = true, clearSliderMarkers = true) {
    this.clearMarkers(this.markers, clearArrays)
    this.clearMarkers(this.home_branch_of_route_markers, clearArrays)
    if (clearSliderMarkers) this.clearMarkers(this.sliderMarkers, clearArrays)
    this.clearMarkers(this.postcodeMarkers, clearArrays)
    this.clearMarkers(this.branchesMarkers, clearArrays)
    this.clearMarkers(this.survey_markers, clearArrays)
    this.clearRoutes(this.renderedRoutes, clearArrays)
    this.clearRoutes(this.toBranchesRoutes, clearArrays)
    this.clearRoutes(this.fromBranchesRoutes, clearArrays)
    console.log('intance variables??', this.surveyRoutesByCode)
    this.clearRoutes(Object.values(this.surveyRoutesByCode), false)
  }

  clearRoutes(instance_variable_array, clearArrays = true) {
    this.showOrHide(instance_variable_array, true)
    if (clearArrays) this.renderedRoutes.length = 0
  }

  clearMarkers(instance_variable_marker_array, clearArrays = true) {
    this.resetBounds()
    this.showOrHide(instance_variable_marker_array, true, clearArrays)
    if (clearArrays) {
      instance_variable_marker_array.length = 0 //clears array
    }
  }

  reinstateMap() {
    this.showOrHide(this.renderedRoutes, false)
    this.showOrHide(this.markers, false)
    this.showOrHide(this.sliderMarkers, false)
    this.showOrHide(this.postcodeMarkers, false)
    this.clearMarkers(this.branchesMarkers)
  }

  showOrHide(array, hide = true, removeListeners = false) {
    //takes array of routes or markers
    var mapOrNull = hide ? null : this.map
    array.forEach(markerOrRoute => {
      markerOrRoute.setMap(mapOrNull)
      if (removeListeners) {
        google.maps.event.clearInstanceListeners(markerOrRoute)
      }
    })
  }

  hideRouteById(trip_id) {
    console.log('this.renderedRoutesObject', this.renderedRoutesObject[trip_id])
    this.renderedRoutesObject[trip_id].setMap(null)
    this.renderedRoutesStartFinishMarkersObject[trip_id].forEach(marker => {
      marker.setMap(null)
    })
  }

  showRouteById(trip_id) {
    this.renderedRoutesObject[trip_id].setMap(this.map)
    this.renderedRoutesStartFinishMarkersObject[trip_id].forEach(marker => {
      marker.setMap(this.map)
    })
  }

  resetBounds() {
    this.bounds = new google.maps.LatLngBounds()
  }

  displayArrayOfJobRoutes(arrayOfJobs) {
    this.clearMap(true, false)
    arrayOfJobs.forEach(job => {
      this.drawRouteWithGoogleResponse(job)
    })
  }

  handleSliderMarkerArray(sliderMarkerCoordsandIndexArray, trucks = true) {
    //sliderMarkerCoordsandIndexArray looks like this: [{markerCoords, index, colour}, ...] index references mother array
    this.clearMarkers(this.sliderMarkers)
    if (trucks) {
      sliderMarkerCoordsandIndexArray.forEach(object => {
        this.placeMarker(
          object.markerCoords,
          this.getTruckMarker(object.colour, object.leg),
          this.sliderMarkers,
          false,
          false,
          object.message
        )
      })
    } else {
      console.log(
        'sliderMarkerCoordsandIndexArray',
        sliderMarkerCoordsandIndexArray
      )
      sliderMarkerCoordsandIndexArray.forEach(object => {
        if (!object) return
        console.log('object', object)
        this.placeMarker(
          object.markerCoords,
          this.carSymbol(object.colour),
          this.sliderMarkers,
          false,
          false,
          object.message
        )
      })
    }
  }

  getBranchById(branchId) {
    var branchToReturn
    var branches = store.getState().common.all_branches
    branches.forEach(branch => {
      if (branch.id == branchId) {
        branchToReturn = branch
      }
    })
    return branchToReturn
  }

  drawDiversionRoute(g_directions, diversion) {
    var { start_location } = g_directions.routes[0].legs[1]

    var { end_location } = g_directions.routes[0].legs[
      g_directions.routes[0].legs.length - 2
    ]

    var waypoints_lat_lngs = g_directions.routes[0].legs.map(leg => {
      return leg.start_location
    })
    var home_branch_location = waypoints_lat_lngs.shift()
    var pick_up_lat_lng = waypoints_lat_lngs.shift()
    var drop_off_lat_lng = waypoints_lat_lngs.shift()
    var further_waypoints = waypoints_lat_lngs
    var polylineColour = diversion.undiverted_job.colour
    var marker_colour = getComplementaryColour(diversion.undiverted_job.colour)
    console.log('p colour', polylineColour)
    console.log('marker_colour', marker_colour)
    console.log('further_waypoints', further_waypoints)
    this.placeMarker(
      pick_up_lat_lng,
      this.pinSymbol(marker_colour),
      this.markers,
      true,
      false,
      '',
      this.panToStreetView.bind(this),
      'S',
      polylineColour,
      diversion
    )
    this.placeMarker(
      drop_off_lat_lng,
      this.pinSymbol(marker_colour),
      this.markers,
      true,
      false,
      '',
      this.panToStreetView.bind(this),
      'F',
      polylineColour,
      diversion
    )
    further_waypoints.forEach(waypoint => {
      this.placeMarker(
        waypoint,
        this.pinSymbol(marker_colour),
        this.markers,
        true,
        false,
        '',
        this.panToStreetView.bind(this),
        'W',
        polylineColour,
        diversion
      )
    })

    this.drawRoute(g_directions, polylineColour, null, diversion)
  }

  drawRouteWithGoogleResponse(job, addStartFinishMarkers = true) {
    // console.log('job in drawRoute' , job, job.hidden[this.pathname])
  
    if (job.hidden[this.pathname]) return

    var {
      start_location,
      end_location
    } = job.google_waypoints_directions.routes[0].legs[1]
    var branch = this.getBranchById(job.branch_id)

    if (addStartFinishMarkers) {
      this.placeMarker(
        start_location,
        this.pinSymbol(job.colour),
        this.markers,
        true,
        false,
        '',
        this.panToStreetView.bind(this),
        'S',
        getComplementaryColour(job.colour),
        job
      )
      this.placeMarker(
        end_location,
        this.pinSymbol(job.colour),
        this.markers,
        true,
        false,
        '',
        this.panToStreetView.bind(this),
        'F',
        getComplementaryColour(job.colour),
        job
      )
      this.placeMarker(
        branch.latlng,
        this.branchSymbol('#265eb7'),
        this.home_branch_of_route_markers,
        true,
        false,
        branch.address,
        this.handleBranchMarkerClick.bind(this),
        null,
        null,
        job
      )
    }

    this.drawRoute(
      job.google_waypoints_directions,
      getComplementaryColour(job.colour),
      null,
      job
    )
  }

  drawRouteWithWayPoints(
    startLatLng,
    finishLatLng,
    waypointLatLngArray,
    polylineColour,
    dayAndSurveyorUniqueCode
  ) {
    if (this.surveyRoutesByCode[dayAndSurveyorUniqueCode]) {
      console.log('rendering saved route')
      console.log('display', this.surveyRoutesByCode[dayAndSurveyorUniqueCode])
      this.surveyRoutesByCode[dayAndSurveyorUniqueCode].setMap(this.map)
      return
    }
    var waypointArray = waypointLatLngArray.map(latlng => {
      return { location: latlng }
    })
    var directionInput = {
      origin: startLatLng,
      destination: finishLatLng,
      waypoints: waypointArray,
      travelMode: 'DRIVING',
      avoidTolls: true
    }

    var directionsService = new google.maps.DirectionsService()

    directionsService.route(
      directionInput,
      function(response, status) {
        if (status === 'OK') {
          console.log('talking to google')
          this.drawRoute(response, polylineColour, dayAndSurveyorUniqueCode)
        } else {
        }
      }.bind(this)
    )
  }

  drawRoute(
    google_directions,
    polylineColour = '#0088FF',
    dayAndSurveyorUniqueCode = null,
    tripOrDiversion = null
  ) {
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: polylineColour,
        strokeWeight: 4,
        strokeOpacity: 0.6
      }
    })
    directionsDisplay.setDirections(google_directions)
    if (dayAndSurveyorUniqueCode) {
      this.surveyRoutesByCode[dayAndSurveyorUniqueCode] = directionsDisplay
    } else {
      if (!tripOrDiversion) return
      this.renderedRoutes.push(directionsDisplay)
      this.renderedRoutesObject[tripOrDiversion.id] = directionsDisplay
    }
  }

  placeMarker(
    coords,
    symbol,
    instance_variable_marker_array,
    drop = true,
    setBounds = false,
    message = '',
    clickfunction = null,
    labelText = null,
    labelTextColour,
    trip = null
  ) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: symbol,
      animation: drop ? google.maps.Animation.DROP : null
      // label: {
      //   text: labelText,
      //   // color: 'blue',
      // }
    })
    if (labelText) marker.setLabel({ text: labelText, color: labelTextColour })

    if (message) this.addInfoWindow(marker, message)
    if (setBounds) {
      this.bounds.extend(coords)
      this.map.fitBounds(this.bounds)
    }
    if (clickfunction) marker.addListener('click', clickfunction)
    instance_variable_marker_array.push(marker)

    if (!trip) return

    if (this.renderedRoutesStartFinishMarkersObject[trip.id]) {
      this.renderedRoutesStartFinishMarkersObject[trip.id].push(marker)
    } else {
      this.renderedRoutesStartFinishMarkersObject[trip.id] = [marker]
    }
  }

  displayMarkersFromStore(
    marker_array_from_store,
    instance_variable_marker_array,
    colour = 'red',
    clickfunction
  ) {
    marker_array_from_store.forEach(coords => {
      this.placeMarker(
        coords,
        this.pinSymbol(colour),
        instance_variable_marker_array,
        false,
        true,
        '',
        clickfunction
      )
    })
    if (instance_variable_marker_array.length === 1) this.map.setZoom(10)
  }

  panToStreetView(coords) {
    var streetView = new google.maps.StreetViewPanorama(
      document.getElementById('map'),
      {
        position: coords.latLng,
        addressControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT
        },
        linksControl: false,
        panControl: true,
        enableCloseButton: false
      }
    )
    this.createAMapButton(
      this.returnToMap.bind(this, streetView),
      'LEFT_BOTTOM',
      'Return To Map',
      streetView
    )
  }

  returnToMap(streetView) {
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
    var projection = this.map.getProjection()
    //refer to the google.maps.Projection object in the Maps API reference
    var point = projection.fromLatLngToPoint(latLng)
    return point
  }

  getInfowindowOffset(marker) {
    var center = this.getPixelFromLatLng(this.map.getCenter())
    var point = this.getPixelFromLatLng(marker.getPosition())
    var offset = ''
    var quadrant = ''
    quadrant += point.y > center.y ? 'b' : 't'
    quadrant += point.x < center.x ? 'l' : 'r'
    if (quadrant == 'tr') {
      offset = new google.maps.Size(-70, 185)
    } else if (quadrant == 'tl') {
      offset = new google.maps.Size(70, 185)
    } else if (quadrant == 'br') {
      offset = new google.maps.Size(-70, 20)
    } else if (quadrant == 'bl') {
      offset = new google.maps.Size(70, 20)
    }
    return offset
  }

  addInfoWindow(marker, message) {
    // ensure listener is cleared
    // note we can create a div for info window
    var infoWindow = new google.maps.InfoWindow({
      content: `${message}`,
      maxWidth: 200,
      disableAutoPan: true
      // pixelOffset: this.getInfowindowOffset(marker)
    })

    marker.addListener('mouseover', function() {
      infoWindow.open(this.map, marker)
    })
    // google.maps.event.addListener(markhandleer,'click', function() {
    // alert('clicked');
    // });
    marker.addListener('mouseout', function() {
      infoWindow.close(this.map, marker)
    })
  }

  createAMapButton(
    listenerFunction,
    positionInCapitals,
    nameString,
    streetView
  ) {
    //if no streetView then normal map
    if (nameString == 'Branches') {
      if (this.branchesButtonExists) return
      this.branchesButtonExists = true
    }
    if (nameString == 'Full Screen') {
      if (this.fullScreenButtonExists) return
      this.fullScreenButtonExists = true
    }
    var button = document.createElement('div')
    this.styleButtonAndAddListener(
      button,
      this.map,
      listenerFunction,
      nameString,
      streetView
    )
    button.index = 1
    if (streetView) {
      streetView.controls[google.maps.ControlPosition[positionInCapitals]].push(
        button
      )
      //push to streetviewcontrols
    } else {
      this.map.controls[google.maps.ControlPosition[positionInCapitals]].push(
        button
      )
    }
  }

  styleButtonAndAddListener(
    button,
    map,
    listenerFunction,
    nameString,
    streetView
  ) {
    var backColor = streetView ? 'rgb(25,25,25)' : '#fff'
    var textColor = streetView ? '#fff' : 'rgb(25,25,25)'
    var controlUI = document.createElement('div')
    controlUI.style.backgroundColor = backColor
    controlUI.style.border = `2px solid ${backColor}`
    controlUI.style.borderRadius = '3px'
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
    controlUI.style.cursor = 'pointer'
    controlUI.style.margin = '12px'
    controlUI.style.textAlign = 'center'
    // controlUI.title = 'Click to recenter the map';
    button.appendChild(controlUI)
    // Set CSS for the control interior.
    var controlText = document.createElement('div')
    controlText.style.color = textColor
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
    controlText.style.fontSize = '10px'
    controlText.style.lineHeight = '24px'
    controlText.style.paddingLeft = '5px'
    controlText.style.paddingRight = '5px'
    controlText.innerHTML = nameString
    controlUI.appendChild(controlText)
    controlUI.addEventListener('click', listenerFunction)
  }

  setBranchesVisible() {
    switch (this.pathname) {
      case 'partload':
        this.branchesVisible = store.getState().common.branches_on_map_partload
        break
      case 'today':
        this.branchesVisible = store.getState().common.branches_on_map_today
        break
      case 'planner':
        this.branchesVisible = store.getState().common.branches_on_map_planner
        break
      case 'surveyor':
        this.branchesVisible = store.getState().common.branches_on_map_surveyor
        break
      case 'removal_from_store':
        this.branchesVisible = store.getState().common.branches_on_map_removal_from_store
        break
    }
  }

  setBranchListVisible() {
    switch (this.pathname) {
      case 'partload':
        this.branchListVisible = store.getState().common.branch_list_displayed_partload
        break
      case 'today':
        this.branchListVisible = store.getState().common.branch_list_displayed_today
        break
      case 'planner':
        this.branchListVisible = store.getState().common.branch_list_displayed_planner
        break
      case 'surveyor':
        this.branchListVisible = store.getState().common.branch_list_displayed_surveyor
        break
      case 'removal_from_store':
        this.branchListVisible = store.getState().common.branch_list_displayed_removal_from_store
        break
    }
  }

  handleBranchMarkerClick(branchId) {
    console.log(event)

    store.dispatch(setBranchIconClickedId(branchId))
    // store.dispatch(toggleBranchListDisplayed(this.pathname))
    //  this.setBranchListVisible()
    //  this.displayOrHideBranchList(this.branchListVisible)
  }

  //////////////////////////////////////////////////////////////
  handleFullScreenMapClick(event) {
    event.preventDefault()
    this.toggleLeftHandSideVisibility()
    store.dispatch(toggleFullScreenMap(this.pathname))
  }
  /////////////////////////////////////////////////////////////

  handleBranchesClick() {
    event.preventDefault()
    store.dispatch(toggleBranchesOnMap(this.pathname))
    this.setBranchesVisible()
    this.display_branches()
  }

  display_branches() {
    this.setBranchesVisible()
    // if(this.branchesVisible==undefined) return
    const branches = store.getState().common.all_branches
    if (!this.branchesVisible) {
      this.clearMarkers(this.branchesMarkers, true)
    } else {
      branches.forEach(branch => {
        this.placeMarker(
          branch.latlng,
          this.branchSymbol('#265eb7'),
          this.branchesMarkers,
          true,
          false,
          branch.address,
          this.handleBranchMarkerClick.bind(this, branch.id)
        )
      })
    }
  }

  // displayOrHideBranchList(){
  //     this.setBranchListVisible()
  //     this.hideOrShowElements(this.branchListVisible)
  //     this.setBranchListVisibility(!this.branchListVisible)
  // }

  hideOrShowElements(hide) {
    var domElements = this.getElementsLeftHandSide()
    domElements.forEach(element => {
      if (!element) return
      hide
        ? element.classList.add('hidden')
        : element.classList.remove('hidden')
    })
  }

  // setBranchListVisibility(hide){
  //    var branchListDiv = document.querySelector(`.branch-info-table-${this.pathname}`)
  //    hide ? branchListDiv.classList.add('hidden') : branchListDiv.classList.remove('hidden')
  // }

  toggleLeftHandSideVisibility() {
    var leftDiv
    var rightDiv
    var widthClassString = 'width50vw'
    var centerMap = this.map.getCenter()
    switch (this.pathname) {
      case 'planner':
        leftDiv = document.querySelector('.grid-item-planner-left')
        rightDiv = document.querySelector('.grid-item-planner-right')
        widthClassString = 'width40vw'
        break
      case 'today':
        leftDiv = document.querySelector('.grid-item-today-left')
        rightDiv = document.querySelector('.grid-item-today-right')
        break
      case 'partload':
        leftDiv = document.querySelector('.grid-item-partload-left')
        rightDiv = document.querySelector('.grid-item-partload-right')
        break
      case 'surveyor':
        leftDiv = document.querySelector('.grid-item-surveyor-left')
        rightDiv = document.querySelector('.grid-item-surveyor-right')
        break
      case 'removal_from_store':
        leftDiv = document.querySelector('.grid-item-ros-left')
        rightDiv = document.querySelector('.grid-item-ros-right')
        break
    }

    leftDiv.classList.toggle('hidden')
    if (leftDiv.classList.contains('hidden')) {
      rightDiv.classList.remove(widthClassString)
      rightDiv.classList.add('width100vw')
    } else {
      centerMap = this.map.getCenter()
      rightDiv.classList.remove('width100vw')
      rightDiv.classList.add(widthClassString)
    }
    google.maps.event.trigger(this.map, 'resize')
    this.map.setCenter(centerMap)
  }

  getElementsLeftHandSide() {
    switch (this.pathname) {
      case 'planner':
        var jobListEl = document.querySelector('.grid-item-joblist')
        var truckdayEl = document.querySelector('.grid-item-truck-day-view')
        var filterEl = document.querySelector('.grid-item-filter')
        return [jobListEl, truckdayEl, filterEl]
        break
      case 'today':
        var listTodayEl = document.querySelector('.grid-item-list-today')
        return [listTodayEl]
        break
      case 'removal_from_store':
        // var listRosEl = document.querySelector('.grid-item-list-today')
        return []
        break
      case 'partload':
        var postcodeEl = document.querySelector('.grid-item-postcode')
        var suggestionListEl = document.querySelector(
          '.grid-item-suggestion-list'
        )
        return [postcodeEl, suggestionListEl]
      case 'surveyor':
        var surveyorList = document.querySelector('.grid-item-survey-list')

        var surveyorDateFlicker = document.querySelector(
          '.grid-item-date-flicker'
        )

        // return([])
        return [surveyorList, surveyorDateFlicker]
        // return([ surveyorDateFlicker])
        break
    }
  }

  pinSymbol(color) {
    return {
      // path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      path:
        'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 1,
      scale: 1,
      labelOrigin: new google.maps.Point(0, -29)
    }
  }

  branchSymbol(color = 'red') {
    return {
      path:
        'M25.595,38.425h6.69c1.02,0,1.85-0.83,1.85-1.86v-13.52l3.49-1.81l-13.64-11.66l-13.61,11.66     l3.49,1.81v13.52c0,1.03,0.83,1.86,1.86,1.86h6.68v-5.9599h3.19V38.425z',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 0.4,
      origin: new google.maps.Point(0, 0), //origin point
      anchor: new google.maps.Point(24, 24) // offset point
    }
  }

  getTruckMarker(colour, leg = 'carry') {
    switch (leg) {
      case 'from_branch':
        return this.truckSymbol3(getComplementaryColour(colour), colour, 1, 1.5)
        // return this.truckSymbol3('black', colour, .2, 1.5)
        break
      case 'loading':
        return this.truckSymbol3(colour, 'black', 1, 0.3)
        break
      case 'carry':
        return this.truckSymbol3(colour, 'black', 1, 0.3)
        break
      case 'unloading':
        return this.truckSymbol3('white', colour, 0.3, 1.5)
        break
      case 'to_branch':
        return this.truckSymbol3('white', colour, 0.3, 1.5)
        break
    }
  }

  surveySymbol(colour = 'red') {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: colour,
      fillOpacity: 1,
      strokeColor: 'black',
      strokeWeight: 1,
      scale: 5
    }
  }

  carSymbol(
    fillColour,
    strokeColour = 'black',
    fillOpacityy = 1,
    strokeWeightt = 0.3
  ) {
    return {
      path:
        'M 236.54427,9.8485 C 220.2445,9.8485 204.45277,15.405415 191.41289,25.550223 L 97.337229,97.995127 L -135.0706,131.12201 C -150.90459,133.65817 -161.13586,149.44963 -156.32358,165.14237 L -132.57022,244.60846 L -86.188678,244.60846 C -90.823109,289.62242 -60.00389,319.2235 -20.679452,319.2235 C 18.644986,319.2235 49.844083,285.73585 44.829779,244.60846 L 425.19586,244.60846 C 419.65783,289.49008 452.23789,319.2235 490.70508,319.2235 C 529.17227,319.2235 561.22444,285.70267 556.21433,244.60846 L 651.04018,244.60846 C 659.88863,244.60846 667.48002,236.98237 667.48,227.63005 L 667.48,137.76012 C 667.48,129.20037 661.30023,122.08284 653.22799,120.97335 L 491.76774,97.995127 L 427.82125,32.635149 C 413.84999,18.051989 394.74442,10.165524 374.56372,9.8485 L 236.54427,9.8485 z M 304.42883,37.42226 L 378.62679,37.42226 C 389.64854,37.42226 399.73373,43.261111 405.94316,52.613356 L 424.25825,80.825395 C 428.78955,88.722668 423.85522,96.409133 415.38198,97.803717 L 304.42883,97.803717 L 304.42883,37.42226 z M 224.60508,37.549916 L 283.42586,37.549916 L 283.42586,97.803717 L 132.59212,97.803717 L 200.10167,45.97523 C 207.08728,40.585799 215.91189,37.549914 224.60508,37.549916 z',

      fillColor: getComplementaryColour(fillColour),
      // fillColor: 'white',
      // fillOpacity: 1,
      // fillOpacity: 0,
      fillOpacity: fillOpacityy,
      // strokeColor: 'black',
      strokeColor: strokeColour,
      // strokeWeight: .3,
      strokeWeight: strokeWeightt,
      scale: 0.04,
      // rotation: 180,
      // size: new google.maps.Size(800, 800), //size
      origin: new google.maps.Point(0, 0), //origin point
      anchor: new google.maps.Point(255, 165) // offset point
    }
  }

  truckSymbol3(
    fillColour,
    strokeColour = 'black',
    fillOpacityy = 1,
    strokeWeightt = 0.3
  ) {
    return {
      path:
        'M0 1530 l0 -460 835 0 835 0 0 460 0 460 -835 0 -835 0 0 -460z M1765 1647 c-3 -6 -4 -194 -3 -417 l3 -405 70 -2 c69 -3 70 -2 90 29 11 18 39 46 63 62 37 26 54 31 117 34 94 5 153 -20 198 -85 l31 -43 88 0 c81 0 91 2 113 25 24 23 25 28 25 169 0 80 -5 157 -10 172 -6 15 -70 123 -142 240 -108 176 -136 215 -161 223 -45 16 -476 15 -482 -2z m419 -44 c34 -5 43 -14 76 -66 21 -33 57 -97 81 -142 63 -119 71 -115 -216 -115 -290 0 -270 -12 -270 70 0 93 4 131 14 143 11 14 35 17 145 17 72 0 148 -3 170 -7z m314 -625 c18 -18 15 -103 -4 -119 -25 -21 -49 1 -52 49 -5 65 24 102 56 70z M153 990 c-36 -14 -56 -55 -50 -97 7 -42 56 -98 64 -74 11 29 76 91 117 110 57 28 152 28 205 1 41 -20 111 -94 111 -117 0 -11 99 -13 535 -13 l535 0 0 100 0 100 -747 -1 c-412 0 -758 -4 -770 -9z M300 888 c-133 -68 -112 -261 33 -308 70 -22 159 16 190 83 25 51 22 127 -6 168 -26 39 -97 79 -142 79 -17 0 -51 -10 -75 -22z m123 -27 c87 -33 108 -155 36 -215 -84 -71 -209 -14 -209 94 0 90 90 152 173 121z M2045 896 c-17 -7 -45 -29 -62 -49 -80 -91 -34 -232 87 -268 78 -23 164 24 196 107 15 40 16 53 5 93 -27 103 -133 158 -226 117z m136 -49 c66 -45 76 -139 19 -196 -53 -53 -127 -53 -180 0 -107 108 35 281 161 196z',
      fillColor: fillColour,
      // fillColor: 'white',
      // fillOpacity: 1,
      // fillOpacity: 0,
      fillOpacity: fillOpacityy,
      // strokeColor: 'black',
      strokeColor: strokeColour,
      // strokeWeight: .3,
      strokeWeight: strokeWeightt,
      scale: 0.01,
      rotation: 180,
      // size: new google.maps.Size(800, 800), //size
      origin: new google.maps.Point(0, 0), //origin point
      anchor: new google.maps.Point(1000, 1000) // offset point
    }
  }

  animateRoute(pathname) {
    var animation_speed = {
      today: store.getState().common.today_animation_speed,
      planner: store.getState().common.planner_animation_speed,
      partload: store.getState().common.partload_animation_speed,
      surveyor: store.getState().common.surveyor_animation_speed,
      removal_from_store: store.getState().common
        .removal_from_store_animation_speed
    }

    // store.getState().common.today_seconds_from_start
    var counter = 0
    var sliderSecondsFromStart = this.getSliderSecondsFromStart()
    for (var i = sliderSecondsFromStart; i < 43200; i = i + 600) {
      counter = Math.ceil(
        (i - sliderSecondsFromStart) / animation_speed[pathname]
      )
      var timeout = window.setTimeout(
        this.callPlaceMarker.bind(this, i, pathname),
        counter
      )
      this.animeFrames.push(timeout)
    }
  }

  pauseAnime() {
    this.animeFrames.forEach(timeout => {
      clearTimeout(timeout)
    })
  }

  callPlaceMarker(secondsFromStart, pathname) {
    store.dispatch(setSliderSecondsFromStart(secondsFromStart, pathname))
    this.animation.placeMarkers(secondsFromStart)
    // placeMarkers(secondsFromStart, pathname)
  }

  getSliderSecondsFromStart() {
    switch (this.pathname) {
      case 'today':
        return store.getState().common.today_seconds_from_start
        break
      case 'planner':
        return store.getState().common.planner_seconds_from_start
        break
      case 'partload':
        return store.getState().common.partload_seconds_from_start
        break
      case 'removal_from_store':
        return store.getState().common.removal_from_store_seconds_from_start
        break
    }
  }
}

export { MapObject, mapObjectInstances }
