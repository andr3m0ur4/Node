const router = require('./router')

const app = router(3412)

const operadoras = [
    { nome: 'Oi', codigo: 14, categoria: 'Celular', preco: 2 },
    { nome: 'Claro', codigo: 21, categoria: 'Celular', preco: 1 },
    { nome: 'Vivo', codigo: 15, categoria: 'Celular', preco: 3 },
    { nome: 'Tim', codigo: 41, categoria: 'Celular', preco: 1 },
    { nome: 'Net', codigo: 21, categoria: 'Fixo', preco: 1 },
    { nome: 'Embratel', codigo: 41, categoria: 'Fixo', preco: 2 }
]

const contatos = [
    { id: 1, nome: 'andré moura', telefone: '9999-2222', data: new Date(), operadora: operadoras[3]},
    { id: 2, nome: 'SANDRA MARIA OLIVEIRA', telefone: '9999-3333', data: new Date(), operadora: operadoras[1]},
    { id: 3, nome: 'carlos MACHADO', telefone: '9999-4444', data: new Date(), operadora: operadoras[2]},
    { id: 4, nome: 'bruno da silva', telefone: '9999-9999', data: new Date(), operadora: operadoras[0]}
]

app.interceptor((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.interceptor((request, response, next) => {
    response.setHeader('Content-Type', 'application/json;charset=UTF-8')
    next()
})

app.get('/contatos', (request, response) => {
    response.write(JSON.stringify(contatos))
    response.end()
})

app.get('/contatos/:id', (request, response) => {
    const contato = contatos.find(contato => contato.id === request.id)
    if (contato) {
        response.write(JSON.stringify(contato))
    } else {
        response.write(JSON.stringify({}))
    }
    response.end()
})

app.get('/operadoras', (request, response) => {
    response.write(JSON.stringify(operadoras))
    response.end()
})

app.post('/contatos', (request, response) => {
    const contato = JSON.parse(request.body)
    contato.id = contatos.length + 1
    contatos.push(contato)
    response.end()
})

app.options('/contatos', (request, response) => {
    response.end()
})