const express = require('express');

const router = express.Router();

const { client } = require('../../databases/elasticsearch/index');

router.get('/read', (req, res) => {
    const data = [];
    (async () => {
        const document = await client.search();

        for (let i = 0; i < (document.hits.hits).length; i++) {
            const info = {
                id: { type: String },
                index: { type: String },
                name: { type: String },
                description: { type: String }
            }

            info.id = document.hits.hits[i]._id;
            info.index = document.hits.hits[i]._index;
            info.name = document.hits.hits[i]._source.name;
            info.description = document.hits.hits[i]._source.description;
            data.push(info);
        }

        res.status(200).json(data);
    })()
});

module.exports = router;