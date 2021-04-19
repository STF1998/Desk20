const express = require('express');
const mongoose = require('mongoose');
const Record = require('../../models/Record');
const router = express.Router();

router.post('/', async (req, res) => {

  let record = new Record({
    uid: req.body.uid,
    timestamp: req.body.timestamp,
    timeSpent: req.body.timeSpent
  });

  record = await record.save();
  res.send(record);
});

router.get('/', async (req, res) => {

  console.log("Getting from api with" + req);

  const record = await Record.find({
    "uid": req.query.uid,
    "timestamp": {
      "$gte": req.query.rangeStart,
      "$lte": req.query.rangeEnd
    },
    "timeSpent": {
      "$gte": req.query.timeSpentLower,
      "$lte": req.query.timeSpentUpper
    }
  });

  if (!record) return res.status(404).send('No such user');
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(record));
});

module.exports = router;
