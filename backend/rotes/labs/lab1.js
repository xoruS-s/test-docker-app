const express = require('express');

const router = express.Router();

const { client: client_postgres } = require('../../databases/postgresql/index');
const { client: client_mongo } = require('../../databases/mongodb/index');

const user_schema = require('../../databases/mongodb/models');

let full_data = [];
let str_obj = [];
let final_data = [];
let filtered_data = [];
let sum_academic_hours = [];
let dataset_arr = [];
let beginWeek = 0;
let endWeek = 0;
let view_data = [];

let all_data_get = [];

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

        full_data = [];
        str_obj = [];
        final_data = [];
        filtered_data = [];
        dataset_arr = [];

        beginWeek = req.body.beginWeek !== "" ?  req.body.beginWeek : 1;
        endWeek = req.body.endWeek !== "" ? req.body.endWeek : 18;

        // let beginWeek = '';
        // let endWeek = '';
        //
        // if (req.body.beginWeek === "" && req.body.endWeek === "") {
        //     beginWeek = 1;
        //     endWeek = 18;
        // }
        // else if (req.body.beginWeek === "" && req.body.endWeek !== "") {
        //     beginWeek = 1;
        //     endWeek = req.body.endWeek;
        // }
        // else if (req.body.beginWeek !== "" && req.body.endWeek === "") {
        //     beginWeek = req.body.beginWeek;
        //     endWeek = 18;
        // }
        // else if (req.body.beginWeek !== "" && req.body.endWeek !== "") {
        //     beginWeek = req.body.beginWeek;
        //     endWeek = req.body.endWeek;
        // }

        if (req.body.course !== "") {
            client_postgres
                .query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic
                                   FROM students_info
                                   WHERE coursename = '${req.body.course}'
                                   and numberweek >= ${req.body.beginWeek !== "" ? req.body.beginWeek : 1}
                                   and numberweek <= ${req.body.endWeek !== "" ? req.body.endWeek : 18}`)
                .then(result => {

                    let groups = [];
                    let tmp_groups = [];
                    let tmp_groups_2 = [];
                    let tmp_groups_3 = [];

                    for (const rrkey in result.rows) {
                        const tmp_obj = {
                            groupname: { type: String },
                            numberweek: { type: Number }
                        }
                        tmp_obj.groupname = result.rows[rrkey].groupname;
                        tmp_obj.numberweek = result.rows[rrkey].numberweek;
                        groups.push(tmp_obj)
                    }

                    for (const gk in groups) {
                        tmp_groups.push(groups[gk].groupname)
                    }

                    const filtered_group = tmp_groups.filter((item, index) => {
                        return tmp_groups.indexOf(item) === index
                    })
                    let same_group = [...new Set(filtered_group)]

                    for (const sgkey in same_group) {
                        const obj = {
                            groupname: { type: String },
                            numberweeks: []
                        }
                        for (const gk in groups) {
                            if (same_group[sgkey] === groups[gk].groupname) {
                                obj.numberweeks.push(groups[gk].numberweek)
                            }
                        }
                        obj.groupname = same_group[sgkey]
                        tmp_groups_2.push(obj)
                    }
                    for (const tg2key in tmp_groups_2) {
                        const obj = {
                            groupname: tmp_groups_2[tg2key].groupname,
                            numberweeks: []
                        }

                        const filtered = (tmp_groups_2[tg2key].numberweeks).filter((item, index) => {
                            return (tmp_groups_2[tg2key].numberweeks).indexOf(item) === index
                        });
                        obj.numberweeks = [...new Set(filtered)];
                        tmp_groups_3.push(obj)
                    }
                    for (const tg3key in tmp_groups_3) {
                        const obj = {
                            groupname: tmp_groups_3[tg3key].groupname,
                            sum_hours: tmp_groups_3[tg3key].numberweeks.length
                        }
                        sum_academic_hours.push(obj)
                    }

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

                    //TODO: искать недели на которых был курс по группе

                    // for (const rrkey in result.rows) {
                    //     console.log(result.rows[rrkey])
                    // }

                    (async () => {
                        for (const fdkey in filtered_data) {
                            const tmp_obj = {
                                coursename: req.body.course,
                                groupname: filtered_data[fdkey].groupname,
                                lastname: filtered_data[fdkey].lastname,
                                firstname: filtered_data[fdkey].firstname,
                                patronymic: filtered_data[fdkey].patronymic
                            }
                            final_data.push(tmp_obj)
                        }
                    })()

                    // (async () => {
                    //     for (const fdK in filtered_data) {
                    //         await client_postgres
                    //             .query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic FROM students_info
                    //                     WHERE groupname = '${filtered_data[fdK].groupname}'
                    //                     and coursename = '${result.rows[fdK].coursename}'
                    //                     and firstname = '${filtered_data[fdK].firstname}'
                    //                     and lastname = '${filtered_data[fdK].lastname}'
                    //                     and patronymic = '${filtered_data[fdK].patronymic}'`)
                    //             .then(res => {
                    //                 for (const rrK in res.rows) {
                    //                     (async () => {
                    //                         const data = {
                    //                             numberweek: { type: String },
                    //                             coursename: { type: String },
                    //                             groupname: { type: String },
                    //                             firstname: { type: String },
                    //                             lastname: { type: String },
                    //                             patronymic: { type: String },
                    //                             studentnumber: { type: String },
                    //                             educationbegindate: { type: Date },
                    //                             percent_visits: { type: String }
                    //                         }
                    //
                    //                         const data_mongo = await user_schema.findOne({
                    //                             'groupname': res.rows[rrK].groupname,
                    //                             'firstname': res.rows[rrK].firstname,
                    //                             'lastname': res.rows[rrK].lastname,
                    //                             'patronymic': res.rows[rrK].patronymic
                    //                         });
                    //
                    //                         // data.numberweek = `${beginWeek} - ${endWeek}`;
                    //                         data.numberweek = res.rows[rrK].numberweek;
                    //                         data.coursename = res.rows[rrK].coursename;
                    //                         data.groupname = res.rows[rrK].groupname;
                    //                         data.firstname = res.rows[rrK].firstname;
                    //                         data.lastname = res.rows[rrK].lastname;
                    //                         data.patronymic = res.rows[rrK].patronymic;
                    //                         data.studentnumber = data_mongo.studentnumber;
                    //                         data.educationbegindate = data_mongo.educationbegindate;
                    //                         data.percent_visits = '10'
                    //
                    //                         final_data.push(data);
                    //                     })()
                    //                 }
                    //             })
                    //             .catch(err => { console.log('Запрос провален!') })
                    //     }
                    // })()
                })
                .catch(err => {
                    console.log('err')
                })
        } else {
            // client_postgres.query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic FROM students_info`)
            //     .then(result => {
            //         // res.status(200).json(result.rows);
            //         for (let i = 0; i < result.rows.length; i++) {
            //             data.push(result.rows[i])
            //         }
            //         // data.push(result.rows)
            //         // console.log('ok')
            //     })
            //     .catch(err => {
            //         console.log('err')
            //     })
        }
    })();
})
router.get('/lab_1', (req, res) => {
    // const view = async () => {
    //     dataset_arr = [];
    //     for (const key in final_data) {
    //         await client_postgres.query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic FROM students_info WHERE coursename = '${final_data[key].coursename}' AND groupname = '${final_data[key].groupname}' AND firstname = '${final_data[key].firstname}' AND lastname = '${final_data[key].lastname}' AND patronymic = '${final_data[key].patronymic}'`)
    //             .then(res => {
    //                 for (const rrkey in res.rows) {
    //                     dataset_arr.push(res.rows[rrkey])
    //                 }
    //             })
    //     }
    // }
    //
    // view().then(() => {
    //     res.status(200).json(dataset_arr);
    // })

    const view_data = async () => {
        dataset_arr.splice(0, dataset_arr.length);
        for (const fdkey in final_data) {
            await client_postgres.query(`SELECT numberweek, coursename, visited, groupname, firstname, lastname, patronymic 
                                         FROM students_info 
                                         WHERE coursename = '${final_data[fdkey].coursename}' 
                                         AND groupname = '${final_data[fdkey].groupname}' 
                                         AND firstname = '${final_data[fdkey].firstname}' 
                                         AND lastname = '${final_data[fdkey].lastname}' 
                                         AND patronymic = '${final_data[fdkey].patronymic}'
                                         AND numberweek >= ${beginWeek}
                                         AND numberweek <= ${endWeek}`)
                .then(async result => {
                    let current_group = '';
                    let sum_hours = 0; // кол-во пар всего за курс
                    let sum_visits = 0; // количество посещений на студента
                    let str_obj = []; // массив с объектами (в виде строк) - для сравнения
                    let filtered_data_get = [];

                    for (let i = 0; i < result.rows.length; i++) {
                        let student = {
                            coursename: result.rows[i].coursename,
                            groupname: result.rows[i].groupname,
                            firstname: result.rows[i].firstname,
                            lastname: result.rows[i].lastname,
                            patronymic: result.rows[i].patronymic
                        };
                        str_obj.push(JSON.stringify(student))

                        if (result.rows[i]['visited'] === '+') {
                            sum_visits++;
                        }
                    }
                    // console.log('GROUP: ' + current_group, 'SUM_HOURS: ' + sum_hours, 'SUM_VISITS: ' + sum_visits)

                    // AND numberweek >= '${beginWeek}' AND numberweek <= '${endWeek}'
                    const findDuplicates = (arr) => {
                        const filtered = arr.filter((item, index) => {
                            return arr.indexOf(item) === index
                        });
                        return [...new Set(filtered)];
                    }
                    let tmp = findDuplicates(str_obj);
                    for (const key in tmp) {
                        current_group = JSON.parse(tmp[key]).groupname;
                        filtered_data_get.push(JSON.parse(tmp[key]))
                    }

                    for (const sahkey in sum_academic_hours) {
                        if (sum_academic_hours[sahkey].groupname === current_group) {
                            sum_hours = sum_academic_hours[sahkey].sum_hours
                        }
                    }

                    let percent = Math.round((sum_visits * 100) / sum_hours);

                    // console.log(filtered_data_get, 'ACADEMIC: ' + sum_hours, 'VISITED: ' + sum_visits, 'ПРОЦЕНТ ПОСЕЩЕНИЙ: ' + percent);

                    const user_mongo = await user_schema.find({
                        'groupname': filtered_data_get[0].groupname,
                        'firstname': filtered_data_get[0].firstname,
                        'lastname': filtered_data_get[0].lastname,
                        'patronymic': filtered_data_get[0].patronymic
                    })

                    const send_data = {
                        coursename: result.rows[0].coursename,
                        studentnumber: user_mongo[0].studentnumber,
                        percentage: percent
                    }

                    const dataset = {
                        groupname: { type: String },
                        lastname: { type: String },
                        firstname: { type: String },
                        patronymic: { type: String },
                        studentnumber: { type: String },
                        educationbegindate: { type: String },
                        percent: { type: String },
                        sum_hours: { type: Number }
                    }

                    dataset.groupname = final_data[fdkey].groupname;
                    dataset.lastname = final_data[fdkey].lastname;
                    dataset.firstname = final_data[fdkey].firstname;
                    dataset.patronymic = final_data[fdkey].patronymic;
                    dataset.studentnumber = send_data.studentnumber;
                    dataset.educationbegindate = user_mongo[0].educationbegindate;
                    dataset.percent = send_data.percentage;
                    dataset.sum_hours = sum_hours;

                    dataset_arr.push(dataset);


                    // for (const fdkey in final_data) {
                    //     if (final_data[fdkey].studentnumber === send_data.studentnumber) {
                    //
                    //         //TODO: Выводит слишком много разных данных, нужно просмотреть в чем проблема
                    //     }
                    // }
                    // for (const tdkey in dumb_final_data) {
                    //     console.log(final_data)
                        // if (final_data[fdkey].studentnumber === send_data.studentnumber) {
                        //     dataset.groupname = dumb_final_data[tdkey].groupname;
                        //     dataset.lastname = dumb_final_data[tdkey].lastname;
                        //     dataset.firstname = dumb_final_data[tdkey].firstname;
                        //     dataset.patronymic = dumb_final_data[tdkey].patronymic;
                        //     dataset.studentnumber = send_data.studentnumber;
                        //     dataset.educationbegindate = user_mongo[0].educationbegindate;
                        //     dataset.percent = send_data.percentage;
                        //
                        //     console.log(dataset)
                        //
                        //     dataset_arr.push(dataset);
                        //     //TODO: Выводит слишком много разных данных, нужно просмотреть в чем проблема
                        // }
                    // }
                })
        }
    }

    view_data().then(() => {
        let data = [];
        let percents = [];
        for (const dakey in dataset_arr) {
            percents.push(dataset_arr[dakey].percent);
        }

        percents = dataset_arr.sort((a, b) => a.percent - b.percent);
        // console.log(percents)
        for (let i = 0; i < 10; i++) {
            if (percents[i] !== undefined) {
                data.push(percents[i])
            }
        }

        // console.log(data)
        res.status(200).json(data);
        data = [];
    })

    // for (const key in final_data) {
    //     const view = async () => {
    //         client_postgres.query(`SELECT * FROM students_info`)
    //             .then(async res => {
    //                 for (const rrkey in res.rows) {
    //                     dataset_arr.push(res.rows[rrkey])
    //                 }
    //             })
    //     }
    // }
    // (async () => {
    //
    // })().then(() => {
    //     console.log(dataset_arr)
    // })
    // send_data()
    //     .then(() => {
    //         console.log(dataset_arr)
    //     })
    //     .catch((e) => {
    //         console.log('err')
    //     })
    // res.status(200).json(dataset_arr); //TODO: Придумать как сделать последовательные действия (массив пустой отправляет)
    // (async () => {
    //     res.status(200).json(dataset_arr);
    // })();

    dataset_arr = [];
})

module.exports = router;