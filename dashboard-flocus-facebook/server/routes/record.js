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

// Old api (return an array of all records in json)
// router.get('/', async (req, res) => {

//   console.log("Getting from api with" + req);

//   const record = await Record.find({
//     "uid": req.query.uid,
//     "timestamp": {
//       "$gte": req.query.rangeStart,
//       "$lte": req.query.rangeEnd
//     },
//     "timeSpent": {
//       "$gte": req.query.timeSpentLower,
//       "$lte": req.query.timeSpentUpper
//     }
//   });

//   if (!record) return res.status(404).send('No such user');
//   res.header("Content-Type", 'application/json');
//   res.send(JSON.stringify(record));
// });


// New api (return a summary of 1. completed session & 2. total time spent)
router.get('/', async (req, res) => {

  let record = await Record.aggregate(
    [
      {
        '$match': {
          'uid': req.query.uid,
          'timestamp': {
            '$gte': new Date(req.query.rangeStart),
            '$lte': new Date(req.query.rangeEnd)
          },
          'timeSpent': {
            '$gte': parseInt(req.query.timeSpentLower),
            '$lte': parseInt(req.query.timeSpentUpper)
          }
        }
      }, {
        '$group': {
          '_id': req.query.uid,
          'session': { '$sum': { '$cond': { 'if': { '$eq': ['$timeSpent', parseInt(req.query.timeSpentUpper)] }, 'then': 1, 'else': 0 } } },
          'totalTime': { '$sum': '$timeSpent' }
        }
      }
    ]
  );

  if (!record) return res.status(404).send('No such user');
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(record));
});

module.exports = router;
