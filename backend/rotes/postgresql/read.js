const express = require('express');
// const Pool = require('pg').Pool;
//
// const config_connect = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'docker_test',
//     password: '558226',
//     port: 50505
// }
//
// const pool = new Pool(config_connect);

const { client } = require('../../databases/postgresql/index')

const router = express.Router();

router.get('/read', (req, res) => {
    // (async () => {
    //     const result = await client.query('SELECT * FROM description_course');
    //     res.status(200).json(result);
    //     await client.end()
    // })()

    // client.query('SELECT NOW()', (err, result) => {
    //     console.log(result)
    //     // res.status(200).json(result);
    //     client.end();
    // })

    client.query('select number_week, course_name, "group", firstname, lastname, patronymic, visited from week\n' +
        'JOIN course c on c.id_course = week.id_course\n' +
        'JOIN student s on s.id_student = c.id_student  order by (number_week)', (err, result) => {
        res.status(200).json(result.rows);
    });
});

module.exports = router;