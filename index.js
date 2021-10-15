const fs = require('fs')
const path = require("path")
const readline = require('readline')
const http = require('http')


console.log('Start')

// btn[0].addEventListener('click', getSource())

let prevListItems = []
let HTML = ''//fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')

const run = async () => {
	const isFile = (filePath) => fs.lstatSync(filePath).isFile();
	// const isDir =  (filePath) => fs.lstatSync(filePath).isDirectory()

	http.createServer((req, res) => {
		console.log('0,1 ' + process.cwd());
		console.log('0,2 ' + req.url);

		const fullPath = path.join(process.cwd(), req.url)
		console.log('1 ' + fullPath);
		let outputFile1 = ''

		if (isFile(fullPath)) {

			const readerLine = async (fullPath) => {
				let outputFile = ''
				const rl = readline.createInterface({
					input: fs.createReadStream(fullPath, 'utf-8'),
					output: outputFile1,
				})
			
				rl.on('line', (line) => {
					outputFile += `${line}/n`
				})
			
				rl.on('error', (error) => console.log(error))
			
				await once(rl, 'close')
				console.log(outputFile)
				return outputFile1 = outputFile

			}
			
			// HTML.replace('##links', prevListItems)
			// readerLine(fullPath)
			console.log('2 ' + fs.readFileSync(fullPath).toString())
			HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
			.replace('##links', prevListItems)
			.replace('##file', readerLine(fullPath))
			// HTML.replace('##file', fs.readFileSync(fullPath).toString())
			console.log('2,5 ' + HTML)
			
		} else {
			let listItems = ''

			console.log('2,6 ' + req.url);
			// console.log('2,7 ' + urlParams);
			const urlParams = req.url.match(/[\d\w\.]+/gi)
			console.log('3 ' + urlParams);

			if (urlParams) {
				urlParams.pop()
				const prevUrl = urlParams.join('/');

				listItems = urlParams.length ? `<li><a href="/${prevUrl}">...</a></li>` : `<li><a href="/">...</a></li>`;

			}
			console.log('3,5 ' + listItems);

			let list = fs.readdirSync(fullPath)
			console.log('4 ' + list);

			if (list.length) {
				list.forEach((listItem) => {
					const filePath = path.join(req.url, listItem)
					listItems += `<li><a href='${filePath}'>${listItem}</a></li>`
				})
			}

			prevListItems = listItems
			console.log('5 ' + prevListItems);

			HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
								.replace('##links', listItems)
			// HTML.replace('##links', listItems)

		} 

		res.writeHead(200, {
			'Content-Type': 'text/html',
		})

		return res.end(HTML)

	}).listen('8082')
}

run()