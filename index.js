const fs = require('fs')
// const { once } = require('events')
// const inquirer = require('inquirer')
const path = require("path")
const readline = require('readline')
const http = require('http')
// const { url } = require('inspector')


// const dirFiles = document.getElementsByClassName('source')

// let executorDir = ''
// let list = ''

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

// const lister = () => {

// 	// const listItem = await inquirer
// 	// .prompt([{
// 	// 	name: 'fileName',
// 	// 	type: 'list',
// 	// 	message: 'Choose file:',
// 	// 	choices: list,
// 	// }])
// 	// .then((answer) => {
// 	// 	return answer.fileName
// 	// })

// 	const files = fs.readdirSync(executorDir)

// 	dirFiles.innerHTML = dirFiles


// 	// const filePath = path.join(executorDir, listItem)

// 	// if (fs.lstatSync(filePath).isDirectory()) {
// 	// 	executorDir = filePath
// 	// 	list = fs.readdirSync(executorDir)
// 	// 	return await lister()
// 	// } else {
// 	// 	readerLine(filePath)			
// 	// } 
// }

// const getSource = () => {
// 	console.log('Select')
// 	executorDir = process.cwd()
// 	list = fs.readdirSync(executorDir)
// 	lister()
// }

console.log('Start')

// btn[0].addEventListener('click', getSource())

let prevListItems = []
let HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')

const run = async () => {
	// const isFile = (filePath) => fs.lstatSync(filePath).isFile()
	const isFile = (filePath) => fs.lstatSync(filePath).isFile();
	// const isDir =  (filePath) => fs.lstatSync(filePath).isDirectory()

	http.createServer((req, res) => {
		const fullPath = path.join(process.cwd(), req.url)

		if (isFile(fullPath)) {
			
			HTML.replace('##links', prevListItems)
			console.log(fs.readFileSync(fullPath), 'utf-8');
			HTML.replace('##file', fs.readFileSync(fullPath), 'utf-8')
		} else {
			let listItems = ''

			const urlParams = req.url.match(/[\d\w\.]+/gi)

			if (urlParams) {
				urlParams.pop()
				const prevUrl = urlParams.join('/');

				listItems = urlParams.length ? `<li><a href="/${prevUrl}">...</a></li>` : `<li><a href="/">...</a></li>`;

			}

			let list = fs.readdirSync(fullPath)

			if (list.length) {
				list.forEach((listItem) => {
					const filePath = path.join(req.url, listItem)
					listItems += `<li><a class='sourceItem' href='${filePath}'>${listItem}</a></li>`
				})
			}

			HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
								.replace('##links', listItems)

		} 


							
		// const sourceDir =  HTML.getElementsByClassName('source')
		// sourceDir[0].innerHTML = listItems

		res.writeHead(200, {
			'Content-Type': 'text/html',
		})

		return res.end(HTML)

	}).listen('8082')
}

run()