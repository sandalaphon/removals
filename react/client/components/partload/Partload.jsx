import React from 'react'
import Gmap from '../Gmap'
import Postcode from './Postcode'
import SuggestionList from './SuggestionList'


class Partload extends React.Component{



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