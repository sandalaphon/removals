import React from 'react'

class JobList extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={

//     }
//   }
drag(event){
   
  event.dataTransfer.setData('text', event.target.id)
  
}

getAppropriateImage(){
  var imageToUse = ''
  if(this.props.isInScheduler){
    imageToUse = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-animals/012557-glossy-black-icon-animals-animal-bird11-sc48.png'
  }else{
    imageToUse = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo'
  }
  return imageToUse
  // var bird = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-animals/012557-glossy-black-icon-animals-animal-bird11-sc48.png'
  // var truck = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo'
}

jobs(){
  console.log('this.props.all_trips',this.props.all_trips)
  return this.props.all_trips.map((job,index)=>{
    var image = <div draggable='true' onDragStart={this.drag.bind(this)}><img  className="truckimage" src = {this.getAppropriateImage.call(this)} id={index}></img></div>
   return (<tr key={index}>
      <td ><button id={job.id}>Expand</button></td>
      <td >{job.client_name}</td>
      <td >'colour code here'</td>
      <td >{job.volume}</td>
      <td >{job.men_requested}</td>
      <td >job.arrival_time</td>
      <td >'notes hover'</td>
      <td> {job.estimated_hours}</td>
      <td >{image}</td>
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
      <th>Name</th>
      <th>Colour</th>
      <th>Volume</th>
      <th>Men Requested</th>
      <th>Start</th>
      <th>Notes</th>
      <th>Estimated Hours</th>
      <th>Drag Icon</th>
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