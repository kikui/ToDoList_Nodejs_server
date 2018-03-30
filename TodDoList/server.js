const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

app.set('views', './views')
app.set('view engine', 'pug') 

app.get('/', () => {
    res.render('main', {
        title: 'Bonjour !',
        name: 'Toto',
        content: 'Ma première page'
    })
})

app.get('/hello-world', (req, res) => {
    res.send('Bonjour à tous')
})

app.get('/users/:userId', (req, res) => {
    res.send('User to load is: ' + req.params.userId)
})

app.use((req, res) => {
    res.send(404, 'Not Found')
})

app.listen(PORT, () => {
    console.log('Serveur sur prouts : ', PORT)
})