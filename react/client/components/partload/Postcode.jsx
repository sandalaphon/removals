import React from 'react'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Geocoder from '../../models/geocoder.js'
// import {mapObject} from '../planner/Gmap'


class Postcode extends React.Component{

  constructor(props) {
      super(props);
      // this.state = {
      //   collectionValue: '',
      //   deliveryValue: ''
      // };
      
  }

  handleCollectionSubmit(event){
    event.preventDefault()
    var geocoder = new Geocoder()

    var partload_collection_coords = geocoder.getLatLng(this.props.trips.partload_collection_postcode, this.props.actions.addMarkerToPartloadMarkerArray)
    if(this.props.trips.partload_delivery_postcode){
      var partload_delivery_coords = geocoder.getLatLng(this.props.trips.partload_delivery_postcode, this.props.actions.addMarkerToPartloadMarkerArray)
    }
    
    console.log("eventvalue",event.target.value)
    console.log("eventvalue",partload_collection_coords ,partload_delivery_coords)
  }

  handleCollectionChange(event){
    this.setState({collectionValue: event.target.value})
    this.props.actions.setPartloadCollectionPostcode(event.target.value)
  }

  handleDeliveryChange(event){
    this.props.actions.setPartloadDeliveryPostcode(event.target.value)
  }

  render(){
    var stored_delivery_value = ''
    if(this.props.trips.partload_delivery_postcode){
      stored_delivery_value = this.props.trips.partload_delivery_postcode
    }
    var stored_collection_value = ''
    if(this.props.trips.partload_collection_postcode){
      stored_collection_value = this.props.trips.partload_collection_postcode
    }
    return(
      <div className='grid-item-postcode'>
        <form onSubmit={this.handleCollectionSubmit.bind(this)}>
          <label htmlFor='collection_postcode'>Please Enter Collection Postcode Or Address:  
          </label>
          <br/>
          <input value = {stored_collection_value}
                 type='text' 
                 onChange={this.handleCollectionChange.bind(this)}
                 ref='collection_postcode' 
                 id='collection_postcode' 
                 placeholder='collection postcode or address' >
          </input>
          <br/>
          <label htmlFor='delivery_postcode'>Please Enter Delivery Postcode Or Address:
          </label>
          <br/>
          <input value = {stored_delivery_value}
                 type='text' 
                 onChange={this.handleDeliveryChange.bind(this)}
                 ref='delivery_postcode' 
                 id='delivery_postcode' 
                 placeholder='delivery postcode or address'>
          </input>
          <br/>
          <input type='submit'>
          </input>
        </form>
      </div>
      )
  }

}

const mapDispatchToProps=(dispatch)=>({
  actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({trips: state.trips})
export default connect(mapStateToProps, mapDispatchToProps)(Postcode)