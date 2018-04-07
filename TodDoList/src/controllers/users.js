const Users = require("../models/users")
const router = require('express').Router()

function checkSignIn(req, res) {
    if (req.session.user) {
        console.log('from userController : login verif ok : '+req.session.user);
        next();     //If session exists, proceed to page
    } else {
        console.log('from userController : login verif KO : '+req.session.user);
        res.redirect('/user', { message: 'Not logged in !' })
    }
}

router.get('/', (req, res, next) => {
    res.redirect('/user/login')
});

router.get('/login', (req, res, next) => {
    setTimeout(() => {
        Users.findAll().then((users) => {
            res.render('login', { users: users })
        })
    }, 1000)
})

router.post('/login', (req, res, next) => {
    if (req.body.pseudo == "" || req.body.password == "") {
        res.render('login', { message: "Input Empty !" })
    } else {
        setTimeout(() => {
            Users.findAll({
                where: {
                    pseudo: req.body.pseudo
                }
            }).then((user) => {
                if (user[0] == undefined) {
                    res.render('login', { message: "Bad pseudo !" })
                } else if (user[0].pseudo == req.body.pseudo && user[0].password == req.body.password) {
                    req.session.user = user[0]
                    console.log(req.session.user.pseudo)
                    res.redirect('/todo')
                } else {
                    res.render('login', { message: "Bad login !" })
                }
            })
        }, 1000)
    }
})

router.get('/register', (req, res, next) => {
    res.render('register')
})

router.post('/register', (req, res, next) => {
    if (req.body.pseudo == "" || req.body.password == "" || req.body.confirmPassword == "") {
        res.render('register', { message: "Input Empty !" })
    } else if (req.body.password != req.body.confirmPassword) {
        res.render('register', { message: "Confirm passworld fail !" })
    } else {
        setTimeout(() => {
            Users.findAll({
                where: {
                    pseudo: req.body.pseudo
                } 
            }).then((user) => {
                if (user[0] == undefined) {
                    Users.create({
                        pseudo: req.body.pseudo,
                        password: req.body.password
                    }).then(() => {
                        return Users.findOne({
                            where: {
                                pseudo: req.body.pseudo
                            }
                        })
                    }).then((user) => {
                        req.session.user = user
                        console.log("ajout utilisateur effectué !")
                        console.log(req.session.user.pseudo)
                        res.redirect('/todo')
                    })
                } else {
                    res.render('register', { message: "User Already Exists ! Login or choose another user pseudo" })
                }
            })
        }, 1000)
    }
})

router.get('/profile', (req, res, next) => {
    if (req.session.user.team == null)
        req.session.user.team = ""
    res.render('profile', { user: req.session.user, title: 'Profile de ' + req.session.user.pseudo })
})

router.post('/profile', (req, res, next) => {
    if (req.body.password != "") {
        if (req.body.confirmepassword != req.body.password) {
            res.render('profile', { user: req.session.user, message: 'password and confirme password different !', title: 'Profile de ' + req.session.user.pseudo })
        } else {
            if (req.body.team != req.session.user.team) {
                setTimeout(() => {
                    Users.findById(req.session.user.id).then(user => {
                        user.update({
                            team: req.body.team,
                            password: req.body.password,
                            updatedAt: Date.now
                        }, {
                                fields:
                                    [
                                        'team',
                                        'password',
                                        'updatedAt'
                                    ]
                            }).then(() => {
                                req.session.user = user
                                console.log("user : " + req.session.user.id + ", as been updated")
                                res.render('profile', { user: req.session.user, message: 'Profile as been updated', title: 'Profile de ' + req.session.user.pseudo })
                            })
                    })
                }, 1000)
            } else {
                setTimeout(() => {
                    Users.findById(req.session.user.id).then(user => {
                        user.update({
                            password: req.body.password,
                            updatedAt: Date.now
                        }, {
                                fields:
                                    [
                                        'password',
                                        'updatedAt'
                                    ]
                            }).then(() => {
                                req.session.user = user
                                console.log("user : " + req.session.user.id + ", as been updated")
                                res.render('profile', { user: req.session.user, message: 'Profile as been updated', title: 'Profile de ' + req.session.user.pseudo })
                            })
                    })
                }, 1000)
            }
        }
    } else if (req.body.team != "") {
        if (req.body.team != req.session.user.team) {
            setTimeout(() => {
                Users.findById(req.session.user.id).then(user => {
                    user.update({
                        team: req.body.team
                    }, {
                            fields:
                                [
                                    'team'
                                ]
                        }).then(() => {
                            req.session.user = user
                            console.log("user : " + req.session.user.id + ", as been updated")
                            res.render('profile', { user: req.session.user, message: 'Profile as been updated', title: 'Profile de ' + req.session.user.pseudo })
                        })
                })
            }, 1000)
        } else {
            res.render('profile', { user: req.session.user, message: 'No modifications', title: 'Profile de ' + req.session.user.pseudo })
        }
    } else {
        res.render('profile', { user: req.session.user, message: 'Not Input', title: 'Profile de ' + req.session.user.pseudo })
    }
})

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        console.log("user logged out.")
    });
    res.redirect('/user/login');
})

module.exports = router