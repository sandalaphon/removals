import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Table, Modal } from 'react-bootstrap'
import autosizeInput from 'autosize-input'

class EnterCosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = { costs: Object.assign({}, this.props.costs) }
  }

  componentDidMount() {
    var ids = [
      '18t_fuel_per_mile',
      '9t_fuel_per_mile',
      '3.5t_fuel_per_mile',
      '18t_driver_per_hour',
      '9t_driver_per_hour',
      '9t_driver_per_hour',
      'luton_driver_per_hour',
      'porter_per_hour'
    ]
    ids.forEach(id => {
      autosizeInput(document.getElementById(id))
    })
  }

  handleUpdateClick(e) {
    console.log('update click', e.target.id)
    var costs = Object.assign({}, this.props.costs)
    costs[e.target.id] = this.props[e.target.id]
    console.log('costs', costs, this.props.costs)
    this.props.updateCost(costs)
  }

  handle18tFuelPerMile(e) {
    event.preventDefault()
    console.log('e', '18t fuel', e.target.value)
    this.props.setFuelPerMile18t(e.target.value)
  }
  handle9tFuelPerMile(e) {
    event.preventDefault()
    this.props.setFuelPerMile9t(e.target.value)
    console.log('e', '9t fuel', e)
  }
  handleLutonFuelPerMile(e) {
    event.preventDefault()
    this.props.setFuelPerMileLuton(e.target.value)
    console.log('e', 'handleLutonFuelPerMile', e)
  }
  handle18tDriverPerHour(e) {
    event.preventDefault()
    this.props.setDriverPerHour18t(e.target.value)
    console.log('e', 'handle18tDriverPerHour', e)
  }
  handle9tDriverPerHour(e) {
    event.preventDefault()
    this.props.setDriverPerHour9t(e.target.value)
    console.log('e', 'handle9tDriverPerHour', e)
  }
  handleLutonDriverPerHour(e) {
    event.preventDefault()
    this.props.setDriverPerHourLuton(e.target.value)
    console.log('e', 'handleLutonDriverPerHour', e)
  }
  handlePorterPerHour(e) {
    event.preventDefault()
    this.props.setPorterPerHour(e.target.value)
    console.log('e', 'handlePorterPerHour', e)
  }

  getList() {
    var cost_inputs = [
      <input
        type="text"
        className="18t_fuel_per_mile"
        ref="18t_fuel_per_mile"
        id="18t_fuel_per_mile"
        placeholder="Enter 18t fuel cost per mile"
        onChange={this.handle18tFuelPerMile.bind(this)}
      />,
      <input
        type="text"
        className="9t_fuel_per_mile"
        id="9t_fuel_per_mile"
        placeholder="Enter 9t fuel per mile"
        onChange={this.handle9tFuelPerMile.bind(this)}
      />,
      <input
        type="text"
        className="3.5t_fuel_per_mile"
        id="3.5t_fuel_per_mile"
        placeholder="Enter 3.5t fuel per mile"
        onChange={this.handleLutonFuelPerMile.bind(this)}
      />,
      <input
        type="text"
        className="18t_driver_per_hour"
        id="18t_driver_per_hour"
        placeholder="Enter 18t_driver_per_hour"
        onChange={this.handle18tDriverPerHour.bind(this)}
      />,
      <input
        type="text"
        className="9t_driver_per_hour"
        id="9t_driver_per_hour"
        placeholder="Enter 9t_driver_per_hour"
        onChange={this.handle9tDriverPerHour.bind(this)}
      />,
      <input
        type="text"
        className="luton_driver_per_hour"
        id="luton_driver_per_hour"
        placeholder="Enter luton_driver_per_hour"
        onChange={this.handleLutonDriverPerHour.bind(this)}
      />,
      <input
        type="text"
        className="porter_per_hour"
        id="porter_per_hour"
        placeholder="Enter porter_per_hour"
        onChange={this.handlePorterPerHour.bind(this)}
      />
    ]
    var costs_titles = [
      '18t fuel per mile',
      '9t fuel per mile',
      '3.5t fuel per mile',
      '18t driver per hour',
      '9t driver per hour',
      'Luton driver per hour',
      'Porter per hour'
    ]
    var costs = this.props.costs
    var table_rows = []
    for (var i = 0; i < costs_titles.length; i++) {
      table_rows.push(
        <tr key={i}>
          <td>{costs_titles[i]}</td>
          <td>{costs[Object.keys(costs)[i]] + 'p'}</td>
          <td>{cost_inputs[i]}</td>
          <td>
            <Button
              bsStyle="info"
              id={Object.keys(costs)[i]}
              onClick={this.handleUpdateClick.bind(this)}
            >
              Update
            </Button>
          </td>
        </tr>
      )
    }
    console.log('table_rows', table_rows)
    return table_rows
  }

  render() {
    return (
      <div>
        <h3>Please Enter/Edit Costs </h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Costs</th>
              <th>Current</th>
              <th>Enter Cost In Pence To Change</th>
              <th>Confirm</th>
            </tr>
          </thead>
          <tbody>{this.getList.call(this)}</tbody>
        </Table>
        <Button bsStyle="warning">Update All</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = state => ({
  actions: {}
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterCosts)
