import React from 'react'
import Gmap from '../planner/Gmap'
import Postcode from './Postcode'


class Partload extends React.Component{



render(){
 
  // console.log('hello', Gmap.mapObject)
  return(
 <div className='grid-partload' ref="mapCanvas">
 <Postcode />
   <Gmap/>
 </div>
    )
}
}



export default Partload