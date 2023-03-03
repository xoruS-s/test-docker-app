const neo4j = require('neo4j-driver')

const uri = process.env.URI || 'bolt://localhost:7688';
const user = process.env.USER || 'neo4j';
const password = process.env.PWD || '123456';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

module.exports = {
    client: session,
    connect: (async () => {
        try {
            await session.run('Match () Return 1 Limit 1');
            console.log('Neo4j: Подключено - [ Порт: 7688 ]');
        } catch (e) {
            console.log('Neo4j: Не подключено')
        }
    })()
}