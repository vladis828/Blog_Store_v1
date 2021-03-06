const router = require('express').Router()
const { User, Bag } = require('../db/models')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')


// router.get('/', (req, res) => {
//   User.findAll({
//     include: [Bag],
//     attributes: {
//       exclude: ["password"]
//     }
//   })
//     .then(users => {
//       res.json(users)
//     })
//     .catch(err => console.log("Error:" + err))
// })

/*

Registration

*/

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  //Simple validation
  if (!email || !password) {
    return res.send('Please enter all fields').status(400)
  }

  //Check for existing user
  const user = await User.findOne({
    where:
      { email: email }
  })

  if (user) {
    res.send('The user with this email already exists').status(400)
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

            jwt.sign(
              { id: user.id },
              config.get("jwt"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    email: user.email
                  }
                })
              }
            )
          })
      })
    })
  }
})

/*

Auth

*/

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  //Simple validation
  if (!email || !password) {
    return res.send('Please enter all fields').status(400)
  }

  //Check for existing user
  const user = await User.findOne({
    where:
      { email: email }
  })

  if (!user) {
    res.send('The user does not exist').status(400)
  } else {
    //Validate password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) return res.send('Invalid credentials').status(400)

        jwt.sign(
          { id: user.id },
          config.get("jwt"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                email: user.email
              }
            })

          }
        )
      })

  }
})



module.exports = router;
