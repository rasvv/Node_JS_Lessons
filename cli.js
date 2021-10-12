#!/usr/bin/env/node
const fs = require('fs')
const { once } = require('events')
const inquirer = require('inquirer')
const path = require("path")
const readline = require('readline')

let searchingString = ''
let countFinded = 0

const readl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

let executorDir = ''
let list = ''

const readerLine = async (filePath) => {
	const rl = readline.createInterface({
		input: fs.createReadStream(filePath, 'utf-8'),
		ootput: process.stdout,
	})

	rl.on('line', (line) => {
		if (line.includes(searchingString)) {
			++countFinded
		}
	})

	rl.on('error', (error) => console.log(error))

	await once(rl, 'close')
	console.log(`Количество найденных подстрок '${searchingString}': ${countFinded}`)
}

const lister = async () => {

	const listItem = await inquirer
	.prompt([{
		name: 'fileName',
		type: 'list',
		message: 'Choose file:',
		choices: list,
	}])
	.then((answer) => {
		return answer.fileName
	})

	const filePath = path.join(executorDir, listItem)

	if (fs.lstatSync(filePath).isDirectory()) {
		executorDir = filePath
		list = fs.readdirSync(executorDir)
		return await lister()
	} else {
		readerLine(filePath)			
	} 
}

const run = () => {
	readl.question('Please enter the path: ', dirName => {
		executorDir = (dirName != '') ? dirName : process.cwd()
		list = fs.readdirSync(executorDir)
		readl.question('Enter string to search: ', findStr => {
			searchingString = (findStr != '') ? findStr : 'GET'
			lister()
		})
	})
}

run()