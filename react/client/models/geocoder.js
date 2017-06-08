class Geocoder{
constructor(postcode){
  this.postcode = postcode
  this.geocoder = new google.maps.Geocoder()
}
getLatLng(){
  this.geocoder.geocode({address: this.postcode}, (results, status)=>{
    if(status===google.maps.GeocoderStatus.OK){
      console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
    }else{
      console.log(status)
    }
  })
}
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
