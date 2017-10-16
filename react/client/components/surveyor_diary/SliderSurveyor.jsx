import React from "react"
import * as surveyorActions from "../../actions/surveyor_actions"
import * as commonActions from "../../actions/_common_actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { mapObjectInstances } from "../../models/mapObject"
import Slider, { Range, createSliderWithTooltip } from "rc-slider"
import Tooltip from "rc-tooltip"
import "rc-slider/assets/index.css"
import "rc-tooltip/assets/bootstrap.css"
// import {placeMarkers} from '../../models/sliderFunctions'
import { placeSurveyorCars } from "../../models/surveyorSliderFunctions"

class SliderSurveyor extends React.Component {
  constructor(props) {
    //may need this later
    super(props)
    this.state = {
      tooltipValue: 0
    }
  }

  componentDidMount() {
    mapObjectInstances.surveyor.display_branches()
    // mapObjectInstances.surveyor.displayOrHideBranchList()
  }

  handleSliderChange(value) {
    var secondsPassed = value * 60
    placeSurveyorCars(
      secondsPassed,
      this.props.survey_current_date_milliseconds
    )
  }

  onAfterChange(value) {
    const secondsPassed = value * 60

    this.props.actions.common_actions.setSliderSecondsFromStart(
      secondsPassed,
      "surveyor"
    )
    placeSurveyorCars(
      secondsPassed,
      this.props.survey_current_date_milliseconds
    )
    if (this.props.animation_running) {
      this.props.actions.common_actions.toggleAnimationRunning()
    }
  }

  onBeforeChange(value) {
    mapObjectInstances.surveyor.pauseAnime()
  }

  sortTimeDisplay(v) {
    v = v / 10
    let startValue = 8 //8am
    let minutesFromStartValue = v * 10
    let minutesLeft = (minutesFromStartValue % 60).toString()
    if (minutesLeft.length === 1) minutesLeft = "0" + minutesLeft
    let hoursPassed = (minutesFromStartValue - minutesLeft) / 60
    return `${startValue + hoursPassed}:${minutesLeft} `
  }

  render() {
    const SliderWithTooltip = createSliderWithTooltip(Slider)

    const marks = {
      0: "8:00",
      120: "10:00",
      240: "12:00",
      360: "14:00",
      480: "16:00",
      600: "18:00",
      720: "20:00"
    }

    // const sliderValue = this.props.surveyor_seconds_from_start/600 || 24

    return (
      <div className="grid-item-slider-surveyor">
        <div className="slider-div">
          <SliderWithTooltip
            min={0}
            max={720}
            marks={marks}
            step={1}
            defaultValue={this.props.surveyor_seconds_from_start / 60}
            included={false}
            onChange={this.handleSliderChange.bind(this)}
            onAfterChange={this.onAfterChange.bind(this)}
            onBeforeChange={this.onBeforeChange.bind(this)}
            tipFormatter={value => `${this.sortTimeDisplay(value)}`}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    surveyor_actions: bindActionCreators(surveyorActions, dispatch),
    common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps = state => ({
  survey_current_date_milliseconds:
    state.surveyor.survey_current_date_milliseconds,
  animation_running: state.common.animation_running,
  surveyor_seconds_from_start: state.common.surveyor_seconds_from_start
})

export default connect(mapStateToProps, mapDispatchToProps)(SliderSurveyor)
