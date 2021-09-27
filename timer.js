const EventEmitter = require('events');
const { runMain } = require('module');
const moment = require('moment')
const colors = require('colors')

const parseDate = ((unparsingDate) => {
  return arrayOfStrings = unparsingDate.split('-');
})

let timerId = ''
let timesBetween = 0

const checkNumber = ((argNum) => {
  let arrDate = []
	const arg = process.argv[argNum]
	if (arg === undefined) {
		return false
	}

  arrDate = parseDate(arg)

  if (arrDate.length != 5) {
    return false  
  } 

  for(let i = 0; i<arrDate.length-1; i++) {
    if (!Number.isInteger(+arrDate[i])) {
        return false
      }  
    if (arrDate[i] <= 0) 
      {
        return false
      }    
  }

  const year = arrDate[4]
  const month = arrDate[3]
  const day = arrDate[2]
	const minute = arrDate[1]
  const hour = arrDate[0]

  const inputDate = `${year}-${month}-${day} ${('00' + hour).slice(-2)}:${('00' + minute).slice(-2)}:00`
  if(!moment(inputDate,'YYYY-MM-DD HH:mm:ss').isValid()) {
    return false      
  } else {
    return inputDate
  }
})

const endDate = checkNumber(2)
if (endDate) {end = moment(endDate)} else {
	console.log(`Формат даты должен быть "Часы-Минуты-День-Месяц-Год"`)	
	return
}

const printTimer = (() => {
	const timesBetweenDays = Math.floor(timesBetween / 60 / 60 / 24)
	const timesBetweenHour = Math.floor((timesBetween - timesBetweenDays * 24 * 60 * 60) / 60 / 60)
	const timesBetweenMin = ('00' + (Math.floor((timesBetween - timesBetweenDays * 24 * 60 * 60 - timesBetweenHour * 60 * 60) / 60))).slice(-2)
	const timesBetweenSec = ('00' + (timesBetween - timesBetweenDays * 24 * 60 * 60 - timesBetweenHour * 60 * 60 - timesBetweenMin * 60)).slice(-2)

	console.log(colors.green(`Осталось ${timesBetweenDays} дн. ${timesBetweenHour} ч. ${timesBetweenMin} м. ${timesBetweenSec} с.`));	
})

const emitter = new EventEmitter()

const closeApp = (() => {
	clearInterval(timerId)
	console.log(colors.red('Время вышло'));
	return
})

const tickTimer = (() => {
  let firstDate = checkNumber(3)
	console.clear()
	if (firstDate) {
		start = firstDate
	} else {
		start = moment().format('YYYY-MM-DD HH:mm:ss')
	}

	timesBetween = (end.diff(start))/1000
	if (timesBetween < 1) 
		emitter.emit('exit')
	else
  	emitter.emit('print')
})


class Handler {
	static print() {
		printTimer()
	}
	static exit() {
		closeApp()
	}
}

const run = (() => {
	timerId = setInterval(() => tickTimer(), 1000)	
})

emitter.on('print', Handler.print)
emitter.on('exit', Handler.exit)


run()