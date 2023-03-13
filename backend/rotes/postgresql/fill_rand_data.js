const express = require('express');

const router = express.Router();

const { client } = require('../../databases/postgresql/index');

// module.exports = (async () => {
//     const students = {
//         m: {
//             firstname: [
//                 'Даниил', 'Иван', 'Сергей', 'Михаил', 'Игнатий', 'Афанасий', 'Дмитрий',
//                 'Нил', 'Андрей', 'Марк', 'Максим', 'Степан', 'Зиновий', 'Кузьма', 'Георгий',
//                 'Егор', 'Юрий', 'Никандр', 'Григорий', 'Герман', 'Павел', 'Валерий',
//                 'Иосиф', 'Евгений', 'Кирилл'
//             ],
//             lastname: [
//                 'Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров',
//                 'Соколов', 'Михайлов', 'Новиков', 'Фёдоров', 'Морозов', 'Волков',
//                 'Алексеев', 'Лебедев', 'Семёнов', 'Егоров', 'Павлов', 'Козлов',
//                 'Степанов', 'Николаев', 'Орлов', 'Андреев', 'Макаров', 'Никитин', 'Захаров'
//             ],
//             patronymic: [
//                 'Маркович', 'Арсентьевич', 'Борисович', 'Артурович', 'Викторович',
//                 'Глебович', 'Николаевич', 'Александрович', 'Андреевич',
//                 'Владиславович', 'Захарович', 'Павлович', 'Владимирович',
//                 'Алексеевич', 'Артемьевич', 'Робертович', 'Михайлович', 'Львович',
//                 'Матвеевич', 'Никитич', 'Романович'
//             ]
//         },
//         w: {
//             firstname: [
//                 'Мария', 'Виктория', 'Софья', 'Александра', 'Полина',
//                 'Маргарита', 'Алиса', 'Ева', 'Екатерина', 'Дарья',
//                 'Сафия', 'Вера', 'София', 'Алина', 'Милана',
//                 'Алёна', 'Ирина', 'Таисия', 'Анастасия', 'Валерия',
//                 'Василиса', 'Мирослава', 'Ангелина', 'Анна', 'Амина'
//             ],
//             lastname: [
//                 'Горелова', 'Андрианова', 'Сазонова', 'Бондарева', 'Колесова',
//                 'Ковалева', 'Кондратьева', 'Никифорова', 'Рыжова', 'Лопатина',
//                 'Иванова', 'Воробьева', 'Попова', 'Колесова', 'Курочкина',
//                 'Журавлева', 'Софронова', 'Голубева', 'Чижова', 'Баранова',
//                 'Павлова', 'Маслова', 'Белова', 'Гурова', 'Михайлова'
//             ],
//             patronymic: [
//                 'Семёновна', 'Кирилловна', 'Павловна', 'Макаровна',
//                 'Александровна', 'Максимовна', 'Львовна', 'Матвеевна',
//                 'Данииловна', 'Тимофеевна', 'Марковна',
//                 'Ярославовна', 'Алексеевна', 'Тимуровна', 'Андреевна',
//                 'Владимировна', 'Давидовна', 'Мироновна', 'Артёмовна'
//             ]
//         }
//     }
//     const groups = [
//         'БСБО-01-19', 'БСБО-02-19', 'БСБО-03-19', 'БСБО-04-19', 'БСБО-05-19'
//     ];
//     const courses = [
//         'РБПО-00', 'РБПО-01', 'РБПО-02', 'РБПО-03', 'РБПО-04',
//         'РБПО-05', 'РБПО-06', 'РБПО-07', 'РБПО-08', 'РБПО-09', 'РБПО-10'
//     ];
//     const visit = ['+', '-'];
//
//     const data = [];
//     const ids_student = [];
//     const ids_course = [];
//
//     const fill = (cycle) => {
//         for (let i = 0; i < cycle; i++) {
//             let s = Math.round(1 - 0.5 + Math.random() * (2 - 1 + 1));
//
//             let gen;
//
//             if (s === 1) {
//                 gen = 'm'
//             } else gen = 'w';
//
//             let lnth_firstname = Object.keys(students[gen].firstname).length;
//             let lnth_lastname = Object.keys(students[gen].lastname).length;
//             let lnth_patronymic = Object.keys(students[gen].patronymic).length;
//             let lnth_group = groups.length;
//             let lnth_visit = visit.length;
//
//             let selected_firstname = Math.round(0 - 0.5 + Math.random() * lnth_firstname);
//             let selected_lastname = Math.round(0 - 0.5 + Math.random() * lnth_lastname);
//             let selected_patronymic = Math.round(0 - 0.5 + Math.random() * lnth_patronymic);
//             let selected_group = Math.round(0 - 0.5 + Math.random() * lnth_group);
//             let selected_visit = Math.round(0 - 0.5 + Math.random() * lnth_visit);
//
//             const info_student = {
//                 group: groups[selected_group],
//                 firstname: students[gen].firstname[selected_firstname],
//                 lastname: students[gen].lastname[selected_lastname],
//                 patronymic: students[gen].patronymic[selected_patronymic],
//                 visited: visit[selected_visit]
//             }
//
//             data.push(info_student)
//         }
//     }
//     fill(20);
//
//     // Заполнение таблицы [student]
//     for (const item in data) {
//         await client.query(
//             'insert into student ("group", firstname, lastname, patronymic, visited) values ($1, $2, $3, $4, $5) returning *',
//             [data[item].group, data[item].firstname, data[item].lastname, data[item].patronymic, data[item].visited],
//             (err, result) => {
//                 console.log(result.rows);
//             }
//         );
//     }
//
//     // Заполнение таблицы [course]
//     for (let i = 0; i < Object.keys(data).length; i++) {
//         await client.query('SELECT "id_student" from "student"', (err, result) => {
//             let ids = result.rows;
//             for (let i = 0; i < ids.length; i++) {
//                 ids_student.push(ids[i]['id_student']);
//             }
//
//             let length_id_student = ids_student.length;
//             let index_id_student = Math.round(0 - 0.5 + Math.random() * length_id_student);
//             let get_id_student = ids_student[index_id_student];
//
//             let length_courses = courses.length;
//             let index_courses = Math.round(0 - 0.5 + Math.random() * length_courses);
//             let get_courses = courses[index_courses];
//
//             // console.log(get_id_student + ' ' + get_courses);
//
//             client.query(
//                 'insert into course (course_name, id_student) values ($1, $2) returning *',
//                 [get_courses, get_id_student],
//                 (err, result) => {
//                     console.log(result.rows);
//                 }
//             )
//         });
//     }
//
//     // Заполнение таблицы [week]
//     for (let i = 0; i < Object.keys(data).length; i++) {
//         await client.query('SELECT "id_course" from "course"', (err, result) => {
//             let ids = result.rows;
//             for (let i = 0; i < ids.length; i++) {
//                 ids_course.push(ids[i]['id_course']);
//             }
//
//             let length_id_course = ids_course.length;
//             let index_id_course = Math.round(0 - 0.5 + Math.random() * length_id_course);
//             let get_id_course = ids_course[index_id_course];
//
//             let get_week = Math.round(1 - 0.5 + Math.random() * 18);
//
//             client.query(
//                 'insert into week (number_week, id_course) values ($1, $2) returning *',
//                 [get_week, get_id_course],
//                 (err, result) => {
//                     console.log(result.rows);
//                 }
//             );
//         })
//     }
// })()
