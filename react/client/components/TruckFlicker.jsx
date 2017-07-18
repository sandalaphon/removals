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
    var visibleJourneys = this.props.all_trips ? 
    this.props.all_trips.length : 0
 
    return (
      <Pagination
      className = "grid-item-truck-flicker"
      prev
      next
      first
      last
      ellipsis
      boundaryLinks
      items={visibleJourneys}
      maxButtons={4}
      activePage={this.state.activePage}
      onSelect={this.handleSelect.bind(this)}
      />
    );

  }

}

export default TruckFlicker
