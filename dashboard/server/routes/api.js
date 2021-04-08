const express = require('express');
const router = express.Router();
const data = require('./sampledata.json')

/* GET api listing. */
router.get('/', (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
});

module.exports = router;
