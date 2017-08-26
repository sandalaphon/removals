import React from 'react'
import * as surveyorActions from '../../actions/surveyor_actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class SurveyList extends React.Component {


getTable(){
  
  if(this.props.all_surveys.length){
    return this.props.all_surveys.map((survey)=>{
      return(
        <tr key={survey.id}>
          <td>{survey.moveware_code}</td>
          <td>{survey.client_name}</td>
          <td>{survey.moveware_employee_code}</td>
          <td>{Date.parse(survey.appointment_time)}</td>
          <td>{survey.appointment_date}</td>

        </tr>
        )
     
    })

      
  }else{
    this.props.actions.surveyor_actions.getAllSurveysFromRails()
  }
}

  render(){
   
    return(
      <div className='survey-list'>
      <table>
      <tbody>
      <tr>
        <td>Moveware</td>
        <td>Name</td>
        <td>Rep</td>
        <td>Time</td>
        <td>Date</td>
      </tr>
      {this.getTable.call(this)}
      </tbody>
      </table>
      </div>
      )
  }
}

const mapDispatchToProps=(dispatch)=>({
  actions: {
 surveyor_actions: bindActionCreators( surveyorActions, dispatch)
  }
})

const mapStateToProps=(state)=>({
  all_surveys: state.surveyor.all_surveys
})


export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)