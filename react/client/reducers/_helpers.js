export function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function getUniqueColor(index) {
  var colours = [
    '#0075DC',
    '#993F00',
    '#003380',
    '#990000',
    '#191919',
    '#740AFF',
    '#FFA405',
    '#4C005C',
    '#2BCE48',
    '#808080',
    '#94FFB5',
    '#8F7C00',
    '#9DCC00',
    '#FFA8BB',
    '#426600',
    '#FF0010',
    '#5EF1F2',
    '#00998F',
    '#C20088',
    '#E0FF66',
    '#FFFF80',
    '#FFFF00',
    '#FF5005',
    '#F0A3FF',
    '#005C31',
    '#FFCC99',
  ]
  if (index < 24) {
    return colours[index]
  } else {
    var newColour = getRandomColor()
    if (!colours.includes(newColour)) {
      colours.push(newColour)
      return newColour
    }
  }
}

export function getComplementaryColour(hexString) {
  var complementaryColours = {
    '#0075DC': '#dc5100',
    '#993F00': '#949596',
    '#4C005C': '#ccc12b',
    '#005C31': '#d6a298',
    '#2BCE48': '#ce332b',
    '#FFCC99': '#9999ff',
    '#808080': '#ff0303',
    '#94FFB5': '#ab4537',
    '#8F7C00': '#69008f',
    '#9DCC00': '#cc009c',
    '#C20088': '#88c200',
    '#003380': '#e09e6b',
    '#FFA405': '#4805ff',
    '#FFA8BB': '#5e8557',
    '#426600': '#c70c7c',
    '#FF0010': '#11ff00',
    '#5EF1F2': '#cf7855',
    '#00998F': '#992400',
    '#E0FF66': '#c251a6',
    '#740AFF': '#ffba0a',
    '#990000': '#ffba0a',
    '#FFFF80': '#a85ba4',
    '#FFFF00': '#c204b8',
    '#FF5005': '#8c057f',
    '#F0A3FF': '#7a7750',
    '#191919': '#d6b4b4',
  }
  return complementaryColours[hexString]
}

export function sortJoblist(list, attribute, order) {
  var sorted
  if (order === 'asc') {
    sorted = list.sort((a, b) => {
      if (a[attribute] < b[attribute]) return -1
      if (b[attribute] < a[attribute]) return 1
      return 0
    })
  } else {
    sorted = list.sort((a, b) => {
      if (a[attribute] < b[attribute]) return 1
      if (b[attribute] < a[attribute]) return -1
      return 0
    })
  }
  return sorted
}
