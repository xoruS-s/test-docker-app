// const { Client } = require('@elastic/elasticsearch');
// const elasticConfig = {
//     cloudID: "https://localhost:9200",
//     username: "xoruss",
//     password: "123456789"
// };
// const client = new Client({
//     node: 'https://127.0.0.1:9300',
//     auth: {
//         username: 'xoruss',
//         password: '123456789'
//     },
//     // tls: {
//     //     rejectUnauthorized: false
//     // }
// })
// // console.log(client.Connection)
// client.info()
//     .then(response => console.log("ok"))
//     .catch(error => console.error(error))
//
// // module.exports = client;

const elasticSearch = require('elasticsearch');

const port =  process.env.ELASTICSEARCH_PORT || 9200;

const client =  elasticSearch.Client({
    host: '127.0.0.1:' + port
});

module.exports = {
    client: client,
    connect: (async () => {
        client.info()
            .then(response => console.log(`ES: Подключено - [ Порт: ${port} ]`))
            .catch(error => console.error('ES: Не подключено'))
    })()
}