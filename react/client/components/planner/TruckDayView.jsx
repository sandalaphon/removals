import React from "react";
import { Table, Button } from "react-bootstrap";
import * as plannerActions from "../../actions/planner_actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class TruckDayView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trucks: [1, 2, 3, 4, 5, 6, 7] };
  }

  componentDidMount() {
    var { droppedCells } = this.props.trips;
    droppedCells.forEach(droppedCellsArray => {
      setImmediate(() => {
        var image = document.getElementById(droppedCellsArray.colour);
        document.getElementById(droppedCellsArray.cells[0]).appendChild(image);
      });
    });
  }

  handleDragEnter(event) {
    event.preventDefault();
    let cellId = event.target.id;
    var newCellArray = [];
    let { estimated_hours } = this.props.trips.currentDragJob;
    let { setHighlightedCells } = this.props.actions.planner_actions;

    for (let i = 0; i < estimated_hours; i++) {
      let startIndex = cellId.substring(event.target.id.length - 2);
      let newStartIndex = +startIndex + i;
      let newCellId = "";
      if (newStartIndex < 10) {
        newCellId = `${cellId.substring(
          0,
          cellId.length - 2
        )}0${newStartIndex}`;
      } else {
        newCellId = `${cellId.substring(0, cellId.length - 2)}${newStartIndex}`;
      }
      newCellArray.push(newCellId);
    }
    setHighlightedCells(newCellArray);
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDragLeave(event) {
    event.preventDefault();
  }

  drop(event) {
    var {
      setDroppedCells,
      deleteDroppedCells
    } = this.props.actions.planner_actions;
    var { highlightedCells, currentDragJob } = this.props.trips;
    deleteDroppedCells(currentDragJob.colour);
    setDroppedCells({
      cells: highlightedCells,
      colour: currentDragJob.colour
    });
    var data = event.dataTransfer.getData("text");

    event.target.appendChild(document.getElementById(data));
  }

  render() {
    var timeColumns = [
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    ];

    //////////////////MAP START///////

    var truckCalendar = timeColumns.map((time, timeIndex) => {
      var timeString = `${time}:00`;
      var timeColumnClassName = "timecolumn";
      return (
        <div key={timeIndex} className={timeColumnClassName}>
          {this.state.trucks.map((truck, truckIndex) => {
            var truckClassName = `cell truck${truckIndex} time${timeIndex + 5}`;
            var cellId = "";

            if (timeIndex.toString().length < 2) {
              cellId = `truck${truckIndex}time0${timeIndex}`;
            } else {
              cellId = `truck${truckIndex}time${timeIndex}`;
            }
            var inlineStyle = "";

            ///////////////////////////////////////////////////////////////////////////////////////////////////////

            let {
              highlightedCells,
              droppedCells,
              currentDragJob
            } = this.props.trips;
            if (highlightedCells.includes(cellId)) {
              var inlineStyle = {
                border: `2px dashed ${currentDragJob.colour}`
              };
            } else {
              inlineStyle = { border: "" };
            }

            ///////////////////////////////////////////////////////////////////////////////////////////////

            if (droppedCells.length) {
              droppedCells.forEach(colourAndCellsObject => {
                if (colourAndCellsObject.cells.includes(cellId)) {
                  inlineStyle = {
                    backgroundColor: colourAndCellsObject.colour,
                    opacity: 0.5
                  };
                }
              });
            }

            var truckKey = `truck${truckIndex}time${timeIndex}`;
            var headerKey = `header${timeIndex}`;

            return (
              <div
                className={truckClassName}
                key={truckKey}
                id={cellId}
                style={inlineStyle}
                onDrop={this.drop.bind(this)}
                onDragOver={this.handleDragOver.bind(this)}
                onDragLeave={this.handleDragLeave.bind(this)}
                onDragEnter={this.handleDragEnter.bind(this)}
              />
            );
          })}
        </div>
      );
    });

    ///////////// MAP END ///////////////////////

    truckCalendar.forEach((columnArray, index) => {
      var timeString = `${index + 5}:00`;
      columnArray.props.children.unshift(
        <div className="cell">{timeString}</div>
      );
    });

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    return <div className="grid-item-truck-day-view">{truckCalendar}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    planner_actions: bindActionCreators(plannerActions, dispatch)
  }
});

const mapStateToProps = state => ({
  trips: state.planner
});

export default connect(mapStateToProps, mapDispatchToProps)(TruckDayView);
