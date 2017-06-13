import React from 'react'

class JobList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      colours: ['Black', 'Blue', 'DarkGreen', 'DarkMagenta',  'DimGrey', 'GoldenRod', 'Tomato', 'YellowGreen', 'SlateBlue', 'Sienna', 'Plum', 'HotPink']
    }
  }
//   constructor(props){
//     super(props)
//     this.state={
// 'DarkTurqoise',
//     }
//   }
drag(event){
  console.log('this.props.all_trips', this.props.all_trips, event.relatedTarget)
   
  event.dataTransfer.setData('text', JSON.stringify([event.target.id, this.props.all_trips[event.target.id], this.state.colours[event.target.id]]))

  this.props.setCurrentDragJob({colour: this.state.colours[event.target.id], estimated_hours: this.props.all_trips[event.target.id].estimated_hours})



  // event.dataTransfer.items

  // if(event.target.classList){
    // event.target.classList.remove('drop-target')
   
  // }
    }


// getAppropriateImage(){
//   var imageToUse = ''
//   if(this.props.isInScheduler){
//     imageToUse = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-animals/012557-glossy-black-icon-animals-animal-bird11-sc48.png'
//   }else{
//     imageToUse = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo'
//   }
//   return imageToUse
//   // var bird = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-animals/012557-glossy-black-icon-animals-animal-bird11-sc48.png'
//   // var truck = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo'
// }

jobs(){
  console.log('this.props.all_trips',this.props.all_trips)
  return this.props.all_trips.map((job,index)=>{
    var arrival_time = job.arrival_time
    var inlineStyleColor = {color: this.state.colours[index]}
    // var image = <div draggable='true' tabIndex='0' onDragStart={this.drag.bind(this)}><img  className="truckimage" src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo' id={index}></img></div>
    // var image = <div draggable='true' onDragStart={this.drag.bind(this)}><i  className="fa fa-truck truckimage" aria-hidden="true" id={index}></i></div>
    var image = <i draggable='true' onDragStart={this.drag.bind(this)} className="material-icons md-48 truckimage" style={inlineStyleColor} id={index}>local_shipping</i>
    // var image = <div draggable='true' onDragStart={this.drag.bind(this)}><img className="truckimage" src = 'images/truckimage.png' style={inlineStyleColor} id={index}></img></div>

   return (<tr key={index}>
      <td ><button id={job.id}>Expand</button></td>
      <td >{job.client_name}</td>
      <td >{image}</td>
      <td >'colour code here'</td>
      <td >{job.volume}</td>
      <td >{job.men_requested}</td>
      <td >{job.arrival_time}</td>
      <td >'notes hover'</td>
      <td> {job.estimated_hours}</td>
      
      <td >'programatic registation numberSSSS</td>
      </tr>)


 })
}

render(){ 

  if(this.props.all_trips){
    return(
      <table className='grid-item-joblist'>
      <tbody>
      <tr>
      <th>Expand</th>
      <th>Client Name</th>
      <th>Drag Icon</th>
      <th>Colour</th>
      <th>Volume</th>
      <th>Men Requested</th>
      <th>Start</th>
      <th>Notes</th>
      <th>Estimated Hours</th> 
      <th>Allocated Trucks</th>
      </tr>
      
      {this.jobs()}
      </tbody>
      </table>
      )
  }else{
    return(
      <div className='grid-item-joblist'>
      No Jobs Yet
      </div>
      )
  }
}
}

export default JobList