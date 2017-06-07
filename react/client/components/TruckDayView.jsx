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
    console.log(event.target)
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
        console.log('child', columnArray.props.children)
        return columnArray.props.children.unshift(<div className='cell'>{timeString}</div>)
       })


    //   var tableHeaderDivs = []
    //   for(var i = 0; i<numberCells.length; i++){
    //     var tableHeaderkey = `tableHeader${i}`
    //     var time = `${i}:00`
    //    tableHeaderDivs.push(<div  key={tableHeaderkey} className='cell'>{time}</div>)
    //   }
    //   console.log(tableHeaderDivs)
    //   var tableHeader= <div className='trow'>{tableHeaderDivs}</div> 








    // var table = this.state.trucks.map((truck, index)=>{
    //   var rowIndex = `row${index} trow`
     
    //   return( 


    //     <div key={index}   className={rowIndex}>{
    //       numberCells.map((timeCell, cellIndex)=>{

    //         var keyValue = `row${index}col${cellIndex}`
    //         var smallerKeyValue = `${index}${cellIndex}`
    //         var cell = `row${index}+col${cellIndex} cell col${cellIndex}`
            
    //         return(                                 //////////////////
             
    //           <div  key={keyValue} className={cell} onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)} >{cell}</div>
            
    //           )                                       ///////////////
    //       })
    //     }  

    //     </div>
       
    //     )                                               ////////
    // })

    console.log(table)

     

    return(
      <div className='truckDayView-grid-item'>
 
      {table}
   
      </div>
      )
  }
}

//////////here

export default TruckDayView
// <th>7:00</th>
// <th>8:00</th>
// <th>9:00</th>
// <th>10:00</th>
// <th>11:00</th>
// <th>12:00</th>
// <th>13:00</th>
// <th>14:00</th>
// <th>15:00</th>
// <th>16:00</th>
// <th>17:00</th>
// <th>18:00</th>
// <th>19:00</th>


//////////here
    // var table = this.state.trucks.map((truck, index)=>{
      // return(                                           //////////

      //   <tr>{
      //     numberCells.map((cell, cellIndex)=>{
      //       var keyValue = `row${index}col${cellIndex}`

      //       return(                                 //////////////////
      //         <td>
    //           <div key={keyValue} className="truck-day-time-cell" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)} >{keyValue}</div>
    //           </td>
    //           )                                       ///////////////
    //       })
    //     }                
    //     </tr>

    //     )                                               ////////
    // })



    // return(
    //   <div className='truck_day_table table-responsive'>
    //   <table  className="">
    //   <thead>
    //   <tr>
    //   <th>7:00</th>
      // <th>8:00</th>
      // <th>9:00</th>
      // <th>10:00</th>
      // <th>11:00</th>
      // <th>12:00</th>
      // <th>13:00</th>
      // <th>14:00</th>
      // <th>15:00</th>
      // <th>16:00</th>
      // <th>17:00</th>
      // <th>18:00</th>
      // <th>19:00</th>
      // </tr>
      // </thead>
      // <tbody>
      // {table}
      // </tbody>
      
//       </table>
//       </div>
//       )
//   }
// }
/////////////here
// <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo' draggable='true' onDragStart={this.drag.bind(this)} id='draggableButton' width="40" height="20"></img>

      //////////////////////////////////////
      // var mapCells = 
      //   numberCells.map((cell, index)=>{
      //     return(
      //     <td>
      //     <div className="truck-day-time-cell" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)} >Hello</div>
      //     </td>
      //     )
      //   })
      
/////////////////////////////////////////////////////////
