const { client: postgres_client } = require('../databases/postgresql/index');
const { client: mongo_client } = require('../databases/mongodb/index');

const user_schema = require('../databases/mongodb/models');

const FillData = async () => {
    const user = await user_schema.find({});

    let filled_data = [];

    let courses = ['РБПО-01', 'РБПО-02', 'РБПО-03'];
    const visits = ['+', '-'];

    for (const ckey in courses) {
        for (let i = 0; i < 5; i++) {
            for (const ukey in user) {
                let obj = {
                    coursename: courses[ckey],
                    numberweek: i + 1,
                    groupname: user[ukey].groupname,
                    lastname: user[ukey].lastname,
                    firstname: user[ukey].firstname,
                    patronymic: user[ukey].patronymic,
                    visited: visits[Math.round(0 - 0.5 + Math.random() * visits.length)]
                }
                filled_data.push(obj)
            }
        }
    }
    // console.log(filled_data)

    // for (const fdkey in filled_data) {
    //     postgres_client
    //         .query(`INSERT INTO students_info (numberweek, coursename, groupname, firstname, lastname, patronymic, visited)
    //             VALUES ($1, $2, $3, $4, $5, $6, $7)`, [filled_data[fdkey].numberweek, filled_data[fdkey].coursename, filled_data[fdkey].groupname, filled_data[fdkey].firstname, filled_data[fdkey].lastname, filled_data[fdkey].patronymic, filled_data[fdkey].visited])
    //         .then((res) => {
    //             // console.log(res.rows);
    //         })
    // }
}
FillData().then(() => {})
