const express = require('express');
const User = require("../../databases/mongodb/models");

const router = express.Router();

router.get('/read', (req, res) => {
    User.find({}, (err, result) => {
        res.status(201).json(result)
        console.log(result)
    })
})

module.exports = router;