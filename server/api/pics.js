const router = require('express').Router();
const { Pic } = require('../db/models');


router.get('/', (req, res) =>
  Pic.findAll()
    .then(pics => {
      res.json(pics)
    })
    .catch(err => console.log("Error:" + err))
)

module.exports = router;
