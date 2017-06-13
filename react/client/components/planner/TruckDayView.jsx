import React from 'react'
import {Table, Button} from 'react-bootstrap'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class TruckDayView extends React.Component{

  constructor(props) {
    super(props)
    this.state = {trucks: [1,2,3,4,5,6,7], backgroundColour: ''}
  }

  handleDragEnter(event){

      event.preventDefault()
      console.log('current event.target', event.target)

    let cellId = event.target.id
    var newCellArray = []
    let hours = this.props.state.trips.currentDragJob.estimated_hours

    for(let i = 0; i<hours; i++){
      let startIndex=cellId.substring(event.target.id.length-2)
      let newStartIndex = +startIndex+i
      let newCellId=''
      if(newStartIndex<10){
        newCellId=`${cellId.substring(0, event.target.id.length-2)}0${newStartIndex}`
      }else{
        newCellId=`${cellId.substring(0, event.target.id.length-2)}${newStartIndex}`
      }
      newCellArray.push(newCellId)
    }
    ////////////////////////
    this.setState({backgroundColour: this.props.state.trips.currentDragJob.colour})
    ///////////////////////
    this.props.actions.setHighlightedCells(newCellArray)
    ///////////////////////
  }

  handleDragOver(event){
    event.preventDefault() 
  }

  handleDragLeave(event){
    event.preventDefault()
  }

  drop(event){
    event.preventDefault()

    this.props.actions.setDroppedCells({
      cells: this.props.state.trips.highlightedCells, 
      colour: this.state.backgroundColour
    })

    var data = event.dataTransfer.getData('text')
    event.target.appendChild(document.getElementById(JSON.parse(data)[0]))
  }


  render(){

  var timeColumns = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

  //////////////////MAP START///////

  var truckCalendar = timeColumns.map((time, timeIndex)=>{
    var timeString = `${time}:00`
    var timeColumnClassName = 'timecolumn'
    return(
    <div key={timeIndex} className={timeColumnClassName}>{

    this.state.trucks.map((truck, truckIndex)=>{

    var truckClassName=`cell truck${truckIndex} time${timeIndex+5}`
    var cellId =''

    if(timeIndex.toString().length<2){
    cellId = `truck${truckIndex}time0${timeIndex}`
    }else{
    cellId = `truck${truckIndex}time${timeIndex}`
    }
    var inlineStyle = ''

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    if(this.props.state.trips.highlightedCells.includes(cellId)){
    var inlineStyle = {border: `2px dashed ${this.state.backgroundColour}`}

    }else{inlineStyle={border: ''}}

    ///////////////////////////////////////////////////////////////////////////////////////////////

    if(this.props.state.trips.droppedCells.length){
    this.props.state.trips.droppedCells.forEach((object)=>{
    if(object.cells.includes(cellId)){
    inlineStyle = {backgroundColor: object.colour, opacity: 0.5}

    }
    })
    }

    var truckKey = `truck${truckIndex}time${timeIndex}`
    var headerKey = `header${timeIndex}`

    return(
    <div 
    className={truckClassName} 
    key={truckKey}  
    id={cellId} 
    style={inlineStyle} 
    onDrop={this.drop.bind(this)} 
    onDragOver={this.handleDragOver.bind(this)} 
    onDragLeave={this.handleDragLeave.bind(this)} 
    onDragEnter={this.handleDragEnter.bind(this)} >
    </div>
    )
    })

    }</div>
    )
  })

  ///////////// MAP END ///////////////////////

  truckCalendar.forEach((columnArray, index)=>{
  var timeString = `${index+5}:00`

  return columnArray.props.children.unshift(<div className='cell'>{timeString}</div>)
  })

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


    return(
      <div className='grid-item-truck-day-view'>
       {truckCalendar}
      </div>
  )
  }

}

const mapDispatchToProps=(dispatch)=>({
actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({state})
export default connect(mapStateToProps, mapDispatchToProps)(TruckDayView)


