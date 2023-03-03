const express = require('express');

const router = express.Router();

const { client } = require('../../databases/neo4j/index');

router.get('/read', (req, res) => {
    const data = [];

    (async () => {
        const result = await client.run(
            'MATCH (student:Student)-[:CONTAINS_IN]->(group)-[:CONTAINS_IN]->(course) RETURN course.name, group.name, student.name'
        );
        // let labels = result.records.map(record => record.get('n').labels[0]);
        // let names = result.records.map(record => {
        //     return record.get('n').properties.name;
        // });
        // res.status(200).json({ labels, names });

        // result.records.map(record => {
        //     const info = {
        //         labels: { type: String },
        //         properties: { type: String }
        //     }
        //
        //     info.labels = record.get('n').labels[0];
        //     info.properties = record.get('n').properties.name;
        //     data.push(info);
        // });

        // result.records.map(record => {
        //     const info = {
        //         course: { type: String },
        //         group: { type: String },
        //         student_card_num: { type: String }
        //     }
        //
        //     info.course = record.get('n').properties.course;
        //     info.group = record.get('n').properties.group;
        //     info.student_card_num = record.get('n').properties.student;
        // })

        // const row = [];
        //
        // result.records.map(record => {
        //     const info = {
        //         course: { type: String },
        //         group: { type: String },
        //         student_card_num: { type: String }
        //     }
        //
        //     row.push(record.get('n').course.name);
        // })
        //
        // // for (const key in row) {
        // //     info.course = row[key];
        // // }
        // console.log(row);

        result.records.map(record => {
            const info = {
                course: { type: String },
                group: { type: String },
                student_card_num: { type: String }
            }
            info.course = record.get('course.name');
            info.group = record.get('group.name');
            info.student_card_num = record.get('student.name');

            data.push(info);
        })

        res.status(200).json(data);
    })()
});

module.exports = router;