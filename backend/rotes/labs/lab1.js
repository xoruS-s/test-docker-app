const express = require('express');

const router = express.Router();

const { client: client_postgres } = require('../../databases/postgresql/index');
const { client: client_mongo } = require('../../databases/mongodb/index');

const user_schema = require('../../databases/mongodb/models')

let full_data = [];
let str_obj = [];
let final_data = [];
let filtered_data = [];
let data = [];

// TODO: объект для запроса (для подсчета процентов)
// const request = {
//     coursename: { type: String },
//     groupname: { type: String },
//     firstname: { type: String },
//     lastname: { type: String },
//     patronymic: { type: String }
// }
router.post('/lab_1', (req, res) => {
    (async () => {
        const user = await user_schema.find({});

        let beginWeek = '';
        let endWeek = '';

        if (req.body.beginWeek === "" && req.body.endWeek === "") {
            beginWeek = 1;
            endWeek = 18;
        }
        else if (req.body.beginWeek === "" && req.body.endWeek !== "") {
            beginWeek = 1;
            endWeek = req.body.endWeek;
        }
        else if (req.body.beginWeek !== "" && req.body.endWeek === "") {
            beginWeek = req.body.beginWeek;
            endWeek = 18;
        }
        else if (req.body.beginWeek !== "" && req.body.endWeek !== "") {
            beginWeek = req.body.beginWeek;
            endWeek = req.body.endWeek;
        }

        if (req.body.course !== "") {
            client_postgres
                .query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic
                                   FROM students_info
                                   WHERE coursename = '${req.body.course}'
                                   and numberweek >= ${req.body.beginWeek !== "" ? req.body.beginWeek : 1}
                                   and numberweek <= ${req.body.endWeek !== "" ? req.body.endWeek : 18}`)
                .then(result => {
                    for (let i = 0; i < result.rows.length; i++) {
                        const obj  = {
                            groupname: result.rows[i].groupname,
                            firstname: result.rows[i].firstname,
                            lastname: result.rows[i].lastname,
                            patronymic: result.rows[i].patronymic
                        }
                        for (let i = 0; i < user.length; i++) {
                            const obj_2 = {
                                groupname: user[i].groupname,
                                firstname: user[i].firstname,
                                lastname: user[i].lastname,
                                patronymic: user[i].patronymic
                            }
                            if (JSON.stringify(obj) === JSON.stringify(obj_2)) {
                                full_data.push(obj)
                            }
                        }
                    }
                    for (let i = 0; i < full_data.length; i++) {
                        str_obj.push(JSON.stringify(full_data[i]))
                    }
                    const findDuplicates = (arr) => {
                        const filtered = arr.filter((item, index) => {
                            return arr.indexOf(item) === index
                        });
                        return [...new Set(filtered)];
                    }
                    let tmp = findDuplicates(str_obj);
                    for (const key in tmp) {
                        filtered_data.push(JSON.parse(tmp[key]))
                    }

                    (async () => {
                        for (const fdK in filtered_data) {
                            await client_postgres
                                .query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic FROM students_info
                                WHERE groupname = '${filtered_data[fdK].groupname}'
                                and coursename = '${result.rows[fdK].coursename}' // дописал проверку на курс (т.к. выводились все записи по студенту, ключая ненужные курсы)
                                and firstname = '${filtered_data[fdK].firstname}'
                                and lastname = '${filtered_data[fdK].lastname}'
                                and patronymic = '${filtered_data[fdK].patronymic}'`)
                                .then(res => {
                                    for (const rrK in res.rows) {
                                        (async () => {
                                            const data = {
                                                numberweek: { type: String },
                                                coursename: { type: String },
                                                groupname: { type: String },
                                                firstname: { type: String },
                                                lastname: { type: String },
                                                patronymic: { type: String },
                                                studentnumber: { type: String },
                                                educationbegindate: { type: Date },
                                                percent_visits: { type: String }
                                            }

                                            const data_mongo = await user_schema.findOne({
                                                'groupname': res.rows[rrK].groupname,
                                                'firstname': res.rows[rrK].firstname,
                                                'lastname': res.rows[rrK].lastname,
                                                'patronymic': res.rows[rrK].patronymic
                                            });

                                            // data.numberweek = `${beginWeek} - ${endWeek}`;
                                            data.numberweek = res.rows[rrK].numberweek;
                                            data.coursename = res.rows[rrK].coursename;
                                            data.groupname = res.rows[rrK].groupname;
                                            data.firstname = res.rows[rrK].firstname;
                                            data.lastname = res.rows[rrK].lastname;
                                            data.patronymic = res.rows[rrK].patronymic;
                                            data.studentnumber = data_mongo.studentnumber;
                                            data.educationbegindate = data_mongo.educationbegindate;
                                            data.percent_visits = '10'

                                            //TODO: Пытаюсь засунуть данные для запроса (но надо длеать массив)
                                            // request.coursename = result.rows[fdK].coursename;
                                            // request.groupname = result.rows[fdK].groupname;
                                            // request.firstname = result.rows[fdK].firstname;
                                            // request.lastname = result.rows[fdK].lastname;
                                            // request.patronymic = result.rows[fdK].patronymic;

                                            final_data.push(data);
                                        })()
                                    }
                                })
                                .catch(err => { console.log('Запрос провален!') })
                        }
                    })()
                })
                .catch(err => {
                    console.log('err')
                })
        } else {
            client_postgres.query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic FROM students_info`)
                .then(result => {
                    // res.status(200).json(result.rows);
                    for (let i = 0; i < result.rows.length; i++) {
                        data.push(result.rows[i])
                    }
                    // data.push(result.rows)
                    // console.log('ok')
                })
                .catch(err => {
                    console.log('err')
                })
        }
    })();
})
router.get('/lab_1', (req, res) => {
    // TODO: попробовать пройтись по final_data и от туда запрашивать по данным (курс, группа, ФИО)
    // console.log(request);
    res.status(200).json(final_data);
    final_data = [];
})


module.exports = router;