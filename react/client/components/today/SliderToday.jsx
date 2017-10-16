import React from "react"
// import * as todayActions from '../../actions/today_actions'
import * as commonActions from "../../actions/_common_actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { mapObjectInstances } from "../../models/mapObject"
import Slider, { Range, createSliderWithTooltip } from "rc-slider"
import Tooltip from "rc-tooltip"
import "rc-slider/assets/index.css"
import "rc-tooltip/assets/bootstrap.css"
// import {placeMarkers} from '../../models/sliderFunctions'
import Animation from "../../models/animation"

class SliderToday extends React.Component {
  constructor(props) {
    //may need this later
    super(props)
    this.state = {
      tooltipValue: 0
    }
  }

  componentDidMount() {
    if (this.props.current_today_truckflicker_job) {
      mapObjectInstances.today.drawRouteWithGoogleResponse(
        this.props.current_today_truckflicker_job
      )
    }
    mapObjectInstances.today.display_branches()
    // mapObjectInstances.today.displayOrHideBranchList()
    // this.animation = new Animation(mapObjectInstances.today, 'today')
    this.animation = mapObjectInstances.today.animation
  }

  handleSliderChange(value) {
    var secondsPassed = value * 10 * 60
    // placeMarkers(secondsPassed, 'today')
    this.animation.placeMarkers(secondsPassed)
  }

  onAfterChange(value) {
    // this.setState({value,})
    const secondsPassed = value * 60 * 10
    this.props.actions.common_actions.setSliderSecondsFromStart(
      secondsPassed,
      "today"
    )
    this.animation.placeMarkers(secondsPassed)
    if (this.props.animation_running) {
      this.props.actions.common_actions.toggleAnimationRunning()
    }
  }

  onBeforeChange(value) {
    mapObjectInstances.today.pauseAnime()
  }

  sortTimeDisplay(v) {
    let startValue = 8 //8am
    // let endValue = 72 //8pm
    let minutesFromStartValue = v * 10
    let minutesLeft = minutesFromStartValue % 60
    let hoursPassed = (minutesFromStartValue - minutesLeft) / 60
    if (minutesLeft === 0) minutesLeft = "00"
    const time = `${startValue + hoursPassed}:${minutesLeft} `
    return time
  }

  render() {
    const SliderWithTooltip = createSliderWithTooltip(Slider)

    const marks = {
      0: "8:00",
      12: "10:00",
      24: "12:00",
      36: "14:00",
      48: "16:00",
      60: "18:00",
      72: "20:00"
    }

    return (
      <div className="grid-item-slider-today">
        <div className="slider-div">
          <SliderWithTooltip
            min={0}
            max={72}
            marks={marks}
            step={1}
            defaultValue={this.props.today_seconds_from_start / 600}
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
    // today_actions: bindActionCreators(todayActions, dispatch),
    common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps = state => ({
  all_trips: state.common.all_trips,
  animation_running: state.common.animation_running,
  today_seconds_from_start: state.common.today_seconds_from_start,
  current_today_truckflicker_job: state.common.current_today_truckflicker_job
})

export default connect(mapStateToProps, mapDispatchToProps)(SliderToday)
