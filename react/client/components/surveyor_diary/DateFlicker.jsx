import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mapObjectInstances } from "../../models/mapObject";
import * as commonActions from "../../actions/_common_actions";
import * as surveyorActions from "../../actions/surveyor_actions";

class DateFlicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // date: new Date()
    };
  }

  componentWillMount() {
    var datenow;
    if (this.props.survey_current_date_milliseconds) {
      datenow = new Date(this.props.survey_current_date_milliseconds);
    } else {
      datenow = new Date();
    }

    var beginningOfDay = datenow.setHours(0, 0, 0, 0);

    console.log(beginningOfDay);

    this.setState({ date: datenow });

    this.props.actions.surveyor_actions.setSurveyCurrentDate(beginningOfDay);
  }

  // get_date_today(){

  //       var date = new Date();
  //       console.log(date)
  //       return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  // }

  parseDateForDisplay() {
    return this.state.date.toDateString();
  }

  getISODateFormat(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    if (month.toString().length < 2) month = "0" + month;
    var day = date.getDate();
    if (day.toString().length < 2) day = "0" + day;

    return year + "-" + month + "-" + day;
  }

  handleDateInput(e) {
    e.preventDefault();

    var newDate = new Date(e.target.value);
    newDate.setHours(0, 0, 0, 0);

    this.setState({ date: new Date(newDate) });
    this.props.actions.surveyor_actions.setSurveyCurrentDate(+newDate);
  }

  handleNextDayClick(e) {
    e.preventDefault();
    var newDate = this.state.date.setDate(this.state.date.getDate() + 1);
    this.setState({ date: new Date(newDate) });
    this.props.actions.surveyor_actions.setSurveyCurrentDate(+newDate);
    mapObjectInstances.surveyor.clearMap(true, true);
  }

  handlePreviousDayClick(e) {
    e.preventDefault();
    var newDate = this.state.date.setDate(this.state.date.getDate() - 1);
    this.setState({ date: new Date(newDate) });
    this.props.actions.surveyor_actions.setSurveyCurrentDate(+newDate);
    mapObjectInstances.surveyor.clearMap(true, true);
  }

  render() {
    var buttonRightStyle = { float: "right" };
    var pStyle = { textAlign: "center" };
    var dateStyle = { align: "center", margin: "auto" };
    // var dateStyle = {textAlign:'center'}
    return (
      <div className="grid-item-date-flicker">
        <div className="previous-day-date-flicker">
          <button onClick={this.handlePreviousDayClick.bind(this)}>
            Previous Day
          </button>
        </div>
        <div style={pStyle} className="date-date-flicker">
          <p style={pStyle}>{this.parseDateForDisplay()}</p>
          <input
            type="date"
            style={dateStyle}
            value={this.getISODateFormat(this.state.date)}
            onChange={this.handleDateInput.bind(this)}
          />
        </div>
        <div className="next-day-date-flicker">
          <button
            style={buttonRightStyle}
            onClick={this.handleNextDayClick.bind(this)}
          >
            Next Day
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    common_actions: bindActionCreators(commonActions, dispatch),
    surveyor_actions: bindActionCreators(surveyorActions, dispatch)
  }
});

const mapStateToProps = state => ({
  all_surveys: state.common.all_surveys,
  survey_current_date_milliseconds:
    state.surveyor.survey_current_date_milliseconds,
  all_branches: state.common.all_branches
});
export default connect(mapStateToProps, mapDispatchToProps)(DateFlicker);
