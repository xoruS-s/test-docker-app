const express = require('express');

const router = express.Router();

const { client } = require('../../databases/neo4j/index');

router.post('/create', (req, res) => {
    (async () => {
        const data = {
            course: req.body.course,
            group: req.body.group,
            student_card_num: req.body.student_card_num
        }
        await client.run(
            `MERGE (course:Course {name: '${data.course}'})\n` +
            `MERGE (group:Group {name: '${data.group}'})\n` +
            `MERGE (student:Student {name: '${data.student_card_num}'})\n` +
            `MERGE (student)-[:CONTAINS_IN]->(group)-[:CONTAINS_IN]->(course)`
        );
        console.log('Связь создана');

    })()
});

module.exports = router;