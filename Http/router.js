const http = require('http')

const createRouter = port => {
    const api = {}
    const routes = {}
    const methods = ['GET', 'POST', 'OPTIONS']
    const interceptors = []

    methods.forEach(method => {
        routes[method] = {}
        api[method.toLowerCase()] = (path, fn) => {
            routes[method][path] = fn
        }
    })

    api.interceptor = interceptor => interceptors.push(interceptor)

    const executeInterceptors = (number, request, response) => {
        const interceptor = interceptors[number]

        if (!interceptor) return

        interceptor(request, response, () => {
            executeInterceptors(++number, request, response)
        })
    }

    const handleBody = (request, response, next) => {
        const body = []

        request.on('data', chunk => {
            body.push(chunk)
        })

        request.on('end', () => {
            request.body = Buffer.concat(body).toString()
            next()
        })
    }

    const getId = request => {
        const id = Number.parseInt(request.url.split('/')[2])

        if (id) {
            for (let url in routes[request.method]) {
                if (url === '/contatos/:id') {
                    routes[request.method][`/contatos/${id}`] = routes[request.method][url]
                    request.id = id
                }
            }
        }
    }

    http.createServer((request, response) => {
        handleBody(request, response, () => {
            executeInterceptors(0, request, response)
            getId(request)

            if (!routes[request.method][request.url]) {
                response.statusCode = 404
                return response.end()
            }

            routes[request.method][request.url](request, response)
            if (request.id) {
                delete routes[request.method][request.url]
                request.id = null
            }
        })
    }).listen(process.env.port || port)

    return api
}

module.exports = createRouter