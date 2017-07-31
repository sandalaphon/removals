import React from 'react'
import Gmap from '../Gmap'
import Postcode from './Postcode'
import SuggestionList from './SuggestionList'
import SliderPartload from './SliderPartload'
import {mapObjectInstances} from '../../models/mapObject'
import TruckFlicker from '../TruckFlicker'



class Partload extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      mapObject:null
    }
  }

componentDidMount(){
  console.log('partload mount')
    this.setState({mapObject:mapObjectInstances.partload})
}


render(){

 

  // console.log('hello', Gmap.mapObject)
  return(
 <div className='grid-partload' ref="mapCanvas">
 <Postcode />
   <Gmap/>
   <SuggestionList/>
   <SliderPartload/>
   <TruckFlicker/>
 </div>
    )
}
}



export default Partload