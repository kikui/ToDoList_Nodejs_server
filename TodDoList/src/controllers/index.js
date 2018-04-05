const router = require('express').Router()

router.all('/', (req, res, next) => {
    res.redirect('/todo')
})

module.exports = router