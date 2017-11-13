class Geocoder {
  constructor() {
    this.geocoder = new google.maps.Geocoder()
    this.delivery_LatLng = null
    this.collection_LatLng = null
    this.googleDirectionsService = new google.maps.DirectionsService()
  }
  getLatLng(postcode, callback, callback2 = null) {
    console.log('receive postcode', postcode)
    this.geocoder.geocode({ address: postcode }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        // console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
        var coords = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        }
        console.log(coords)
        callback(coords, postcode)

        if(callback2){
          console.log('callback2', coords, callback2)
          callback2(coords)
        }
        // this.latLng ={lat: results[0].geometry.location.lat(),lng: results[0].geometry.location.lng()}
        // setLatLngCallback()
      } else {
        alert('postcode is not valid', status)
        console.log(status)
      }
    })
  }

  getLatLngPromise(postcode) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address: postcode }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          // console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
          console.log({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          })
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          })

          // this.latLng ={lat: results[0].geometry.location.lat(),lng: results[0].geometry.location.lng()}
          // setLatLngCallback()
        } else {
          reject(status)
        }
      })
    })
  }

  setLatLngAndSendToRailsDb(json, callback) {
    console.log('json', json)
    this.setCollectionLatLng(json.collection_postcode, json, callback)
  }

  setCollectionLatLng(postcode, json, callback) {
    console.log('postcode', postcode)
    this.geocoder.geocode({ address: postcode }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng(),
        )
        this.collection_LatLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        }
        this.setDeliveryLatLng(json.delivery_postcode, json, callback)
      } else {
        console.log(status)
      }
    })
  }

  setDeliveryLatLng(postcode, json, callback) {
    this.geocoder.geocode({ address: postcode }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng(),
        )
        this.delivery_LatLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        }
        this.adjustJsonAndSendToRails(json, callback)
      } else {
        console.log(status)
      }
    })
  }

  adjustJsonAndSendToRails(json, callback) {
    var jsonForRails = json
    jsonForRails['collection_latlng'] = JSON.stringify(this.collection_LatLng)
    jsonForRails['delivery_latlng'] = JSON.stringify(this.delivery_LatLng)
    callback(jsonForRails)
  }
}
export default Geocoder
