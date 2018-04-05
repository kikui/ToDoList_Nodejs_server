const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override')

//-----------------------------------------------------------------test

/*const Todo = require("./src/models/todo")

setTimeout(() => {
    Todo.create({ message: 'lol' }).then(() => {
        return Todo.findAll()
    }).then((todos) => {
        console.log(todos.map(t => t.dataValues))
    })
}, 1000)*/

//-----------------------------------------------------------------
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use('/', require('./src/controllers/index'))
app.use('/todo', require('./src/controllers/todo'))

app.use(function (req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function (err, req, res, next) {
    let data = {
        message: err.message,
        status: err.status || 500
    }
    
    res.status(data.status)
    
    res.format({
        html: () => { res.render('error', data) },
        json: () => { res.send(data) }
    })
})

app.listen(PORT, () => {
    console.log('Serveur démarré sur le port : ', PORT)
})