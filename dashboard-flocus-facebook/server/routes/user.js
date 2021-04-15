const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const router = express.Router();

/* GET all users */
router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

module.exports = router;
 
