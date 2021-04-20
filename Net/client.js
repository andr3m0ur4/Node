const net = require('net')
const os = require('os')

const client = net.connect(3000)

client.on('connect', () => {
    client.write('Hello, I am the client!')
})

client.on('data', message => {
    console.log(message.toString())
})

client.on('error', () => {
    process.exit()
})

process.stdin.on('data', data => {
    const message = data.toString().replace(os.EOL, '')

    if (!message) {
        return
    }

    client.write(message)
})