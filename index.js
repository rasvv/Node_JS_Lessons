const fs = require('fs')
const path = require("path")
const http = require('http')

let prevListItems = ''

const run = async () => {
	const isDir =  (filePath) => fs.lstatSync(filePath).isDirectory()

	http.createServer((req, res) => {
		const fullPath = path.join(process.cwd(), req.url)

		if (!fs.existsSync(fullPath)) return res.end('File or directory not found')
			
			let listItems = ''
			let	HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
			let style = path.join(__dirname, 'style.css')

		if (isDir(fullPath)) {
			const urlParams = req.url.match(/[\d\w\.]+/gi)
			if (urlParams) {
				urlParams.pop()
				const prevUrl = urlParams.join('/')
				listItems = urlParams.length ? `<li><a href="/${prevUrl}">...</a></li>` : `<li><a href="/">...</a></li>`
			}
			let list = fs.readdirSync(fullPath)

			if (list.length) {
				list.forEach((listItem) => {
					const filePath = path.join(req.url, listItem)
					listItems += `<li><a href='${filePath}'>${listItem}</a></li>`
				})
			}

			HTML = HTML
				.replace('##links', listItems)
				.replace('##file', '')
			prevListItems = listItems
		} else {
			HTML = HTML
				.replace('##links', prevListItems)
				.replace('##file', fs.readFileSync(fullPath).toString())
		}
		res.writeHead(200, {
			'Content-Type': 'text/html',
		})

		return res.end(HTML)

	}).listen('8082')
}

console.log('Start')

run()