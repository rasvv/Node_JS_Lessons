#!/usr/bin/env/node
const fs = require('fs')
const inquirer = require('inquirer')
const { runMain } = require('module')
const path = require("path")
const readline = require('readline')

const firstIP = '89.123.1.41'
const firstLog = '89.123.1.41_requests.log'
const secondIP = '34.48.240.111'
const secondLog = '34.48.240.111_requests.log'
let filePath = ''
let searchingString = ''
let countFinded = 0


const readl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})


let executorDir = ''

// const isFile = fileName =>  {
// 	return fs.lstatSync(fileName).isFile()
// }



// const ACCESS_LOG = './access.log'



const firstWriteStream = fs.createWriteStream(firstLog, {flags: 'a', encoding: 'utf-8'})
const secondWriteStream = fs.createWriteStream(secondLog, {flags: 'a', encoding: 'utf-8'})
// const list = fs.readdirSync(__dirname).filter(isFile)
let list = ''

const readerLine = () => {
	console.log('Подождите, идет считывание файла');
	console.log(`filePath: ${filePath}`)
	console.log(`searchingString: ${searchingString}`)

	const rl = readline.createInterface({
		input: fs.createReadStream(filePath, 'utf-8'),
		terminal: false
	})

	rl.on('line', (line) => {
		// console.log(`line: ${line}`)
		if (line.includes(searchingString)) {
			++countFinded
			// console.log(`найденных подстрок: ${countFinded}`)			
		}
		// if (line.startsWith(firstIP)) {firstWriteStream.write(`${line}\n`)}
		// if (line.startsWith(secondIP)) {secondWriteStream.write(`${line}\n`)}
	})

	rl.on('error', (error) => console.log(error))

	// rl.close()
	console.log(`Количество найденных подстрок3: ${countFinded}`)
}


	const isDir = fileName =>  {
		return fs.lstatSync(fileName).isDirectory()
	}

// let listItem = 
// 	inquirer
// 	.prompt([{
// 		name: 'fileName',
// 		type: 'list',
// 		message: 'Choose file:',
// 		choices: list.forEach(listItem),
// 	}])
// 	.then((answer) => {
// 		console.log(executorDir)
// 		console.log(answer.fileName)
// 		answer.fileName
// 	})


// const lister = () => {
// 	if (fs.lstatSync(listItem).isFile()) {
// 		console.log('readerLine')
// 		filePath = path.join(executorDir, listItem())
// 		readerLine()			
// 	} //else
// 	if (fs.lstatSync(listItem).isDir()) 
// 	{
// 		executorDir = listItem()
// 		list = fs.readdirSync(executorDir)
// 		lister()
// 	}
// }

const run = () => {
	readl.question('Please enter the path: ', dirName => {
		executorDir = (dirName != '') ? dirName : process.cwd()
		list = fs.readdirSync(executorDir)

	let listItem = 	inquirer
		.prompt([{
			name: 'fileName',
			type: 'list',
			message: 'Choose file:',
			choices: list,
		}])
		.then((answer) => {
			console.log(executorDir)
			console.log(answer.fileName)
			answer.fileName
		})

		readl.question('Enter string to search: ', findStr => {
			searchingString = (findStr != '') ? findStr : 'GET'
			if (fs.lstatSync(listItem).isFile()) {
				console.log('readerLine')
				filePath = path.join(executorDir, listItem())
				readerLine()			
			} //else
			if (fs.lstatSync(listItem).isDir()) 
			{
				executorDir = listItem()
				list = fs.readdirSync(executorDir)
				run()
			}
			// lister(() => {
			// 	console.log(`Количество найденных подстрок1: ${countFinded}`)
			// })
		})
	})
}

run()