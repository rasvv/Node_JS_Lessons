const socket = require('socket.io')
const http = require('http')
const fs = require('fs')
const path = require('path')
const cluster = require('cluster')
const os = require('os')

const generateNick = (id) => {
	// const uppercharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const characters = 'abcdefghijklmnopqrstuvwxyz'
	let result = ''
	for ( let i = 0; i < 4; i++ ) {
		 result += characters.charAt(Math.floor(Math.random() * characters.length))
		 if (i === 0) result = result.toUpperCase()
	}
	return id+result;
}

if (cluster.isMaster) {
	for ( let i = 0; i < os.cpus().length; i++) {
		cluster.fork()
	}
} else {
const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html')
    const readStream = fs.createReadStream(indexPath)
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readStream.pipe(res);
    // const indexHTML = fs.readFileSync(indexPath);
    // res.end(indexHTML);
});

const io = socket(server)

io.on('connection', client => {
    console.log('Connected')

    client.on('client-msg', ({ message, id }) => {
        // console.log(data);
        const data = {
            message: message.split('').reverse().join(''),
						nick: generateNick(process.pid),
						id: id,
        }
        client.broadcast.emit('server-msg', data, id)
        client.emit('server-msg', data, id)
    })
})

console.log(`Worker ${process.pid} is running`)

server.listen(8082)
}
