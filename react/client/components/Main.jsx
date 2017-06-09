import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import Layout from './Layout'



function mapStateToProps(state){
  return {
    // posts: state.posts,
    // comments: state.comments,
    // search: state.search
    loginDetails: state.loginDetails,
    trips: state.trips
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch)
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default Main