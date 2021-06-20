const router = require('express').Router()
const { User, Bag } = require('../db/models')

router.get('/', (req, res) => {
  User.findAll({
    include: [Bag]
  })
    .then(users => {
      res.json(users)
    })
    .catch(err => console.log("Error:" + err))
})


module.exports = router;
