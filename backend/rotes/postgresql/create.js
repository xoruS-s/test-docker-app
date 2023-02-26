const express = require('express');

const router = express.Router();

const { client } = require('../../databases/postgresql/index');

router.post('/create', (req, res) => {
    let query_text = `INSERT INTO description_course (name_course, description) VALUES ($1, $2) RETURNING *`;
    let values = [
        req.body.name_course,
        req.body.description
    ]
    client.query(query_text, values, (err, result) => {
        if (err !== undefined) {
            console.log('PostgreSQL: Не сохранено');
        } else {
            console.log('PostgreSQL: Курс добавлен');
        }
    });
})


module.exports = router;