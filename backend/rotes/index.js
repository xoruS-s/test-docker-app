// const express = require('express');
//
// const { create_mongo_router, read_mongo_router, update_mongo_router, delete_mongo_router } = require("./mongodb");
// const { create_redis_router, read_redis_router, update_redis_router, delete_redis_router } = require("./redisdb");
// const { create_postgres_router, read_postgres_router, update_postgres_router, delete_postgres_router } = require("./postgresql");
// const { create_neo4j_router, read_neo4j_router, update_neo4j_router, delete_neo4j_router } = require("./neo4j");
//
// const app = express();
//
// const start_routes = () => {
//     //MONGODB
//     app.use('/mongo', create_mongo_router);
//     app.use('/mongo', read_mongo_router);
//     // app.use('/mongo', update_mongo_router);
//     // app.use('/mongo', delete_mongo_router);
//
//     //REDISDB
//     app.use('/redis', create_redis_router);
//     app.use('/redis', read_redis_router);
//     // app.use('/redis', update_redis_router);
//     // app.use('/redis', delete_redis_router);
//
//     //POSTGRESQL
//     app.use('/postgre', create_postgres_router);
//     app.use('/postgre', read_postgres_router);
//     // app.use('/postgre', update_postgre_router);
//     // app.use('/postgre', delete_postgre_router);
//
//     //NEO4J
//     app.use('/neo4j', read_neo4j_router);
// }
//
// module.exports = start_routes;