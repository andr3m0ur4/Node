const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const operadoras = [
	{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
	{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
	{nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
	{nome: "Claro", codigo: 21, categoria: "Celular", preco: 2},
	{nome: "NET", codigo: 21, categoria: "Fixo", preco: 1},
	{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2}
]

const contatos = [
    {id: 1, nome: "Bruno", telefone: "9999-2222", data: new Date(), operadora: operadoras[0]},
    {id: 2, nome: "Sandra", telefone: "9999-3333", data: new Date(), operadora: operadoras[1]},
    {id: 3, nome: "Mariana", telefone: "9999-9999", data: new Date(), operadora: operadoras[2]}
]


app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/contatos', (req, res) => {
    res.json(contatos)
})

app.get('/contatos/:id', (req, res) => {
    contatos.forEach(contato => {
        if (contato.id == req.params.id) {
            res.json(contato)
            return
        }
    })
    res.status(404).end()
})

app.post('/contatos', (req, res) => {
    const contato = req.body
    contato.id = contatos.length + 1
    contatos.push(contato)
    res.json(true)
})

app.get('/operadoras', (req, res) => {
    res.json(operadoras)
})

app.listen(process.env.PORT || 3412)