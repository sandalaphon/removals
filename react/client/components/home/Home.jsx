import React from 'react'
import Geocoder from '../../models/geocoder'

class Home extends React.Component {

  render(){
    var newGeocoder =new Geocoder('EH74HU')
    newGeocoder.getLatLng()
    return(
      <p>We are Home</p>
      )
  }
}

export default Home
