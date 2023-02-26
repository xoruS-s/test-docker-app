import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Create, MongoRead, Update, Delete } from './pages/mongo/index';
import { RedisCreate, RedisRead, RedisUpdate, RedisDelete } from './pages/redis/index';
import { PostgreCreate, PostgreRead, PostgreUpdate, PostgreDelete } from './pages/posgre/index';
// import { Neo4Create, Neo4Read, Neo4Update, Neo4Delete } from './pages/neo4j/index';
import { ElasticCreate, ElasticUpdate, ElasticDelete, ElasticRead } from './pages/elastic/index';
import { Home, Mongo, Redis, Elastic, Postgres, Neo4j } from "./pages/index";

function App() {
  return (
    <div className="App" key={'index'}>
        <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/mongo/">
                <Route path={'create'} element={<Create/>}/>
                <Route path={'read'} element={<MongoRead/>}/>
                <Route path={'update'} element={<Update/>}/>
                <Route path={'delete'} element={<Delete/>}/>
            </Route>
            <Route path="/redis/">
                <Route path={'create'} element={<RedisCreate/>}/>
                <Route path={'read'} element={<RedisRead/>}/>
                <Route path={'update'} element={<RedisUpdate/>}/>
                <Route path={'delete'} element={<RedisDelete/>}/>
            </Route>
            <Route path="/postgre/">
                <Route path={'create'} element={<PostgreCreate/>}/>
                <Route path={'read'} element={<PostgreRead/>}/>
                <Route path={'update'} element={<PostgreUpdate/>}/>
                <Route path={'delete'} element={<PostgreDelete/>}/>
            </Route>
            <Route path="/elastic/">
                <Route path={'create'} element={<ElasticCreate/>}/>
                <Route path={'read'} element={<ElasticRead/>}/>
                <Route path={'update'} element={<ElasticUpdate/>}/>
                <Route path={'delete'} element={<ElasticDelete/>}/>
            </Route>
            {/*<Route path="/neo4j/">*/}
            {/*    <Route path={'create'} element={<Neo4/>}/>*/}
            {/*    <Route path={'read'} element={<PostgreRead/>}/>*/}
            {/*    <Route path={'update'} element={<PostgreUpdate/>}/>*/}
            {/*    <Route path={'delete'} element={<PostgreDelete/>}/>*/}
            {/*</Route>*/}
        </Routes>
    </div>
  );
}

export default App;