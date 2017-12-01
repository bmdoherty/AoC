
const getDigit = (array, index, offset) => {
  let digit = array[index + offset]
  
  // circular index
  if(index+offset > array.length-1){
    digit = array[ 0 - (array.length - index) + offset ]
  }

  return digit
}

const adder = (offset) => {
  
  return (accumalator, value, index, array) => {
    let digit = getDigit(array, index, offset)

    if(value === digit){
      accumalator = accumalator + value
    }
    
    return accumalator
  }
}


const f = (str, type='part 1') => {
    let offset = 1

    if(type === 'part 2'){
      offset = str.length / 2
    }
    
    return str.split('').map(Number).reduce( adder(offset) , 0 )
}

module.exports = f;
