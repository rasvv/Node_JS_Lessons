const fs = require('fs')
const { once } = require('events')
const inquirer = require('inquirer')
const path = require("path")
const readline = require('readline')


const dirFiles = document.getElementsByClassName('source')

let executorDir = ''
let list = ''

// const readerLine = async (filePath) => {
// 	const rl = readline.createInterface({
// 		input: fs.createReadStream(filePath, 'utf-8'),
// 		ootput: process.stdout,
// 	})

// 	rl.on('line', (line) => {
// 		if (line.includes(searchingString)) {
// 			++countFinded
// 		}
// 	})

// 	rl.on('error', (error) => console.log(error))

// 	await once(rl, 'close')
// 	console.log(`Количество найденных подстрок '${searchingString}': ${countFinded}`)
// }

const lister = () => {

	// const listItem = await inquirer
	// .prompt([{
	// 	name: 'fileName',
	// 	type: 'list',
	// 	message: 'Choose file:',
	// 	choices: list,
	// }])
	// .then((answer) => {
	// 	return answer.fileName
	// })

	const files = fs.readdirSync(executorDir)

	dirFiles.innerHTML = dirFiles


	// const filePath = path.join(executorDir, listItem)

	// if (fs.lstatSync(filePath).isDirectory()) {
	// 	executorDir = filePath
	// 	list = fs.readdirSync(executorDir)
	// 	return await lister()
	// } else {
	// 	readerLine(filePath)			
	// } 
}

const getSource = () => {
	console.log('Select')
	executorDir = process.cwd()
	list = fs.readdirSync(executorDir)
	lister()
}

console.log('Start')

btn[0].addEventListener('click', getSource())