import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions/actionCreators'
import AccountManagement from './AccountManagement'



function mapStateToProps(state){
  return {
    // posts: state.posts,
    // comments: state.comments,
    // search: state.search
    loginDetails: state.loginDetails
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch)
}

const AccountManagementSmart = connect(mapStateToProps, mapDispatchToProps)(AccountManagement)

export default AccountManagementSmart