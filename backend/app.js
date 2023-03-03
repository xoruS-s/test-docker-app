const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const { create_mongo_router, read_mongo_router, update_mongo_router, delete_mongo_router } = require('./rotes/mongodb/index');
const { create_elastic_router, read_elastic_router, update_elastic_router, delete_elastic_router } = require('./rotes/elasticsearch/index');
const { create_neo4j_router, read_neo4j_router, update_neo4j_router, delete_neo4j_router } = require('./rotes/neo4j/index');
const { create_postgres_router, read_postgres_router, update_postgres_router, delete_postgres_router } = require('./rotes/postgresql/index');
const { create_redis_router, read_redis_router, update_redis_router, delete_redis_router } = require('./rotes/redisdb/index');

const start_mongodb = require('./databases/mongodb/index');
const start_redisdb = require('./databases/redisdb/index');
const start_postgres = require('./databases/postgresql/index');
const start_neo4j = require('./databases/neo4j/index');
const start_elastic = require('./databases/elasticsearch/index');

const app = express();

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

            //MONGODB
app.use('/mongo', create_mongo_router);
app.use('/mongo', read_mongo_router);
// app.use('/mongo', update_mongo_router);
// app.use('/mongo', delete_mongo_router);

            //REDISDB
app.use('/redis', create_redis_router);
app.use('/redis', read_redis_router);
// app.use('/redis', update_redis_router);
// app.use('/redis', delete_redis_router);

            //POSTGRESQL
app.use('/postgre', create_postgres_router);
app.use('/postgre', read_postgres_router);
// app.use('/postgre', update_postgre_router);
// app.use('/postgre', delete_postgre_router);

            //NEO4J
app.use('/neo4j', create_neo4j_router);
app.use('/neo4j', read_neo4j_router);
// app.use('/neo4j', update_neo4j_router);
// app.use('/neo4j', delete_neo4j_router);

            //ELASTICSEARCH
app.use('/elastic', create_elastic_router);
app.use('/elastic', read_elastic_router);
// app.use('/elastic', update_elastic_router);
// app.use('/elastic', delete_elastic_router);

module.exports = app;