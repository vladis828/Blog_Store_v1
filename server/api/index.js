const express = require('express')
const router = express.Router()


router.use('/products', require('./products'))

router.use('/bags', require('./bags'))

router.use('/pics', require('./pics'))

router.use('/users', require('./users'))

router.use('/user', require('./user'))

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
