const express = require('express');

const router = express.Router();

const { client } = require('../../databases/redisdb/index');

router.post('/create', (req, res) => {
    const info = {
        fio: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            patronymic: req.body.patronymic,
        },
        student_card_num: req.body.student_card_num
    };
    (async () => {
        await client.hSet(info.student_card_num, info.fio);
    })()
    console.log(info)
})


module.exports = router;