import React from 'react';
import { Link } from "react-router-dom";

import './pages.css';
const Home = () => {
    return (
        <div>
            <div className={'home_body'}>
                <div className={"home_link"}>
                    <p style={{ textAlign: 'center' }}>MongoDB</p>
                    <Link to="/mongo/create" style={{textDecoration: "none"}}><div className={"link"}>CREATE</div></Link>
                    <Link to="/mongo/read" style={{textDecoration: "none"}}><div className={"link"}>READ</div></Link>
                    <Link to="/mongo/update" style={{textDecoration: "none"}}><div className={"link"}>UPDATE</div></Link>
                    <Link to="/mongo/delete" style={{textDecoration: "none"}}><div className={"link"}>DELETE</div></Link>
                </div>
                <div className={"home_link"}>
                    <p style={{ textAlign: 'center' }}>ElasticSearch</p>
                    <Link to="/elastic/create" style={{textDecoration: "none"}}><div className={"link"}>CREATE</div></Link>
                    <Link to="/elastic/read" style={{textDecoration: "none"}}><div className={"link"}>READ</div></Link>
                    <Link to="/elastic/update" style={{textDecoration: "none"}}><div className={"link"}>UPDATE</div></Link>
                    <Link to="/elastic/delete" style={{textDecoration: "none"}}><div className={"link"}>DELETE</div></Link>
                </div>
                <div className={"home_link"}>
                    <p style={{ textAlign: 'center' }}>PostgreSQL</p>
                    <Link to="/postgres/create" style={{textDecoration: "none"}}><div className={"link"}>CREATE</div></Link>
                    <Link to="/postgres/read" style={{textDecoration: "none"}}><div className={"link"}>READ</div></Link>
                    <Link to="/postgres/update" style={{textDecoration: "none"}}><div className={"link"}>UPDATE</div></Link>
                    <Link to="/postgres/delete" style={{textDecoration: "none"}}><div className={"link"}>DELETE</div></Link>
                </div>
                <div className={"home_link"}>
                    <p style={{ textAlign: 'center' }}>RedisDB</p>
                    <Link to="/redis/create" style={{textDecoration: "none"}}><div className={"link"}>CREATE</div></Link>
                    <Link to="/redis/read" style={{textDecoration: "none"}}><div className={"link"}>READ</div></Link>
                    <Link to="/redis/update" style={{textDecoration: "none"}}><div className={"link"}>UPDATE</div></Link>
                    <Link to="/redis/delete" style={{textDecoration: "none"}}><div className={"link"}>DELETE</div></Link>
                </div>
                <div className={"home_link"}>
                    <p style={{ textAlign: 'center' }}>Neo4j</p>
                    <Link to="/neo4j/create" style={{textDecoration: "none"}}><div className={"link"}>CREATE</div></Link>
                    <Link to="/neo4j/read" style={{textDecoration: "none"}}><div className={"link"}>READ</div></Link>
                    <Link to="/neo4j/update" style={{textDecoration: "none"}}><div className={"link"}>UPDATE</div></Link>
                    <Link to="/neo4j/delete" style={{textDecoration: "none"}}><div className={"link"}>DELETE</div></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;