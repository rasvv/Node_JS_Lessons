const EventEmitter = require('events')
const moment = require('moment')
const colors = require('colors')

class Timer {
	constructor(id, date) {
		this.id = id
		this.date = date
		this.timerId = setInterval(() => tickTimer(id, date), 1000)	
	}
}

const parseDate = ((unparsingDate) => {
  return arrayOfStrings = unparsingDate.split('-')
})

const parseArgs = () => {
	for (let i = 2; i<10; i++ ) {
		if (!process.argv[i]) {
			return
		} else {
			const endDate = checkNumber(i) //Проверка полученного аргумента на соответствие формату
			if (endDate) {end = moment(endDate)} else {
				console.log(`Формат даты должен быть "Часы-Минуты-День-Месяц-Год"`)
				return
			}
		
			const timer = new Timer(i, end)
		}
	}
}

let timerId = ''
let timesBetween = 0

const checkNumber = ((argNum) => { // Проверка введенного
  let arrDate = []
	const arg = process.argv[argNum]
	if (arg === undefined) {
		return false
	}

  arrDate = parseDate(arg)

  if (arrDate.length != 5) {// Проверка, что пришло 5 элементов
    return false  
  }

  for(let i = 0; i<arrDate.length-1; i++) {
    if (!Number.isInteger(+arrDate[i])) { // Проверка, что это число
        return false
      }
    if (arrDate[i] <= 0) 
      {
        return false
      }
  }

  const [hour, minute, day, month, year]  = arrDate
	const inputDate = moment(new Date(year, month-1, day, hour, minute, 0))

  if(!moment(inputDate,'YYYY-MM-DD HH:mm:ss').isValid()) { //Проверка даты на валидность
    return false      
  } else {
    return inputDate
  }
})

const printTimer = ((end) => {
	const timesBetweens = moment.duration(timesBetween)
	console.log(colors.green(`Осталось ${timesBetweens.days()} дн. ${timesBetweens.hours()} ч. ${timesBetweens.minutes()} м. ${timesBetweens.seconds()} с.`))
})

const emitter = new EventEmitter()

const closeApp = (() => {
	clearInterval(timerId)
	console.log(colors.red('Время вышло'))
	return
})

const tickTimer = ((id, end) => {
	if (id === 2) {console.clear()}
		start = moment().format('YYYY-MM-DD HH:mm:ss')

	timesBetween = (end.diff(start))
	if (timesBetween < 1) 
		emitter.emit('exit')
	else
  	emitter.emit('print')
})


class Handler {
	static print() {printTimer()}
	static exit()  {closeApp()}
}

const run = (() => {
	parseArgs()
})

emitter.on('print', Handler.print)
emitter.on('exit', Handler.exit)


run()