const router = require('express').Router();
const { Pic } = require('../db/models');
const auth = require('../../middleware/auth')

// router.get('/', auth, (req, res) =>
//   Pic.findAll()
//     .then(pics => {
//       res.json(pics)
//     })
//     .catch(err => console.log("Error:" + err))
// )

module.exports = router;
