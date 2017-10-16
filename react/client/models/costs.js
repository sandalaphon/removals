// var costs = []
class Costs {
  constructor(costs) {
    this.fuel_per_mile_18t = costs.fuel_per_mile_18t
    this.fuel_per_mile_9t = costs.fuel_per_mile_9t
    this.fuel_per_mile_luton = costs.fuel_per_mile_luton
    this.driver_per_hour_18t = costs.driver_per_hour_18t
    this.driver_per_hour_9t = costs.driver_per_hour_9t
    this.driver_per_hour_luton = costs.driver_per_hour_luton
    this.porter_per_hour = costs.porter_per_hour
  }

  static fuel_per_mile_18t() {
    return this.fuel_per_mile_18t
  }
  static fuel_per_mile_9t() {
    return this.fuel_per_mile_9t
  }
  static fuel_per_mile_luton() {
    return this.fuel_per_mile_luton
  }
  static driver_per_hour_18t() {
    return this.driver_per_hour_18t
  }
  static driver_per_hour_9t() {
    return this.driver_per_hour_9t
  }
  static driver_per_hour_luton() {
    return this.driver_per_hour_luton
  }
  static porter_per_hour() {
    return this.porter_per_hour
  }
}

export default Costs
