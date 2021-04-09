const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works 1');
});

router.post('/', async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) {
  //     return res.status(400).send(error.details[0].message);
  // }

  let user = new User({ name: req.body.name });

  user = await user.save();

  res.send(user);
});

module.exports = router;
