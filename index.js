const socket = require('socket.io')
const http = require('http')
const fs = require('fs')
const path = require('path')
const cluster = require('cluster')
const os = require('os')




const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html')
    const readStream = fs.createReadStream(indexPath)
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readStream.pipe(res);
    // const indexHTML = fs.readFileSync(indexPath);
    // res.end(indexHTML);
})

const io = socket(server)



io.on('connection', client => {
    const sendMessage = (message, nick) => {
        const data = {
            message: message,
            nick: nick            
        }
        client.broadcast.emit('server-msg', data)
        client.emit('server-msg', data)    
    } 
    console.log('Connected')
    // console.log(nick)



    client.on('client-msg', ({ message, nick }) => {
        console.log(`I got a message: ${message}`)
        // sendMessage(message.split('').reverse().join(''))
        sendMessage(message, nick)
        if (message != `I'm in chat!`) sendMessage(message.split('').reverse().join(''), 'server')
    })
})

server.listen(8082)

