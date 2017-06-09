// class Trip{
// constructor(params){
  // {allocated,arrival_time,branch_id,client_address,client_name,client_postcode,collection_address,collection_latlng,collection_postcode,date,delivery_address,delivery_latlng,delivery_postcode,hourly,id,kind,men_requested,moveware_code,notes,volume}=params


// }
// }
// export default Trip

var Trip = function(clientName, startTime, endTime){
  this.startTime = startTime
  this.endTime = endTime
  this.clientName = clientName
  this.startPostCode = null
  this.endPostCode = null
  
}

module.exports = Trip