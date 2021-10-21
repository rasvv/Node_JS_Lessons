const socket = require('socket.io')
const http = require('http')
const path = require('path')
const fs = require('fs')

const clients = [] 
let clientsCount = 0

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html')
    const readStream = fs.createReadStream(indexPath)
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readStream.pipe(res);
})

const io = socket(server)

const checkNick = (id) => {
	let returnNick = ''
	clients.forEach((client) => {
		if (client.id === id) returnNick = client.nick
	})
	return returnNick
}

io.on('connection', client => {
    const sendMessage = (message, nick) => {
        const data = {
            message: message,
            nick: nick, 
						clientsCount: clientsCount            
        }
        client.broadcast.emit('server-msg', data)
        client.emit('server-msg', data)    
    } 

    client.on('client-on', (nick) => {
			if (!checkNick(client.id)) {
				let newclient = {
					'id': client.id,
					'nick': nick
				}
				++clientsCount
				clients.push(newclient)

			}
			sendMessage(`С нами ${nick}`, 'server')
		})

    client.on('disconnect', () => {
			--clientsCount
			const nick = checkNick(client.id)
			if (nick === '' ) {
				sendMessage(`Нас покинул кто-то неизвестный`, 'server')
			} else {
				sendMessage(`Нас покинул ${nick}`, 'server')
			}
		})

		client.on('client-msg', ({ message, nick }) => {
        sendMessage(message, nick)
        if (message != `I'm in chat!`) sendMessage(message.split('').reverse().join(''), 'server')
    })
})

server.listen(8082)

