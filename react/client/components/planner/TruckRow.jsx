import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import TruckCell from './TruckCell'


class TruckRow extends Component {

  render() {
    const { truck, isDragging, connectDragSource, connectDropTarget } = this.props;
    console.log('this.props', this.props)
    const opacity = isDragging ? 0 : 1;
    const times = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

    // const truckCells = times.map((time, index)=>{
    //   return (
    //     <TruckCell/>
    //     )
    // })



    return connectDragSource(
      <div className = 'truckRow'>
         {times.map((time, index)=>{
                       return (
                         <TruckCell/>
                         )
                     })}
      </div>
    );
  }

}

const TruckRowSource = {

  beginDrag(props) {    
    return {      
      index: props.index,
      listId: props.listId,
      truck: props.truck
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    props.removeTruck(item.index)
  }
};

const TruckRowTarget = {
};

export default DragSource("TRUCKROW", TruckRowSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(TruckRow);
//  DropTarget("TRUCKROW", TruckRowTarget, connect => ({
//   connectDropTarget: connect.dropTarget()
// }))(TruckRow)

