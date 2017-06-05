import React from 'react'
import {Pagination} from 'react-bootstrap'

class TruckFlicker extends React.Component {
  

   constructor(...args) {
       super(...args);
       this.image =  <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG19KHC5X8zluprjBG3bDahqriPbAMzHFOEHUexlOO74ZIyvotL4t0MBo'  width="40" height="20"></img>

       this.state = {activePage: 1, image: this.image};

     }

     handleSelect(eventKey) {
         this.setState({
           activePage: eventKey
         });
       }


  render(){
    return (
    <div className= 'truck_flicker'>
      <Pagination
        className = "truck-pagi"
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={8}
        maxButtons={8}
        activePage={this.state.activePage}
        onSelect={this.handleSelect.bind(this)} />
    </div>
        );
  }
}

export default TruckFlicker

// buttonComponentClass="truck-button"
// prev