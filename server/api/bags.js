const router = require('express').Router();
const { Bag, Product } = require('../db/models');


router.get('/', (req, res) =>
  Bag.findAll({
    include: [Product]
  })
    .then(bags => {
      res.json(bags)
    })
    .catch(err => console.log("Error:" + err))
);


module.exports = router;

