import React from 'react'
import {Table, Button} from 'react-bootstrap'

class TruckDayView extends React.Component{

  constructor(props) {
    super(props)
    var image = <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo' draggable='true' onDragStart={this.drag.bind(this)} id='draggableButton'></img>
    this.state= {trucks: [1,2,3,4,5,6,7], image}
  }

  drop(event){
    event.preventDefault()
    event.target.classList.remove('drop-target')

    var data = event.dataTransfer.getData('text')
    console.log('data', event.dataTransfer.getData('text'))
    console.log("related target, event",  JSON.parse(data)[1])
    event.target.appendChild(document.getElementById(JSON.parse(data)[0]))
    // console.log("related target, event",  typeof data)
    // event.target.appendChild(document.getElementById(data))
  }

  handleDragEnter(event){
    event.preventDefault()
      var data = event.dataTransfer.getData('text')
      event.target.classList.add('drop-target')
      // var colorToUse=`${event.dataTransfer.getData('text')}`
      console.log('this color', event.dataTransfer.getData('text'))
      // event.target.style.background='hotpink'
      
      
    // if(!this.props.isInScheduler){
    //   this.props.setIsInScheduler()
    // }
    console.log('fuckloads of events', event.target.classList)
    console.log("related target, event",  event.target)
  }

  allowDrop(event){
    event.preventDefault()
  }

  drag(event){
    event.preventDefault()
    event.dataTransfer.setData('text', event.target.id)
  }

  handleDragExit(event){
    event.preventDefault()
    event.target.classList.remove('drop-target')
    // event.target.style.background=''
  }

  render(){

    var timeColumns = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

//////////here//////////

        var truckCalendar = timeColumns.map((time, timeIndex)=>{
          var timeString = `${time}:00`
          var timeColumnClassName = 'timecolumn'
          return(
            <div key={timeIndex} className={timeColumnClassName}>{

              this.state.trucks.map((truck, truckIndex)=>{
                var truckClassName=`cell truck${truckIndex} time${timeIndex+5}`
                var truckKey = `truck${truckIndex}time${timeIndex}`
                var headerKey = `header${timeIndex}`

                return(
                  
                  <div className={truckClassName} key={truckKey} onDragEnter={this.handleDragEnter.bind(this)} onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)} onDragLeave={this.handleDragExit.bind(this)}>
                   
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



export default TruckDayView
