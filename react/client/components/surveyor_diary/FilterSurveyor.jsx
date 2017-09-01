import React from 'react'
import {connect} from 'react-redux'
import * as commonActions from '../../actions/_common_actions'
import * as surveyorActions from '../../actions/surveyor_actions'
import {bindActionCreators} from 'redux'

class FilterSurveyor extends React.Component{



  getBranchesAsOptions(){
    if(this.props.all_branches){
      var options =  this.props.all_branches.map((branch,i)=>{
        console.log(this.props.branch_selected, branch.branch_code)
        if(this.props.branch_selected===branch.branch_code){
          return(
            <option 
            selected
            value={branch.branch_code}
            key={branch.id}>
            {branch.branch_code}</option>
            )
        }else{
          return(
            <option 
            value={branch.branch_code}
            key={branch.id}>{branch.branch_code}</option>
            )
        }
      })
      return options
    }

  }

  handleBranchSelectorChange(e){
    this.props.actions.surveyor_actions.setSurveyorBranchSelected(e.target.value)
  }

  render(){
    var selectStyle = {display: 'inlineBlock'}
  // style={selectStyle}

  return(
    <div className='grid-item-filter-surveyor'>
    <form>Select Branch:
    <select 
    id='branch_selector' 
    onChange={this.handleBranchSelectorChange.bind(this)}>
    
    {this.getBranchesAsOptions.call(this)}
    </select>
    </form>
    <input type='text' placeholder='Search'></input>
    <input type='text' placeholder='Postcode'></input>
    
    </div>
    )
}




}

const mapDispatchToProps=(dispatch)=>({
  actions: {
   common_actions: bindActionCreators( commonActions, dispatch),
   surveyor_actions: bindActionCreators( surveyorActions, dispatch),
 }
})

const mapStateToProps=(state)=>({
  // all_surveys: state.surveyor.all_surveys,
  branch_selected: state.surveyor.surveyor_branch_selected,
  all_branches: state.common.all_branches,

})


export default connect(mapStateToProps, mapDispatchToProps)(FilterSurveyor)

