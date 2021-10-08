#!/usr/bin/env/node
const fs = require('fs')
const inquirer = require('inquirer')
const path = require("path")
// const readline = require('readline')


// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// })

// rl.question('Please enter the path: ', (inputName) => {
// 	const filePath = path.join(__dirname, inputName)
// 	fs.readFile(filePath, 'utf-8', (err,data) => {
// 		console.log(data);
// 		rl.close()
// 	})
// })

// const options = yargs
// 		.usage("UsageL -p <path></path>")
// 		.option("p", {
// 			alias: "path", 
// 			describe: "Path to file", 
// 			type: "string",
// 			demandOption: true
// 		})
// 		.argv

// const filePath = path.join(__dirname, options.path)

// fs.readFile(filePath, 'utf-8', (err,data) => {
// 	console.log(data);
// })

const isFile = fileName =>  {
	return fs.lstatSync(fileName).isFile()
}

const list = fs.readdirSync(__dirname).filter(isFile)

inquirer
.prompt([{
	name: 'fileName',
	type: 'list',
	message: 'Choose file:',
	choices: list,
}])
.then((answer) => {
	console.log(answer.fileName);
	const filePath = path.join(__dirname, answer.fileName)
	fs.readFile(filePath, 'utf-8', (err, data) => {

		console.log(data)
	})
})