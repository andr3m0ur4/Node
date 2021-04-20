const http = require('http')

http.createServer((request, response) => {
    response.write(
        `<html>
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1>Hello World</h1>
            </body>
        </html>`
    )
    response.end()
}).listen(3412)