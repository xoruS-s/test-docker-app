const redis = require('redis');

const port = process.env.PORT || 6380;
const uri = process.env.REDIS_URL || 'redis://localhost:6380';

const redisClient = redis.createClient({
    url: uri
});

module.exports = {
    client: redisClient,
    connect: (async () => {
        try {
            await redisClient.connect();
            if (await redisClient.ping() === 'PONG') {
                console.log('RedisDB: Подключено - [ Порт: ' + port + ' ]');
            } else {
                console.log('RedisDB: Не подключено')
            }
        } catch (err) {
            // console.log(err);
        }
        // const pingCommandResult = await redisClient.ping();
        // await console.log(pingCommandResult);
        // await redisClient.on('error', (err, res) => {
        //     console.log(err);
        //     console.log(res);
        // })
    })()
}