import React, { useState } from 'react';

import './postgre.css'
const Create = () => {
    const [number_week, setNumber_week] = useState('');
    const [course, setCourse] = useState('');
    const [group, setGroup] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [visit, setVisit] = useState('');

    const form_model = {
        number_week: number_week,
        course: course,
        group: group,
        firstname: firstname,
        lastname: lastname,
        patronymic: patronymic,
        visit: visit
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form_model)
    };
    let handleSubmit = (event) => {
        fetch('http://localhost:8080/postgres/create', requestOptions)
            .then(res => res.json())
        event.preventDefault();
    }

    return (
        <div>
            postgres.create
            {/*<h2>Добавить студента</h2>*/}
            {/*<div className={"create_info"}>*/}
            {/*    <form onSubmit={handleSubmit}>*/}
            {/*        <label>Номер недели</label>*/}
            {/*        <input type={'text'} value={number_week} onChange={(e) => setNumber_week(e.target.value)}/>*/}
            {/*        <label>Название курса</label>*/}
            {/*        <input type={'text'} value={course} onChange={(e) => setCourse(e.target.value)}/>*/}
            {/*        <label>Группа</label>*/}
            {/*        <input type={'text'} value={group} onChange={(e) => setGroup(e.target.value)}/>*/}
            {/*        <label>Имя</label>*/}
            {/*        <input type={'text'} value={firstname} onChange={(e) => setFirstname(e.target.value)}/>*/}
            {/*        <label>Фамилия</label>*/}
            {/*        <input type={'text'} value={lastname} onChange={(e) => setLastname(e.target.value)}/>*/}
            {/*        <label>Отчество</label>*/}
            {/*        <input type={'text'} value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>*/}
            {/*        <label>Посещение</label>*/}
            {/*        <input type={'text'} value={visit} onChange={(e) => setVisit(e.target.value)}/>*/}

            {/*        <input type={'button'} value={'Очистить поля'} className={'clear_btn'}/>*/}
            {/*        <input type={'submit'} value={'Добавить'} className={'button_submit'}/>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>
    );
};

export default Create;