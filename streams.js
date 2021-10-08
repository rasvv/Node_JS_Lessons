const fs = require('fs')
const readline = require('readline')


const ACCESS_LOG = './access.log'
const firstIP = '89.123.1.41'
const firstLog = '89.123.1.41_requests.log'
const secondIP = '34.48.240.111'
const secondLog = '34.48.240.111_requests.log'


const firstWriteStream = fs.createWriteStream(firstLog, {flags: 'a', encoding: 'utf-8'})
const secondWriteStream = fs.createWriteStream(secondLog, {flags: 'a', encoding: 'utf-8'})


console.log('Подождите, идет считывание файла');

const rl = readline.createInterface({
	input: fs.createReadStream(ACCESS_LOG, 'utf-8'),
	terminal: false
})

rl.on('line', (line) => {
	if (line.startsWith(firstIP)) {firstWriteStream.write(`${line}\n`)}
	if (line.startsWith(secondIP)) {secondWriteStream.write(`${line}\n`)}
})

rl.on('error', (error) => console.log(error))
