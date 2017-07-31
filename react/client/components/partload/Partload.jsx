import React from 'react'
// import Gmap from '../Gmap'
import GmapPartLoad from './GmapPartLoad'
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


  return(
 <div className='grid-partload' ref="mapCanvas">
 <Postcode />
   <GmapPartLoad/>
   <SuggestionList/>
   <SliderPartload/>
   <TruckFlicker/>
 </div>
    )
}
}



export default Partload