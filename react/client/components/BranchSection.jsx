import React from 'react'
//import store from '../store.js'
import * as commonActions from '../actions/_common_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class BranchSection extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: this.props.branch_list_item_open.open,
      class: this.props.branch_list_item_open.class
    }
  }

  componentDidUpdate(){

  }
  
  handleClick(){

    this.props.actions.common_actions.toggleBranchListItem()
    this.setState((prevState, props) => ({
      class: prevState.class = props.branch_list_item_open.class
    }));
  }
 




  render() {
    //console.log("here",store.getState().common)
    let shown
      // if (this.props.id == this.props.clicked_branch_id){
      //   shown = "section open"
      // }else{
        shown = this.state.class
      // }
    
    
    console.log("props id", this.props.id)
    console.log("props id", this.state.class)

    return (
      <div className={shown}>
        <button id="toggle-button">toggle</button>
        <div className="sectionhead" onClick={this.handleClick.bind(this)}>{this.props.title}</div>
        <div className="articlewrap">
          <div className="article">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps=(dispatch)=>({
  actions:{
    common_actions: bindActionCreators( commonActions, dispatch)    
  } 
})

const mapStateToProps=(state)=>({ 
  clicked_branch_id : state.common.clicked_branch_id,
  branch_list_item_open : state.common.branch_list_item_open
  
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchSection)

