import React from 'react'
//import store from '../store.js'
import * as commonActions from '../actions/_common_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class BranchSection extends React.Component{
  constructor(props){
    super(props)
  }

    
  
  handleClick(){
    this.props.actions.common_actions.toggleBranchListItem()
  }
 




  render() {
    //console.log("here",store.getState().common)
    let shown = "section"
      if (this.props.id == this.props.clicked_branch_id){
        shown = "section open"
      }
    
    
    console.log("props id", this.props.id)

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

