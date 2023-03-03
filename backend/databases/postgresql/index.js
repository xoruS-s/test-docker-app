const Pool = require('pg').Pool;

const config_connect = {
    user: 'postgres',
    host: 'localhost',
    database: 'docker_test',
    password: '558226',
    port: 50505
}

const pool = new Pool(config_connect);

module.exports = {
    client: pool,
    // connect: (
    //     pool.query('SELECT NOW()', (err, res) => {
    //         if (err !== undefined) {
    //             console.log('PostgreSQL: Не подключено');
    //         } else {
    //             console.log('PostgreSQL: Подключено успешно - Порт: ' + config_connect.port)
    //         }
    //         // pool.end()
    //     })
    // ),
    connect: (async () => {
        pool.query('SELECT NOW()', (err, res) => {
            if (err !== undefined) {
                console.log('PostgreSQL: Не подключено');
            } else {
                console.log('PostgreSQL: Подключено - [ Порт: ' + config_connect.port + ' ]')
            }
            // pool.end()
        })
    })()
};
