
const adder = (offset) => {
  
  return (accumalator, value, index, array) => {
    let next = array[index + offset]
    
    if(index+offset > array.length-1){
      let i = 0 - (array.length - index) + offset
      next = array[i]
    }
    // 1212
    if(value === next){
      //console.log(`${accumalator} + ${value}`)
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
