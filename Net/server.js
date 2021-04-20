const net = require('net')

const connections = []

const broadcast = (message, origin) => {
    connections.forEach(connection => {
        if (connection === origin) return
        connection.write(message)
    })
}

net.createServer(connection => {
    connections.push(connection)
    connection.write('Hello, I am the server!')
    connection.on('data', message => {
        const command = message.toString()

        if (command.indexOf('/nickname') === 0) {
            const nickname = command.replace('/nickname', '')
            broadcast(`${connection.nickname} is now ${nickname}`)
            connection.nickname = nickname
            return
        }
        broadcast(`${connection.nickname} > ${message.toString()}`, connection)
    })
    connection.on('error', () => {
        broadcast(`${connection.nickname} has left!`, connection)
        connections.splice(connections.indexOf(connection), 1)
    })
}).listen(3000)