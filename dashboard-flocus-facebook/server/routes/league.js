const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const router = express.Router();

router.get('/', async (req, res) => {

  console.log(req.query.uid);
  console.log(req.query.rangeStart);
  console.log(req.query.rangeEnd);

let league = await User.aggregate(


  [
    {
      '$match': {
        'uid': req.query.uid
      }
    }, {
      '$unwind': {
        'path': '$friendsUID', 
        'includeArrayIndex': 'uid_index', 
        'preserveNullAndEmptyArrays': false
      }
    }, {
      '$unwind': {
        'path': '$friends', 
        'includeArrayIndex': 'name_index', 
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$project': {
        'uid_index': 1, 
        'name_index': 1, 
        'friends': 1, 
        'friendsUID': 1, 
        'compare': {
          '$cmp': [
            '$uid_index', '$name_index'
          ]
        }
      }
    }, {
      '$match': {
        'compare': 0
      }
    }, {
      '$project': {
        'friends': 1, 
        'friendsUID': 1
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
                      '$timeSpent', parseInt(req.query.timeSpentLower)
                    ]
                  }, {
                    '$lte': [
                      '$timeSpent', parseInt(req.query.timeSpentUpper)
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
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$project': {
        'name': '$friends', 
        'uid': '$friendsUID', 
        'timestamp': '$allrecords.timestamp', 
        'timeSpent': '$allrecords.timeSpent'
      }
    }, {
      '$group': {
        '_id': '$uid', 
        'name': {
          '$first': '$name'
        }, 
        'session': {
          '$sum': {
            '$cond': {
              'if': {
                '$eq': [
                  '$timeSpent', parseInt(req.query.timeSpentUpper)
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
