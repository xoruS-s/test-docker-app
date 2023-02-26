const express = require('express');

const router = express.Router();

const { client } = require('../../databases/neo4j/index');

router.get('/read', (req, res) => {
    const data = [];

    (async () => {
        const result = await client.run(
            'MATCH (n) RETURN n'
        );
        // let labels = result.records.map(record => record.get('n').labels[0]);
        // let names = result.records.map(record => {
        //     return record.get('n').properties.name;
        // });
        // res.status(200).json({ labels, names });
        result.records.map(record => {
            const info = {
                labels: { type: String },
                properties: { type: String }
            }

            info.labels = record.get('n').labels[0];
            info.properties = record.get('n').properties.name;
            data.push(info);
        });
        res.status(200).json(data);
    })()
});

module.exports = router;