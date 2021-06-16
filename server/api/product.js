const router = require('express').Router();
const Product = require('../db/Product');

router.get('/', (req, res) => {
  Product.findAll()
    .then(products => {
      res.json(products)
    })
    .catch(err => console.log("Error:" + err))
}
);

//Add dummy data to Products table

// router.get('/add', (req, res) => {
//   Product.create({
//     name: "Dish One",
//     pictures: "Picture 1",
//     recipe: "Recipe One",
//     price: 100,
//     type: "Main",
//     description: "BlaBlaBla 1"
//   });
//   Product.create({
//     name: "Dish Two",
//     pictures: "Picture 2",
//     recipe: "Recipe Two",
//     price: 200,
//     type: "Desert",
//     description: "BlaBlaBla 2"
//   });
//   Product.create({
//     name: "Dish Three",
//     pictures: "Picture 3",
//     recipe: "Recipe Three",
//     price: 300,
//     type: "Main dish",
//     description: "BlaBlaBla 3"
//   })
// }
// )


module.exports = router;
