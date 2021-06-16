const router = require('express').Router();
const Cart = require('../db/Cart');

//Add dummy data to Cart table

// router.get('/add', (req, res) => {
//   Cart.create({
//     name: 'Kartoshka',
//     quantity: 3,
//     price: 30
//   })
// })


router.get('/', (req, res) =>
  Cart.findAll()
    .then(cart => {
      res.json(cart)
    })
    .catch(err => console.log("Error:" + err))
);


module.exports = router;
