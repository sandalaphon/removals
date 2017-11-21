import React from "react"
import { mapObjectInstances } from "../models/mapObject"
import * as commonActions from "../actions/_common_actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import Animation from "../models/animation"

class TruckFlicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.pathname = this.props.router.location.pathname.slice(1)
  }

  componentWillUnmount() {
    if (this.props.trips.animation_running) {
      mapObjectInstances[this.pathname].pauseAnime()
      this.props.actions.common_actions.toggleAnimationRunning()
    }
  }

  get_relevant_ros_array() {
    return []
  }

  setInstanceVariables() {
    switch (this.pathname) {
      case "today":
        this.current_truckflicker_job = this.props.trips.current_today_truckflicker_job
        this.mapObject = mapObjectInstances.today
        if(this.props.today_closest.length){
          this.relevantArray = this.props.today_closest
        }else{
          this.relevantArray = this.props.today_trips
        }
        
        this.branchStatus = this.props.trips.branches_status_today
        break
      case "planner":
        this.current_truckflicker_job = this.props.trips.current_planner_truckflicker_job
        this.mapObject = mapObjectInstances.planner
        this.relevantArray = this.props.trips.all_trips
        break
      case "partload":
        this.current_truckflicker_job = this.props.trips.current_partload_truckflicker_job
        this.mapObject = mapObjectInstances.partload
        this.relevantArray = this.props.best_pick_up_jobs
        break
      case "surveyor":
        this.current_truckflicker_job = this.props.trips.current_surveyor_truckflicker_job
        this.mapObject = mapObjectInstances.surveyor
        this.relevantArray = this.props.best_pick_up_jobs
        break
      case "removal_from_store":
        this.current_truckflicker_job = this.props.trips.removal_from_store_truckflicker_job
        this.mapObject = mapObjectInstances.removal_from_store_truckflicker_job
        this.relevantArray = this.get_relevant_ros_array()
        break
    }
  }

  showAllRoutes(event) {
    if (event) event.preventDefault()
    this.setInstanceVariables()
    this.mapObject.clearMap()
    this.relevantArray.forEach(job => {
      this.props.actions.common_actions.setHiddenStatus(job)
      // write to include pathname ...trip.hidden[pathname]
    })
    this.props.actions.common_actions.clearCurrentTruckFlickerJob(this.pathname)
    this.mapObject.displayArrayOfJobRoutes(this.relevantArray)
  }

  handlePreviousClick(event) {
    event.preventDefault()
    this.renderAppropriateRoute(false)
  }

  handleNextClick(event) {
    event.preventDefault()
    this.renderAppropriateRoute(true)
  }

  renderAppropriateRoute(next = true) {
    this.setInstanceVariables()
    var jobToDisplay = this.getNextJobToDisplay(next)
    this.mapObject.clearMap()
    // this.mapObject.branchesShowing=false
    if (jobToDisplay) {
      this.mapObject.drawRouteWithGoogleResponse(jobToDisplay)
      // this.current_truckflicker_job = jobToDisplay
      this.props.actions.common_actions.setCurrentTruckFlickerJob(
        jobToDisplay,
        this.pathname
      )
    }
  }

  getNextJobToDisplay(next) {
    var arrayToUse = next
      ? this.relevantArray
      : this.relevantArray.slice().reverse()
    var jobToReturn
    var unfound = true
    if (!this.current_truckflicker_job) {
      arrayToUse.forEach(job => {
        if (!job.hidden[this.pathname] && unfound) {
          jobToReturn = job
          unfound = false
        }
      })
    } else {
      let currentIndex = arrayToUse.indexOf(this.current_truckflicker_job)
      arrayToUse.forEach((job, index) => {
        if (!job.hidden[this.pathname] && index > currentIndex && unfound) {
          jobToReturn = job
          unfound = false
        }
      })
      if (unfound) {
        arrayToUse.forEach((job, index) => {
          if (!job.hidden[this.pathname] && index <= currentIndex && unfound) {
            jobToReturn = job
            unfound = false
          }
        })
      }
    }
    return jobToReturn
  }

  resetToStart() {
    this.setInstanceVariables()
    if (this.props.trips.animation_running) {
      this.mapObject.pauseAnime()
      this.props.actions.common_actions.setSliderSecondsFromStart(
        0,
        this.pathname
      )
      this.mapObject.animateRoute(this.pathname)
    } else {
      this.props.actions.common_actions.setSliderSecondsFromStart(
        0,
        this.pathname
      )
      this.mapObject.animateRoute(this.pathname)
      setTimeout(this.mapObject.pauseAnime.bind(this.mapObject), 0)
    }
  }

  setToEnd() {
    this.setInstanceVariables()
    if (this.props.trips.animation_running) {
      this.mapObject.pauseAnime()
      this.props.actions.common_actions.setSliderSecondsFromStart(
        43200,
        this.pathname
      )
      this.props.actions.common_actions.toggleAnimationRunning()
      this.mapObject.animation.placeMarkers(43200)
      // this.mapObject.animateRoute(this.pathname)
    } else {
      this.props.actions.common_actions.setSliderSecondsFromStart(
        43200,
        this.pathname
      )
      this.mapObject.animation.placeMarkers(43200)
      // this.mapObject.animateRoute(this.pathname)
      // setTimeout(this.mapObject.pauseAnime.bind(this.mapObject), 0)
    }
  }

  handleAnimateClick(event) {
    event.preventDefault()
    this.setInstanceVariables()
    if (this.props.trips.animation_running) {
      this.mapObject.pauseAnime()
    } else {
      this.mapObject.animateRoute(this.pathname)
    }
    this.props.actions.common_actions.toggleAnimationRunning()
  }

  handleAccelerationClick(e) {
    e.preventDefault()
    if (this.props.trips.animation_running) {
      this.props.actions.common_actions.setAnimationSpeed(this.pathname, 1)
      this.mapObject.pauseAnime()
      this.mapObject.animateRoute(this.pathname)
    } else {
      this.props.actions.common_actions.setAnimationSpeed(this.pathname, 1)
    }
  }

  handleDecelerationClick(e) {
    e.preventDefault()
    if (this.props.trips.animation_running) {
      this.props.actions.common_actions.setAnimationSpeed(this.pathname, -1)
      this.mapObject.pauseAnime()
      this.mapObject.animateRoute(this.pathname)
    } else {
      this.props.actions.common_actions.setAnimationSpeed(this.pathname, -1)
    }
  }

  render() {
    // this.setInstanceVariables()
    var playOrPauseIcon = this.props.trips.animation_running ? (
      <i
        className="fa fa-pause fa-lg play_pause"
        aria-hidden="true"
        onClick={this.handleAnimateClick.bind(this)}
      />
    ) : (
      <i
        className="fa fa-play fa-lg play_pause"
        aria-hidden="true"
        onClick={this.handleAnimateClick.bind(this)}
      />
    )

    // <div className = 'arrow-left tooltip'>
    // </div>

    return (
      <div className="grid-item-truck-flicker">
        <button className={"show_all_button"} onClick={this.showAllRoutes.bind(this)}>Show All</button>
        <div className={"left-holder"} />

        <i
          class="fa fa-arrow-left fa-lg"
          aria-hidden="true"
          onClick={this.handlePreviousClick.bind(this)}
        />

        <i
          title="Step Back"
          className="fa fa-step-backward fa-lg"
          aria-hidden="true"
          onClick={this.resetToStart.bind(this)}
        />
        <i
          className="fa fa-backward fa-lg"
          aria-hidden="true"
          onClick={this.handleDecelerationClick.bind(this)}
        />
        {playOrPauseIcon}
        <i
          className="fa fa-forward fa-lg"
          title="hello"
          aria-hidden="true"
          onClick={this.handleAccelerationClick.bind(this)}
        />
        <i
          className="fa fa-step-forward fa-lg"
          aria-hidden="true"
          onClick={this.setToEnd.bind(this)}
        />
        <i
          class="fa fa-arrow-right fa-lg"
          aria-hidden="true"
          onClick={this.handleNextClick.bind(this)}
        />
        <div className={"rigth-holder"} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    common_actions: bindActionCreators(commonActions, dispatch)
  }
})

const mapStateToProps = state => ({
  today_closest: state.today.today_closest,
  trips: state.common,
  today_trips: state.today.today_trips,
  best_pick_up_jobs: state.partload.best_pick_up_jobs
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TruckFlicker)
)
