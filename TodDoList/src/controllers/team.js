const Todo = require("../models/todo")
const Users = require("../models/users")
const router = require('express').Router()

function checkSignIn(req, res) {
    if (req.session.user) {
        console.log('from todoController : login verif ok : ' + req.session.user);
        next();     //If session exists, proceed to page
    } else {
        console.log('from todoController : login verif KO : ' + req.session.user);
        res.redirect('/user/login', { message: 'Not logged in !' })
    }
}

router.get('/', (req, res, next) => {
    if (req.session.user.team == "" || req.session.user.team == null) {
        res.render('team', { message: 'vous n avez pas de team !', title:'Team interface'})
    } else {
        setTimeout(() => {
            Todo.findAll({
                where: {
                    team: req.session.user.team
                }
            }).then(todos => {
                Users.findAll({
                    where: {
                        team: req.session.user.team
                    }
                }).then((users) => {
                    res.format({
                        html: () => { res.render('team', { title: 'Team interface', todos: todos, message: 'Salut les ' + req.session.user.team, users: users }) },
                        json: () => { res.send(todos) }
                    })
                })
            })
        }, 1000)
    }
})

router.get('/add', (req, res, next) => {
    res.format({
        html: () => { res.render('add', { title: 'Add Team Todo' }) },
        json: () => { res.send("page ajout team todo !") }
    })
})

router.post('/add', (req, res, next) => {
    setTimeout(() => {
        Todo.create({ message: req.body.message, user: req.session.user.pseudo, team: req.session.user.team }).then(() => {
            console.log("ajout effectué !")
        }).then(() => {
            res.redirect('/team')
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
            res.redirect('/team')
        })
    }, 1000)
})

router.get('/edit/:todoId', (req, res, next) => {
    setTimeout(() => {
        Todo.findById(req.params.todoId).then(todo => {
            res.format({
                html: () => { res.render('edit', { title: 'Edit Team Todo', todo: todo }) },
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
                    res.redirect('/team')
                })
        })
    }, 1000)
})

router.get('/:todoId', (req, res, next) => {
    setTimeout(() => {
        Todo.findById(req.params.todoId).then(todo => {
            res.format({
                html: () => { res.render('show', { title: 'Todo Team information', todo: todo }) },
                json: () => { res.send(todo) }
            })
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

module.exports = router