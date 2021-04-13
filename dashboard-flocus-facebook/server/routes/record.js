const express = require('express');
const mongoose = require('mongoose');
const Record = require('../../models/Record');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('get record not implemented yet');
});

router.post('/', async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) {
  //     return res.status(400).send(error.details[0].message);
  // }
  // const user = await User.findById(req.body.genreId);

  let record = new Record({ 
    uid: req.body.uid,
    timestamp: req.body.timestamp,
    timeSpent: req.body.timeSpent
  });

  record = await record.save();
  


  res.send(record);
});




module.exports = router;
