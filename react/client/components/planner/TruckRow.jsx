import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';


class TruckRow extends Component {

  render() {
    const { truck, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div>
        {truck.text}
      </div>
    ));
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

TruckRow = DragSource("TRUCKROW", TruckRowSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(TruckRow);
export default DropTarget("TRUCKROW", TruckRowTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(TruckRow)

