var Trip = function(clientName, startTime, endTime){
  this.startTime = startTime
  this.endTime = endTime
  this.clientName = clientName
  this.startPostCode = null
  this.endPostCode = null
}

module.exports = Trip