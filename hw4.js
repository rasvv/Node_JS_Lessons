const fs = require('fs/promises')
const { lstatSync } = require('fs')
const inquirer = require('inquirer')
const yargs = require('yargs')
const path = require('path')

let currentDir = process.cwd()

class ListItem {
	constructor(path, fileName) {
		this.path = path
		this.fileName = fileName
	}
	get isDir() {
		return lstatSync(this.path).isDirectory()
	}
}

const run = async () => {
	const list = await fs.readdir(currentDir)
	const items = list.map((fileName) => {
		return new ListItem(path.join(currentDir, fileName), fileName)
	})

	const item = await inquirer
		.prompt([
			{
				name: 'fileName',
				type: 'list',
				message: `Choose: ${currentDir}`,
				choices: items.map(item => ({name: item.fileName, value: item})),
			}
		])
		.then(answer => answer.fileName)

		if (item.isDir) {
			currentDir = item.path
			return await run()
		} else {
			const data = await fs.readFile(item.path, 'utf-8')
			console.log(data);	
		}



}

run()