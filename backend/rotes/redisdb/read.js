const express = require('express');
const { client } = require('../../databases/redisdb/index');

const router = express.Router();

router.get('/read', (req, res) => {
    let fetch_data = [];

    (async () => {
        const keys = await client.keys('*');
        for (let item in keys) {
            let all_data = {
                student_card_num: { type: String },
                firstname: { type: String },
                lastname: { type: String },
                patronymic: { type: String }
            };

            all_data.student_card_num = keys[item];

            let info = await client.hGetAll(keys[item]);
            all_data.firstname = info["firstname"];
            all_data.lastname = info["lastname"];
            all_data.patronymic = info["patronymic"];

            fetch_data.push(all_data)
        }

        // console.log(fetch_data)

        res.status(201).json(fetch_data);
    })()
});

module.exports = router;