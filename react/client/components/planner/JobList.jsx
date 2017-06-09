import React from 'react'

class JobList extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={

//     }
//   }
jobs(){
  return this.props.all_trips.map((job,index)=>{
 return <li key={index}>{job.moveware_code}</li>
})
}

render(){ 
  
if(this.props.all_trips){
  return(
    <div className='grid-item-joblist'>
    <ul>{this.jobs()}
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