const os = require('os')

exports.onReadable = callback => {
    process.stdin.on('data', data => {
        const chunk = data.toString().replace(os.EOL, '')
        if (chunk) {
            callback(chunk)
        }
    })
}