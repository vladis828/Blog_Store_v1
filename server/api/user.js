const router = require('express').Router()
const { User, Bag } = require('../db/models')
const auth = require('../../middleware/auth')

router.get('/', auth, (req, res) => {
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
})

module.exports = router;
