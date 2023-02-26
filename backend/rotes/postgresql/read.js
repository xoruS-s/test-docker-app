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

    //ПЕРЕДЕЛАТЬ - не те данные, нужны - посещение лекций
    client.query('SELECT * FROM description_course', (err, result) => {
        if (err !== undefined) {
            console.log('PostgreSQL: Не подключено');
        } else {
            // console.log(res.rows);
            res.status(200).json(result.rows);
        }
        // client.end()
    })
});

module.exports = router;