import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

class TruckCell extends React.Component {
  render(){
    return (
      <div className = 'truckCell'></div>
      )
  }



};




const TruckCellTarget = {
}

export default DropTarget("JOB", TruckCellTarget, (connect, monitor) => ({
  // connectDropTarget: connect.dropTarget()

}))(TruckCell);