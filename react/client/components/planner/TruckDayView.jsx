import React from 'react'
import {Table, Button} from 'react-bootstrap'

class TruckDayView extends React.Component{

  constructor(props) {
    super(props)
    var image = <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo' draggable='true' onDragStart={this.drag.bind(this)} id='draggableButton'></img>
    this.state= {trucks: [1,2,3,4,5,6], image}
  }

  drop(event){
    event.preventDefault()

    var data = event.dataTransfer.getData('text')
    event.target.appendChild(document.getElementById(data))
  }

  allowDrop(event){
    event.preventDefault()
  }

  drag(event){
    event.dataTransfer.setData('text', event.target.id)
  }

  render(){

    var timeColumns = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

//////////here//////////

        var table = timeColumns.map((time, timeIndex)=>{
          var timeString = `${time}:00`
          var timeColumnClassName = 'timecolumn'
          return(
            <div key={timeIndex} className={timeColumnClassName}>{

              this.state.trucks.map((truck, truckIndex)=>{
                var truckClassName=`cell truck${truckIndex} time${timeIndex}`
                var truckKey = `truck${truckIndex}time${timeIndex}`
                var headerKey = `header${timeIndex}`

                return(
                  
                  <div className={truckClassName} key={truckKey} onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)}>
                   
                  </div>
                  )
              })

            }</div>
            )
        })

        table.forEach((columnArray, index)=>{
        var timeString = `${index}:00`
   
        return columnArray.props.children.unshift(<div className='cell'>{timeString}</div>)
       })






     

    return(

      <div className='grid-item-truck-day-view'>
 
      {table}
   

      </div>
      )
  }
}



export default TruckDayView
