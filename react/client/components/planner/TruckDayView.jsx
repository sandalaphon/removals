import React from 'react'
import {Table, Button} from 'react-bootstrap'
import * as actionCreators from '../../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// isInScheduler={this.props.state.trips.isInScheduler} setIsInScheduler={this.props.actions.setIsInScheduler} currentDragJob={this.props.state.trips.currentDragJob}

class TruckDayView extends React.Component{

  constructor(props) {
    super(props)
    // var image = <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo' draggable='true' onDragStart={this.drag.bind(this)} id='draggableButton'></img>
    this.state = {trucks: [1,2,3,4,5,6,7], backgroundColour: '', highlightedCells: [], droppedCells: []}
    this.clearHightlightedCells = this.clearHightlightedCells.bind(this)
  }

  drop(event){
    event.preventDefault()

    // event.target.style.background=''
    // event.target.classList.remove('drop-target')

    this.setState((prevState, props)=>{
      // console.log('prevState', prevState.droppedCells)
      return {droppedCells: prevState.droppedCells.concat({colour: this.state.backgroundColour, cells: this.state.highlightedCells})}  
    }) 

    // this.setState({droppedCells: this.state.droppedCells.concat({colour: this.state.backgroundColour, cells: this.state.highlightedCells})}, function(){
    //   this.setState({highlightedCells: []})
    //   console.log(this.state.droppedCells)
    // })
      // console.log('prevState', prevState.droppedCells)
      // return {droppedCells: prevState.droppedCells.concat({colour: this.state.backgroundColour, cells: this.state.highlightedCells})}  
    
    
 

    var data = event.dataTransfer.getData('text')
    // console.log('data', event.dataTransfer.getData('text'))
    // console.log("related target, event",  JSON.parse(data)[1])
    event.target.appendChild(document.getElementById(JSON.parse(data)[0]))
    // console.log("related target, event",  typeof data)
    // event.target.appendChild(document.getElementById(data))
  }

  clearHightlightedCells(callback){
    // this.setState({highlightedCells: []})
    callback()
  }

 handleDragEnter(event){
  this.setState({highlightedCells: []})
  event.preventDefault()

  this.clearHightlightedCells(()=>{
    let cellId = event.target.id

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
      this.setState((prevState)=>{
        return {highlightedCells: prevState.highlightedCells.concat([newCellId])}  
      })
    }
   
    this.setState({backgroundColour: this.props.state.trips.currentDragJob.colour})
    console.log('before this.state.highlightedCells', this.state.highlightedCells)
    
    console.log('after this.state.highlightedCells', this.state.highlightedCells)

  })

  
  

}

handleDragOver(event){
    event.preventDefault()


      // event.target.style.background=this.props.state.trips.currentDragJob.colour
      // event.target.id
      // let cellId = event.target.id

      // let hours = this.props.state.trips.currentDragJob.estimated_hours
      // for(let i = 0; i<hours; i++){
      //   let startIndex=cellId.substring(event.target.id.length-2)
      //   let newStartIndex = +startIndex+i
      //   let newCellId=''
      //   if(newStartIndex<10){
      //     newCellId=`${cellId.substring(0, event.target.id.length-2)}0${newStartIndex}`
      //   }else{
      //     newCellId=`${cellId.substring(0, event.target.id.length-2)}${newStartIndex}`
      //   }
      //   this.state.highlightedCells.push(newCellId)
      // }
      // this.setState({backgroundColour: this.props.state.trips.currentDragJob.colour})
        // let currentElement = document.getElementById(newCellId)
        // currentElement.style.background=this.props.state.trips.currentDragJob.colour
        // currentElement.style.background=this.props.state.trips.currentDragJob.colour
        // currentElement.classList.add('drop-target')

      

      

      // var highlightedCells = []

      // this.setState({highlightedCells})
   
  }

  // handleDragOver(event){
  //   event.preventDefault()
  // }

  // drag(event){
  //   event.preventDefault()
  //   console.log('event.target.id', event.target.id)
  //   event.dataTransfer.setData('text', event.target.id)
  // }

  handleDragLeave(event){
    event.preventDefault()
    // event.target.classList.remove('drop-target')
    // event.target.style.background=''

    // let cellId = event.target.id
    // let hours = this.props.state.trips.currentDragJob.estimated_hours
    // for(let i = 0; i<hours; i++){
    //   let startIndex=cellId.substring(event.target.id.length-2)
    //   let newStartIndex = +startIndex+i
    //   console.log(newStartIndex)
    //   let newCellId=''
    //   if(newStartIndex<10){
    //     newCellId=`${cellId.substring(0, event.target.id.length-2)}0${newStartIndex}`
    //   }else{
    //     newCellId=`${cellId.substring(0, event.target.id.length-2)}${newStartIndex}`
    //   }
      

    //   console.log('newCellId', newCellId, startIndex)
    //   let currentElement = document.getElementById(newCellId)
    //   currentElement.style.background=''

  // }
}

  render(){
    console.log('this.state.droppedCells', this.state.droppedCells)
    var timeColumns = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

//////////here//////////

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
                if(this.state.highlightedCells.includes(cellId)){
                  // inlineStyle = {backgroundColor: this.state.backgroundColour}
                  // inlineStyle = {backgroundColor: 'hotpink'}
                  var inlineStyle = {border: `1px dashed ${this.state.backgroundColour}`}
                   // borderHighlight = {border: 3px dashed this.state.backgroundColour; z-index: 99}/////////////////
                   // border=borderHighlightStyle
                }else{inlineStyle={border: ''}}
                // {backgroundColour = {backgroundColor: ''}}
///////////////////////////////////////////////////////////////////////////////////////////////
              if(this.state.droppedCells.length){
                this.state.droppedCells.forEach((object)=>{
                  if(object.cells.includes(cellId)){
                    inlineStyle = {backgroundColor: object.colour, opacity: 0.5}

                  }
                })
              }
                
                // let cellId = `truck${truckIndex}time${timeIndex+5}`
                var truckKey = `truck${truckIndex}time${timeIndex}`
                var headerKey = `header${timeIndex}`

                return(
                  
                  <div className={truckClassName} key={truckKey} 
                  //onDragEnter={this.handleDragEnter.bind(this)} 
                  id={cellId} style={inlineStyle} onDrop={this.drop.bind(this)} onDragOver={this.handleDragOver.bind(this)} onDragLeave={this.handleDragLeave.bind(this)} onDragEnter={this.handleDragEnter.bind(this)} >
                   
                  </div>
                  )
              })

            }</div>
            )
        })

        truckCalendar.forEach((columnArray, index)=>{
        var timeString = `${index+5}:00`
   
        return columnArray.props.children.unshift(<div className='cell'>{timeString}</div>)
       })






     

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


