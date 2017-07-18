import React from 'react'
import Gmap from '../Gmap'
import Postcode from './Postcode'
import SuggestionList from './SuggestionList'
import {mapObjectInstances} from '../../models/mapObject'



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
 </div>
    )
}
}



export default Partload