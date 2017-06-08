class Geocoder{
constructor(){
  
  this.geocoder = new google.maps.Geocoder()
  this.delivery_LatLng=null
  this.collection_LatLng=null
  

}
getLatLng(postcode){
  this.geocoder.geocode({address: postcode}, (results, status)=>{
    if(status===google.maps.GeocoderStatus.OK){
      console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
      // this.latLng ={lat: results[0].geometry.location.lat(),lng: results[0].geometry.location.lng()}
      // setLatLngCallback()
    }else{
      console.log(status)
    }
  })

}

setDeliveryLatLng(postcode, json, callback){
  this.geocoder.geocode({address: this.postcode}, (results, status)=>{
    if(status===google.maps.GeocoderStatus.OK){
      console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
      this.delivery_LatLng ={lat: results[0].geometry.location.lat(),lng: results[0].geometry.location.lng()}
      this.adjustJsonAndSendToRails(json, callback)
     
    }else{
      console.log(status)
    }
  })

}


setCollectionLatLng(postcode, json, callback){
  this.geocoder.geocode({address: this.postcode}, (results, status)=>{
    if(status===google.maps.GeocoderStatus.OK){
      console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
      this.collection_LatLng ={lat: results[0].geometry.location.lat(),lng: results[0].geometry.location.lng()}
      this.setDeliveryLatLng(json.deliveryPostCode, json, callback)
     
    }else{
      console.log(status)
    }
  })

}

adjustJsonAndSendToRails(json, callback){
  var jsonForRails=json
  jsonForRails['collection_latlng']=`${JSON.stringify(this.collection_LatLng)}`
  jsonForRails['delivery_latlng']=`${JSON.stringify(this.delivery_LatLng)}`
  console.log('this.collection_LatLng',this.collection_LatLng)
  console.log('jsonForRails',jsonForRails)
  callback(jsonForRails)
}

setLatLngAndSendToRailsDb(json, callback){
 this.setCollectionLatLng(json.collectionPostCode, json, callback)
 // this.setDeliveryLatLng(json.deliveryPostCode)

}






// addLatLngToJson(latlngs, json, railsCallback){
//   var receivedJson = json
//   receivedJson[collection_LatLng]={lat: collectionLatitude, lng: collectionLongitude}
//   receivedJson[delivery_LatLng]={lat: deliveryLatitude, lng: deliveryLongitude}

// }
}
export default Geocoder

// getAddressFromGeoCode: function (addressId, callback) {
//   var geoCoder = new google.maps.Geocoder()
//   geoCoder.geocode({'placeId': addressId}, function (results, status) {
//     if (status === 'OK') {
//       if (results[0]) {
//         var streetName = results[0].formatted_address
//       } else {
//         window.alert('No results found')
//       }
//     } else {
//       window.alert('Geocoder failed due to: ' + status + '\nDont click in the sea!')
//     }
//     callback(streetName)
//   })
// },

// {
//  address: string, /////////////////
//  location: LatLng,
//  placeId: string,
//  bounds: LatLngBounds,
//  componentRestrictions: GeocoderComponentRestrictions,
//  region: string
// }
