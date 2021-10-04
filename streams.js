const fs = require('fs')
const { Transform } = require('stream')
// const ACCESS_LOG = 'https://drive.google.com/file/d/1A8B0eDEagkO6XlpJAinsk8_9qQTsnVly/view'
const ACCESS_LOG = './access.log'
const firstIP = '89.123.1.41'
const firstLog = '89.123.1.41_requests.log'
const secondIP = '34.48.240.111'
const secondLog = '34.48.240.111_requests.log'

const readStream = fs.createReadStream(require(ACCESS_LOG), {
	flags: 'r',
	encoding: 'utf-8',
})

const firstWriteStream = fs.createWriteStream(firstLog, {flags: 'a', encoding: 'utf-8'})
const secondWriteStream = fs.createWriteStream(secondLog, {flags: 'a', encoding: 'utf-8'})

let transformedChunk = ''

readStream.on('readable', () => {
	// console.log('readable');
	let data

	while(data = readStream.read()) 
	if(data.startsWith(secondIP))
	console.log(data);
	// chunk.forEach((line) => {
	// 	console.log(line)
	// 	if (line.startsWith(secondIP)) {
	// 		console.log(line)
	// 	}
	// })
	// console.log(cunk)
	// if (chunk.toString().startsWith(secondIP)) {
	// 	console.log(chunk.toString())
	// }
})


// const transformStream = new Transform({
// 	transform(chunk, encoding, callback) {
// 		transformedChunk = chunk.toString()
// 		if (transformedChunk.startsWith(secondIP)) {

// 			const firstChunk = transformedChunk.replace('34.48.240.111', 'secondIP')
// 			// console.log('89.123.1.41' + chunk.toString())
// 			this.push(firstChunk)
// 		}
		
// 		callback()
// 	}
// })

// // readStream.pipe(transformStream).pipe(process.stdout)
// console.log(transformedChunk);
// readStream.pipe(transformStream).pipe(process.stdout)