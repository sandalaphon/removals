var appointments = []

class Appointment {
  constructor(
    appointment_date,
    appointment_time,
    moveware_code,
    collection_address,
    collection_postcode,
    client_name,
    duration,
    branch_code,
    moveware_employee_code,
    collection_latLng,
    milliseconds_since_1970,
    survey_id,
    delivery_address = '',
  ) {
    this.appointment_date = appointment_date
    this.appointment_time = appointment_time
    this.moveware_code = moveware_code
    this.collection_address = collection_address
    this.collection_postcode = collection_postcode
    this.client_name = client_name
    this.duration = duration
    this.branch_code = branch_code
    this.moveware_employee_code = moveware_employee_code
    this.collection_latLng = JSON.parse(collection_latLng)
    this.milliseconds_since_1970 = milliseconds_since_1970
    this.delivery_address = ''
    this.dateMilli = this.getDateInMilli(this.milliseconds_since_1970)
    this.survey_id = survey_id
    appointments.push(this)
  }

  getDateInMilli(milli) {
    var date = new Date(milli)
    date.setHours(0, 0, 0, 0)
    return +date
  }

  static getSurveysByDay(dayMilli) {
    return appointments.filter(survey => {
      return survey.dateMilli == dayMilli
    })
  }

  static getSurveysByBranch(branch_code) {
    {
      return appointments.filter(survey => {
        return survey.branch_code == branch_code
      })
    }
  }

  getSurveysByBranch(branch_code) {
    {
      return appointments.filter(survey => {
        return survey.branch_code == branch_code
      })
    }
  }

  static getSurveysBySurveyor(surveyor_code) {
    return appointments.filter(survey => {
      return survey.moveware_employee_code == surveyor_code
    })
  }

  static getSurveysBySurveyorAndDay(surveyor_code, dayMilli) {
    return appointments.filter(survey => {
      return (
        survey.moveware_employee_code == surveyor_code &&
        survey.dateMilli == dayMilli
      )
    })
  }

  static getSurveysByBranchAndDay(dayMilli, branch_code) {
    return appointments.filter(survey => {
      return survey.dateMilli == dayMilli && survey.branch_code == branch_code
    })
  }

  static getSurveysByBranchDayAndSurveyor(
    dayMilli,
    branch_code,
    surveyor_code,
  ) {
    var surveys = appointments.filter(survey => {
      return (
        survey.dateMilli == dayMilli &&
        survey.branch_code == branch_code &&
        survey.moveware_employee_code == surveyor_code
      )
    })

    surveys.sort((a, b) => {
      if (a.milliseconds_since_1970 > b.milliseconds_since_1970) return 1
      if (a.milliseconds_since_1970 < b.milliseconds_since_1970) return -1
      return 0
    })
    return surveys
  }

  static getAllSurveyorsByBranch(branch_code) {
    var branch_surveyors = []
    appointments.forEach(survey => {
      if (
        survey.branch_code == branch_code &&
        !branch_surveyors.includes(survey.moveware_employee_code)
      ) {
        branch_surveyors.push(survey.moveware_employee_code)
      }
    })
    return branch_surveyors
  }
}

export default Appointment

export { appointments }

// t.integer  "employee_id"
// t.integer  "branch_id"
// t.date     "appointment_date"
// t.time     "appointment_time"
// t.integer  "moveware_code"
// t.string   "collection_address"
// t.string   "delivery_address"
// t.string   "client_name"
// t.decimal  "duration"
// t.string   "branch_code"
// t.datetime "created_at",              null: false
// t.datetime "updated_at",              null: false
// t.string   "moveware_employee_code"
// t.string   "collection_postcode"
// t.string   "collection_latLng"
// t.bigint   "milliseconds_since_1970"
// t.text     "surveys_object"
