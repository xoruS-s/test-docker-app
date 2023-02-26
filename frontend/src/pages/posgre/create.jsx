import React, { useState } from 'react';

import './postgre.css'
const Create = () => {
    const [nameCourse, setNameCourse] = useState('');
    const [description, setDescription] = useState('');

    const form_model = {
        name_course: nameCourse,
        description: description
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form_model)
    };
    let handleSubmit = (event) => {
        fetch('http://localhost:8080/postgre/create', requestOptions)
            .then(res => res.json())
            // .then(data => setFirstname(firstname))
        event.preventDefault();
    }

    return (
        <div>
            <h2>Добавить студента</h2>
            <div className={"create_info"}>
                <form onSubmit={handleSubmit}>
                    <label>Название курса</label><input type={'text'} value={nameCourse} onChange={(e) => setNameCourse(e.target.value)}/>
                    <label>Описание</label><textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <input type={'button'} value={'Очистить поля'} className={'clear_btn'}/>
                    <input type={'submit'} value={'Добавить'} className={'button_submit'}/>
                </form>
            </div>
        </div>
    );
};

export default Create;