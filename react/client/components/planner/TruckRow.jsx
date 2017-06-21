import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import TruckCell from './TruckCell'


class TruckRow extends Component {

  render() {
    const handleStyle = {
      backgroundColor: 'green',
      width: '2rem',
      height: '2rem',
      position: 'absolute',
      transform: 'translate(50%,50%)',
      cursor: 'pointer',
    };
    const { truck, isDragging, connectDragSource, connectDropTarget, connectDragPreview } = this.props;
    console.log('this.props', this.props)
    const opacity = isDragging ? 0 : 1;
    const times = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

    // const truckCells = times.map((time, index)=>{
    //   return (
    //     <TruckCell/>
    //     )
    // })



   
    return connectDragPreview(
    // <div>
    // connectDragSource(
      
      <div className = 'truckRow'>
      {connectDragSource(<div className = 'truckDragCell'>
               <div style={handleStyle}> </div>
               </div>
             )}
         {times.map((time, index)=>{

                       return (
                         <TruckCell/>
                         )
                     })}

      </div>
      
    );
    // </div>
    
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
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))(TruckRow);
//  DropTarget("TRUCKROW", TruckRowTarget, connect => ({
//   connectDropTarget: connect.dropTarget()
// }))(TruckRow)

