import React from 'react'
import Nav from './Nav'
import {Link} from 'react-router'
import LoginBox from './LoginBox'

class Layout extends React.Component {
render(){
 
 var toDisplay = 
 <div>
 <Nav/>
 {this.props.children}

 </div>

 if(1===1){
  toDisplay =
  <div>
  <LoginBox/>
  </div>
 }
  return(
  <div>
   {toDisplay}
   </div>
    )
}
}

export default Layout