const express = require('express')
const router = express.Router()
const User = require('../db/models/User')
const bcrypt = require('bcrypt')

router.use('/products', require('./products'))

router.use('/bags', require('./bags'))

router.use('/pics', require('./pics'))

router.use('/users', require('./users'))


//Registration
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  //Simple validation
  if (!email || !password) {
    return res.status(400).send('PLease enter all fields')
  }

  //Check for existing user
  const user = await User.findOne({
    where:
      { email: email }
  })

  if (user) {
    res.status(400).send('The user with this email already exists')
  } else {
    const newUser = await User.create(
      {
        email,
        password
      }
    )

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => {
            res.json({
              user: {
                id: user.id,
                email: user.email
              }
            })
          })
      })
    })
  }
})


router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
