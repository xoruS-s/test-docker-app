const express = require('express');

const router = express.Router();

// const { client: mongo_cli } = require('../../databases/mongodb/index');
const user_schema = require('../../databases/mongodb/models');

const { client: postgres_cli } = require('../../databases/postgresql/index');
const { client: elastic_cli } = require('../../databases/elasticsearch/index');

let courses = [];
let users = [];
let data = [];
router.post('/lab_2', (req, res) => {
    (async () => {
        users = [];
        courses = [];

        const user = await user_schema.find(req.body.groupname !== '' ? { "groupname": req.body.groupname } : {});

        // const body = await elastic_cli.search({
        //     index: 'courses',
        //     body: {
        //         query: {
        //             match: { name: 'РБПО-03' }
        //         }
        //     }
        // })
        // console.log(body.hits.hits)

        for (const ukey in user) {
            await (async () => {
                postgres_cli
                    .query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic
                            FROM students_info
                            WHERE groupname = '${user[ukey].groupname}'
                            AND firstname = '${user[ukey].firstname}'
                            AND lastname = '${user[ukey].lastname}'
                            AND patronymic = '${user[ukey].patronymic}'`)
                    .then(result => {
                        users.push(user[ukey]);
                        for (const rrkey in result.rows) {
                            courses.push(JSON.stringify(result.rows[rrkey].coursename));
                        }
                    })
            })()
        }
    })()
});

router.get('/lab_2', (req, res) => {
    const data_view = async () => {
        let courses_filtered = [];

        const findDuplicates = (arr) => {
            const filtered = arr.filter((item, index) => {
                return arr.indexOf(item) === index
            });
            return [...new Set(filtered)];
        }
        let tmp = findDuplicates(courses);
        for (const key in tmp) {
            courses_filtered.push(JSON.parse(tmp[key]))
        }

        for (const cfkey in courses_filtered) {
            await (async () => {
                const course = await elastic_cli.search({
                    index: 'courses',
                    body: {
                        query: {
                            match: { name: courses_filtered[cfkey] }
                        }
                    }
                });
            })()
        }

        let course_desc = '';
        for (const cfkey in courses_filtered) {
            await (async () => {
                let course = await elastic_cli.search({
                    index: 'courses',
                    body: {
                        query: {
                            match: { name: courses_filtered[cfkey] }
                        }
                    }
                });
                course_desc = course.hits.hits[0]._source.description;
                // console.log(course.hits.hits[0]._source.name + '----' + course.hits.hits[0]._source.description);
                // console.log(course.hits.hits[0]._source)
            })();

            for (const ukey in users) {
                await (async () => {
                    postgres_cli
                        .query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic
                            FROM students_info
                            WHERE groupname = '${users[ukey].groupname}'
                            AND coursename = '${courses_filtered[cfkey]}'
                            AND firstname = '${users[ukey].firstname}'
                            AND lastname = '${users[ukey].lastname}'
                            AND patronymic = '${users[ukey].patronymic}'`)
                        .then(result => {
                            let all_hours = 0;
                            let visited_hours = 0;

                            for (const rrkey in result.rows) {
                                all_hours++;
                                if (result.rows[rrkey].visited === '+') {
                                    visited_hours++;
                                }
                            }

                            let obj = {
                                groupname: users[ukey].groupname,
                                coursename: courses_filtered[cfkey],
                                studentnumber: users[ukey].studentnumber,
                                lastname: users[ukey].lastname,
                                firstname: users[ukey].firstname,
                                patronymic: users[ukey].patronymic,
                                educationbegindate: users[ukey].educationbegindate,
                                allhours: all_hours * 2,
                                visitedhours: visited_hours * 2,
                                descriptioncourse: course_desc
                            }

                            data.push(obj)
                        })
                })()
            }
        }
    }
    data_view().then(() => {
        res.status(200).json(data);
        data = [];
    })
});

module.exports = router;