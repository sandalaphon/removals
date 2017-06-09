import React from 'react'

class JobList extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={
      
//     }
//   }
render(){

    const jobs= this.props.all_trips.map((job,index)=>{
     return <li>{job.moveware_code}</li>
    })
  
  
if(jobs){
  return(
    <div className='grid-item-joblist'>
    <ul>{jobs}
    </ul>
    </div>
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