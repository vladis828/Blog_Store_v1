const router = require('express').Router();
const { Bag, Product } = require('../db/models');
const auth = require('../../middleware/auth')

//Find All Bags
// router.get('/', auth, (req, res) =>
//   Bag.findAll({
//     include: [Product]
//   })
//     .then(bags => {
//       res.json(bags)
//     })
//     .catch(err => console.log("Error:" + err))
// );


//Increment quantity
router.put('/plus', async (req, res) => {

  await Bag.increment("quantity", {
    by: 1,
    where: {
      id: req.body.id
    }
  }
  )

  const bag = await Bag.findOne({
    where: {
      id: req.body.id
    }
  })

  res.json(bag.quantity)
}
)

//Decrement quantity
router.put('/minus', async (req, res) => {

  const bag = await Bag.findOne({
    where: {
      id: req.body.id
    }
  })

  if (bag.quantity < 2) {
    res.status(401)
  } else {
    await Bag.decrement("quantity", {
      by: 1,
      where: {
        id: req.body.id
      }
    }
    )
    res.json(bag.quantity - 1)
  }
}
)

//Add Products to Bag
router.post('/', async (req, res) => {
  const { userId, productId, productName, productPrice, quantity } = req.body

  const bag = await Bag.findOne({
    where: {
      productId,
      paid: false
    }
  })

  if (bag) {
    await Bag.increment("quantity", { by: quantity, where: { productId } }
    )
    res.status(200)
  } else {
    const newBag = await Bag.create({
      userId,
      productId,
      productName,
      productPrice,
      quantity
    })

    newBag.save()
    res.status(200)
  }
}
)

//Delete product from Bag
router.delete('/delete', async (req, res) => {
  await Bag.destroy({
    where: {
      id: req.body.id
    }
  })
  res.json(req.body.id)
})


//Place Order
router.put('/place', (req, res) => {
  req.body.ids.map(async (id) => {
    await Bag.update({
      paid: true
    },
      {
        where: {
          id: id
        }
      })
  })

  res.json(req.body.ids)
})
module.exports = router;

