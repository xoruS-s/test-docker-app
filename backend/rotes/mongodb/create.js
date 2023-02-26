const express = require('express');
const User = require("../../databases/mongodb/models");

const router = express.Router();
router.post('/create', (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        patronymic: req.body.patronymic,
        groupname: req.body.groupname,
        studentnumber: req.body.studentnumber,
        educationbegindate: req.body.educationbegindate
    })

    user.save().then(() => { console.log('Студент был добавлен' + '\n' + user) });

    User.find({}, (err, result) => {
        res.status(201).json(result)
        console.log(result)
    })
    console.log(req.body)
})


module.exports = router;