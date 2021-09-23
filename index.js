const colors = require('colors')

let colorCounter = 1
let start = 0
let end = 0

function checkNumber (argNum) {
	const arg = process.argv[argNum]
	const argindex = argNum - 1
	if (arg === undefined) {
		console.log(`Аргумент ${argindex} не введен`)	
		return false
	}
	if (!Number.isInteger(+arg)) {
		console.log(`Аргумент ${argindex} не является числом`)
			return false
		}  
	if (+arg <= 0) 
		{
			console.log(`Аргумент ${argindex} должен быть больше 0`)
			return false
		}
	return true
}

function isSimple (n) {
	if (n === 1 || n === 0) {
			return false
	} else {
			for(let i = 2; i < n; i++) {
					if(n % i === 0) {
							return false
					}
			}
			return true
	}
}

function printNumber (n) {
	switch(colorCounter) {
		case 1:
			console.log(colors.green(n))
			colorCounter = 2
			break
		case 2: 
			console.log(colors.yellow(n))
			colorCounter = 3
			break				
		case 3: 
			console.log(colors.red(n))
			colorCounter = 1
			break	
	}

}

if (checkNumber(2)) {start = +process.argv[2]} else return
if (checkNumber(3)) {end = +process.argv[3]} else return

if (start < end) 
	{
		for (let i = start; i <= end; i++)
		{
			if (isSimple(i)) printNumber(i)
		}
	}
else
	{
		console.log('Первый аргумент должен быть меньше второго')
	}


