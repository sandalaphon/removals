import React from "react"
//import store from '../store.js'
import * as commonActions from "../actions/_common_actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

class BranchSection extends React.Component {

  constructor(props) {
    super(props)

    if (this.props.id == 33) {
      //hardcoded default branch for now
      this.state = {
        open: true,
        class: "section open"
      }
    } else {
      this.state = {
        open: false,
        class: "section"
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clicked_branch_id == this.props.id) {
      this.toggle()
    }
    if (
      nextProps.clicked_branch_id == -1 &&
      this.props.clicked_branch_id == this.props.id
    ) {
      this.toggle()
    }
  }

  handleClick() {
    this.toggle()
  }

  toggle() {
    if (this.state.open) {
      this.setState((prevState, props) => ({
        open: (prevState.open = false),
        class: (prevState.class = "section")
      }))
    } else {
      this.setState((prevState, props) => ({
        open: (prevState.open = true),
        class: (prevState.class = "section open")
      }))
    }
  }

  render() {
   
    return (
      <div className={this.state.class}>
        <button id="toggle-button">toggle</button>
        <div className="sectionhead" onClick={this.handleClick.bind(this)}>
          {this.props.title}
        </div>
        <div className="articlewrap">
          <div id="branch-child" className="article">{this.props.children}</div>
        </div>
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
  clicked_branch_id: state.common.clicked_branch_id,
  branch_list_item_open: state.common.branch_list_item_open
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchSection)

