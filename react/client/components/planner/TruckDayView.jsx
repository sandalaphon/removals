import React from 'react'
import update from 'react/lib/update';
//import {Table, Button} from 'react-bootstrap'
//import * as actionCreators from '../../actions/actionCreators'
//import {bindActionCreators} from 'redux'
//import {connect} from 'react-redux'
//import flow from 'lodash/flow';
import { DragSource, DropTarget } from 'react-dnd';
import TruckRow from './TruckRow'

class TruckDayView extends React.Component{

  constructor(props) {
    super(props)
    this.state = {trucks: [
      { id: 1, text: "Item 1" , colour: "red"},
      { id: 2, text: "Item 2" , colour: "blue"},
      { id: 3, text: "Item 3" , colour: "green"}
    ]}
  }

  placeTruck(truck) {
    console.log("pushed")
    this.setState(update(this.state, {
      trucks: {
        $push: [ truck ]
      }
    }));
  }

  removeTruck(index) {   
    this.setState(update(this.state, {
      trucks: {
        $splice: [
          [index, 1]
        ]
      }
    }));
  }

  render() {
    const { trucks } = this.state;
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    const style = {
      width: "100%",
      height: "204px",
      border: '1px dashed gray'
    };

    const backgroundColor = isActive ? 'lightgreen' : '#FFF';

    return connectDropTarget(
      <div style={{...style, backgroundColor}}>
        {trucks.map((truck, i) => {
          return (
            <TruckRow 
              key={i}
              index={i}
              listId={this.props.id}
              truck={truck}                           
              removeTruck={this.removeTruck.bind(this)}
              />
          );
        })}
      </div>
    );
  }


}

const truckTarget = {
  drop(props, monitor, component ) {
    const { id } = props;
    console.log(props)
    const sourceObj = monitor.getItem();   
    console.log(sourceObj) 
    component.placeTruck(sourceObj.truck);
    return {
      listId: id
    };
  }
}


export default DropTarget("TRUCKROW", truckTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(TruckDayView);


// const mapDispatchToProps=(dispatch)=>({
//   actions: bindActionCreators(actionCreators, dispatch)
// })
// const mapStateToProps=(state)=>({trips: state.trips})

//export default connect(mapStateToProps, mapDispatchToProps)(TruckDayView)