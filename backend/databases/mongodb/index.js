const mongoose = require('mongoose');

const uri = "mongodb://admin:admin@127.0.0.1:27014/docker?authSource=admin"

mongoose.set('strictQuery', false);

module.exports = mongoose.connect(uri)
    .then(res => { console.log('MongoDB: Подключено - Порт: 27014') })
    .catch(res => { console.log('MongoDB: Не подключено') });

