export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getUniqueColor(index){
  var colours = [ '#0075DC', '#993F00', '#4C005C', '#191919', '#005C31' ,'#2BCE48' ,'#FFCC99' ,'#808080' ,'#94FFB5', '#8F7C00', '#9DCC00' ,'#C20088', '#003380' , '#FFA405', '#FFA8BB', '#426600' , '#FF0010' ,'#5EF1F2' ,'#00998F'  ,'#E0FF66' , '#740AFF' ,'#990000', '#FFFF80', '#FFFF00', '#FF5005', '#F0A3FF']
  if(index<24){
    return colours[index]
  }else{
    var newColour =getRandomColor()
      if(!colours.includes(newColour)){
        colours.push(newColour)
        return newColour
      }
  }
}

export function sortJoblist(list, attribute, order){
  var sorted
  if(order === 'asc'){
    sorted = list.sort(
      (a,b)=>{
        if (a[attribute] < b[attribute]) return -1
          if (b[attribute] < a[attribute]) return 1
            return 0
        })
  }else{
    sorted = list.sort(
      (a,b)=>{
        if (a[attribute] < b[attribute]) return 1
          if (b[attribute] < a[attribute]) return -1
            return 0
        })
  }
  return sorted
}