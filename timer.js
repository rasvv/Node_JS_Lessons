const EventEmitter = require('events')
const moment = require('moment')

function parseDate (unparsingDate) {
  return arrayOfStrings = unparsingDate.split('-');
}


function checkNumber (argNum) {
  let arrDate = []
	const arg = process.argv[argNum]
	const argindex = argNum - 1
	if (arg === undefined) {
		console.log(`Аргумент ${argindex} не введен`)	
		return false
	}

  arrDate = parseDate(arg)

  if (arrDate.length != 4) {
		console.log(`Формат агумента ${argindex} не соответствует`)  
    return false  
  } 



  for(let i = 0; i<arrDate.length-1; i++) {
    if (!Number.isInteger(+arrDate[i])) {
      console.log(`Аргумент ${arrDate[i]} не является числом`)
        return false
      }  
    if (arrDate[i] <= 0) 
      {
        console.log(`Аргумент ${arrDate[i]} должен быть больше 0`)
        return false
      }    
  }

    // const { hour, day, month, year } = arrDate
  const year = arrDate[3]
  const month = arrDate[2]
  const day = arrDate[1]
  const hour = arrDate[0]

  const inputDate = `${year}-${month}-${day} ${hour}:00:00`
  console.log(`Дата: ${inputDate}`);
  if(!moment(inputDate,'YYYY-MM-DD HH:mm:ss').isValid()) {
    console.log(`Формат даты ${inputDate} не верен`)
    return false      
  } else {
    return inputDate
  }
	// return true
}

const endDate = checkNumber(2)
if (endDate) {end = endDate} else return
const firstDate = checkNumber(3)
if (firstDate) {
  start = firstDate
} else {
  start = moment().format('YYYY-MM-DD HH:mm:ss')
}

console.log(end);
console.log(start);

const timesBetween = moment.duration(start.diff(end))


console.log(moment.duration(timesBetween).asSeconds());
