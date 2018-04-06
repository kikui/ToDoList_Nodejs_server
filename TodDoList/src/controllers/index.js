const router = require('express').Router()

router.all('/', (req, res, next) => {
    res.redirect('/user')
})

module.exports = router