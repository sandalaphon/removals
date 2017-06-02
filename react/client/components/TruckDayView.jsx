import React from 'react'
import {Table, Button} from 'react-bootstrap'

class TruckDayView extends React.Component{
  constructor(props) {
    super(props)
    var image = <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo' draggable='true' onDragStart={this.drag.bind(this)} id='draggableButton' width="40" height="20"></img>
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
    var numberCells = [1,2,3,4,5,6,7,8,9,10,11,12,13]

//////////here//////////
    var table = this.state.trucks.map((truck, index)=>{
      var rowIndex = `row${index} trow`

      return(                                           //////////
        
        <div className={rowIndex}>{
          numberCells.map((cell, cellIndex)=>{
            // var widthNum = 99/numberCells.length
            // var widthVh = `${widthNum}vh`
            var inlineStyle = {justify-content: 'space-around'}
            var width = {width: widthNum+'vh'}
            var keyValue = `row${index}col${cellIndex}`
            var cell = `row${index}+col${cellIndex} cell`
            
            return(                                 //////////////////
             
              <div style = {inlineStyle} key={keyValue} className={cell} onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)} >{keyValue}</div>
             
              )                                       ///////////////
          })
        }  

        </div>


        )                                               ////////
    })



    return(
      <div className='truck_day_table table-responsive'>
      <table  className="">
      <thead>
      <tr>
      <th>7:00</th>
      <th>8:00</th>
      <th>9:00</th>
      <th>10:00</th>
      <th>11:00</th>
      <th>12:00</th>
      <th>13:00</th>
      <th>14:00</th>
      <th>15:00</th>
      <th>16:00</th>
      <th>17:00</th>
      <th>18:00</th>
      <th>19:00</th>
      </tr>
      </thead>
      <tbody>
      {table}
      </tbody>
      
      </table>
      </div>
      )
  }
}

//////////here

export default TruckDayView
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
