const router = require('express').Router()
const { User, Bag } = require('../db/models')
const auth = require('../../middleware/auth')

router.get('/', auth, (req, res) => {
  if (req.user) {
    User.findByPk(req.user.id,
      {
        include: [Bag],
        attributes: {
          exclude: ["password"]
        }
      })
      .then(user => {
        res.json(user)
      })
  } else {
    res.send('Token is not valid')
  }

})

module.exports = router;
