const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const router = express.Router();

router.get('/', async (req, res) => {

let league = await User.aggregate(
    [
        {
          '$match': {
            'uid': req.query.uid
          }
        }, {
          '$unwind': {
            'path': '$friendsUID',
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$lookup': {
            'from': 'records',
            'let': {
              'uid': '$friendsUID'
            },
            'as': 'allrecords',
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$and': [
                      {
                        '$eq': [
                          '$uid', '$$uid'
                        ]
                      }, {
                        '$gte': [
                          '$timestamp', new Date(req.query.rangeStart)
                        ]
                      }, {
                        '$lte': [
                          '$timestamp', new Date(req.query.rangeEnd)
                        ]
                      }, {
                        '$gte': [
                          '$timeSpent', 0
                        ]
                      }, {
                        '$lte': [
                          '$timeSpent', 10
                        ]
                      }
                    ]
                  }
                }
              }
            ]
          }
        }, {
          '$unwind': {
            'path': '$allrecords',
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$project': {
            'uid': '$friendsUID',
            'timestamp': '$allrecords.timestamp',
            'timeSpent': '$allrecords.timeSpent'
          }
        }, {
          '$group': {
            '_id': '$uid',
            'session': {
              '$sum': {
                '$cond': {
                  'if': {
                    '$eq': [
                      '$timeSpent', 10
                    ]
                  },
                  'then': 1,
                  'else': 0
                }
              }
            },
            'totalTime': {
              '$sum': '$timeSpent'
            }
          }
        }, {
          '$sort': {
            'session': -1
          }
        }
    ])
    if (!league) return res.status(404).send('No such user');
    console.log(JSON.stringify(league));
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(league));
});


module.exports = router;
