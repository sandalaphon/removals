import React from 'react'
// import Gmap from '../Gmap'
import GmapPartLoad from './GmapPartLoad'
import Postcode from './Postcode'
import SuggestionList from './SuggestionList'
import SliderPartload from './SliderPartload'
import {mapObjectInstances} from '../../models/mapObject'
import TruckFlicker from '../TruckFlicker'
import BranchesInfo   from '../BranchesInfo'

class Partload extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      mapObject:null
    }
  }

  componentDidMount(){
    this.setState({mapObject:mapObjectInstances.partload})
  }

  render(){

    var branchStyle={
      gridArea:'leF',
      border: '4px solid green',
      height: '95vh',
      width:'50vw',
    }

    return(
      <div className='grid-partload' >
      <div className='grid-item-partload-right width50vw'>
      <GmapPartLoad/>
      <TruckFlicker/>
      <SliderPartload/>
      </div>

      <div className='grid-item-partload-left width50vw'>
      <Postcode />
      <SuggestionList/>
      <div 
      className = 'branch-info-table-partload hidden' 
      style={branchStyle}>
      <BranchesInfo/>
      </div>
      </div>
      </div>
      )
  }

}

export default Partload