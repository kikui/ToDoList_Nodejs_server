const Todo = require("../models/todo")
const router = require('express').Router()

function checkSignIn(req, res) {
    if (req.session.user) {
        console.log(req.session.user);
        next();     //If session exists, proceed to page
    } else {
        console.log(req.session.user);
        res.redirect('/user/login', { message: 'Not logged in !' })
    }
}

router.get('/', (req, res, next) => {
    setTimeout(() => {
        Todo.findAll({ where: { user:  req.session.user.pseudo } }).then((todos) => {
            res.format({
                html: () => { res.render('index', { title: 'Bonjour ' + req.session.user.pseudo, todos: todos }) },
                json: () => { res.send(todos) }
            })
        })
    }, 1000)
})

router.get('/add', (req, res, next) => {
    res.format({
        html: () => { res.render('add', { title: 'Add Todo !' }) },
        json: () => { res.send("page ajout todo !") }
    })
})

router.get('/edit/:todoId', (req, res, next) => {
    setTimeout(() => {
        Todo.findById(req.params.todoId).then(todo => {
            res.format({
                html: () => { res.render('edit', { title: 'Bonjour !' + req.session.user.pseudo, todo: todo }) },
                json: () => { res.send(todo) }
            })
        })
    }, 1000)
})

router.post('/edit/:todoId', (req, res, next) => {
    setTimeout(() => {
        let completion = false
        if (req.body.completion == "on")
            completion = true
        Todo.findById(req.params.todoId).then(todo => {
            todo.update({
                message: req.body.message,
                completion: completion,
                updatedAt: Date.now
            }, {
                    fields:
                        [
                            'message',
                            'completion',
                            'updatedAt'
                        ]
                }).then(() => {
                    console.log("todo : " + req.params.todoId + ", as been updated")
                    res.redirect('/todo')
            })
        })
    }, 1000)
})

router.get('/:todoId', (req, res, next) => {
    setTimeout(() => {
        Todo.findById(req.params.todoId).then(todo => {
            res.format({
                html: () => { res.render('show', { title: 'Bonjour !', todo: todo }) },
                json: () => { res.send(todo) }
            })
        })
    }, 1000)
})

router.post('/add', (req, res, next) => {
    setTimeout(() => {
        Todo.create({ message: req.body.message, user: req.session.user.pseudo }).then(() => {
            console.log("ajout effectué !")
        }).then(() => {
            res.redirect('/todo')
        })
    }, 1000)
})

router.post('/:todoId', (req, res, next) => {
    setTimeout(() => {
        Todo.destroy({
            where: {
                id: req.params.todoId
            }
        }).then(() => {
            console.log('Destroy done !');
            res.redirect('/todo')
        })
    }, 1000)
})

router.post('/', (req, res, next) => {
    setTimeout(() => {
        Todo.destroy({
            where: {
                id: req.body.id
            }
        }).then(() => {
            console.log('Destroy done !');
            res.redirect('/todo')
        })
    }, 1000)
})

module.exports = router